import assert from 'node:assert/strict'
import as from '../src/activitystreams.js'
import vocab from '../src/vocab.js'

describe('alsoKnownAs', () => {
  const property = 'https://www.w3.org/ns/activitystreams#alsoKnownAs'

  it('is an object-valued property', () => {
    assert.equal(vocab.isObjectProperty(property), true)
  })

  for (const aliases of [
    'https://old.example/user/sample',
    ['https://old.example/user/sample', 'https://other.example/user/sample']
  ]) {
    it(`imports and round-trips ${Array.isArray(aliases) ? 'multiple aliases' : 'a single alias'} as object references`, async () => {
      const input = {
        '@context': 'https://www.w3.org/ns/activitystreams',
        id: 'https://social.example/user/sample',
        type: 'Person',
        alsoKnownAs: aliases
      }
      const actor = await as.import(input)
      const expected = Array.isArray(aliases) ? aliases : [aliases]
      const references = actor.get(property)
      assert.ok(references)
      assert.deepEqual(Array.from(references, ref => ref.id), expected)

      const exported = await actor.export({ useOriginalContext: true })
      assert.deepEqual(exported.alsoKnownAs, aliases)
      const reimported = await as.import(exported)
      assert.deepEqual(Array.from(reimported.get(property), ref => ref.id), expected)
    })
  }
})
