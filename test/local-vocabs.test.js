import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import as from '../src/vocabs/as.js'
import asx from '../src/vocabs/asx.js'
import ldp from '../src/vocabs/ldp.js'
import rdf from '../src/vocabs/rdf.js'
import xsd from '../src/vocabs/xsd.js'
import context from '../src/vocabs/context.js'

const expected = JSON.parse(readFileSync(new URL('./fixtures/vocabs.json', import.meta.url), 'utf8'))

describe('local ESM vocabularies', () => {
  for (const [name, vocabulary] of Object.entries({ as, asx, ldp, rdf, xsd })) {
    it(`preserves every ${name} export from the replaced package`, () => {
      for (const [term, iri] of Object.entries(expected[name])) {
        assert.equal(vocabulary[term], iri)
      }
    })

    it(`preserves read-only enumerable ${name} terms`, () => {
      for (const key of Object.keys(expected[name])) {
        const descriptor = Object.getOwnPropertyDescriptor(vocabulary, key)
        assert.equal(descriptor.enumerable, true)
        assert.equal(descriptor.configurable, false)
        assert.equal(descriptor.writable, false)
      }
    })
  }

  it('exports alsoKnownAs in the Activity Streams namespace', () => {
    assert.equal(as.alsoKnownAs, 'https://www.w3.org/ns/activitystreams#alsoKnownAs')
  })

  it('keeps the vcard context prefix out of the Activity Streams vocabulary', () => {
    assert.equal(context['@context'].vcard, 'http://www.w3.org/2006/vcard/ns#')
    assert.equal(Object.hasOwn(as, 'vcard'), false)
  })
})
