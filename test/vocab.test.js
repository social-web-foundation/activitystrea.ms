const assert = require('assert')
const as = require('vocabs-as')
const asx = require('vocabs-asx')
const xsd = require('vocabs-xsd')
const ldp = require('vocabs-ldp')
const vocab = require('../src/vocab')

// The vocab tables module: the reasoner replacement. Static,
// question-specific lookups over the core AS2 vocabulary — no OWL graph,
// no n3, no runtime binding. Expected values transcribed from the triples
// in src/reasoner.js and the reasoner package's internal XsdGraph.

describe('Vocab tables...', () => {
  describe('isA (type hierarchy)', () => {
    it('is reflexive', () => {
      assert.strictEqual(vocab.isA(as.Object, as.Object), true)
      assert.strictEqual(vocab.isA(as.Accept, as.Accept), true)
    })

    it('is reflexive even for unknown IRIs', () => {
      const custom = 'https://example.com/ns#Custom'
      assert.strictEqual(vocab.isA(custom, custom), true)
    })

    it('answers direct subtype edges', () => {
      assert.strictEqual(vocab.isA(as.Accept, as.Activity), true)
      assert.strictEqual(vocab.isA(as.Activity, as.Object), true)
      assert.strictEqual(vocab.isA(as.Mention, as.Link), true)
    })

    it('answers transitive subtype chains', () => {
      assert.strictEqual(vocab.isA(as.TentativeAccept, as.Activity), true)
      assert.strictEqual(vocab.isA(as.TentativeAccept, as.Object), true)
      assert.strictEqual(vocab.isA(as.OrderedCollectionPage, as.Object), true)
    })

    it('handles multiple parents', () => {
      assert.strictEqual(
        vocab.isA(as.OrderedCollectionPage, as.CollectionPage), true)
      assert.strictEqual(
        vocab.isA(as.OrderedCollectionPage, as.OrderedCollection), true)
      assert.strictEqual(vocab.isA(as.Question, as.Object), true)
      assert.strictEqual(vocab.isA(as.Question, as.IntransitiveActivity), true)
      assert.strictEqual(vocab.isA(as.Question, as.Activity), true)
    })

    it('is directional', () => {
      assert.strictEqual(vocab.isA(as.Activity, as.Accept), false)
      assert.strictEqual(vocab.isA(as.Object, as.Collection), false)
    })

    it('answers false for unrelated and unknown types', () => {
      assert.strictEqual(vocab.isA(as.Note, as.Activity), false)
      assert.strictEqual(
        vocab.isA('https://example.com/ns#Custom', as.Object), false)
    })
  })

  describe('reduce (most-specific types)', () => {
    it('drops a type when a listed subtype implies it', () => {
      assert.deepStrictEqual(
        vocab.reduce([as.Activity, as.Accept]), [as.Accept])
      assert.deepStrictEqual(
        vocab.reduce([as.Accept, as.Activity]), [as.Accept])
    })

    it('drops transitively implied types', () => {
      assert.deepStrictEqual(
        vocab.reduce([as.Object, as.Activity, as.TentativeAccept]),
        [as.TentativeAccept])
    })

    it('keeps unrelated types', () => {
      const ret = vocab.reduce([as.Note, as.Activity])
      assert.strictEqual(ret.length, 2)
      assert.ok(ret.includes(as.Note))
      assert.ok(ret.includes(as.Activity))
    })

    it('deduplicates', () => {
      assert.deepStrictEqual(vocab.reduce([as.Note, as.Note]), [as.Note])
    })

    it('keeps unknown types', () => {
      const custom = 'https://example.com/ns#Custom'
      const ret = vocab.reduce([as.Note, custom])
      assert.strictEqual(ret.length, 2)
      assert.ok(ret.includes(custom))
    })

    it('accepts a bare value and empty input', () => {
      assert.deepStrictEqual(vocab.reduce(as.Note), [as.Note])
      assert.deepStrictEqual(vocab.reduce([]), [])
      assert.deepStrictEqual(vocab.reduce(), [])
    })
  })

  describe('property traits', () => {
    it('knows functional properties', () => {
      assert.strictEqual(vocab.isFunctional(as.published), true)
      assert.strictEqual(vocab.isFunctional(as.first), true)
      assert.strictEqual(vocab.isFunctional(as.partOf), true)
      assert.strictEqual(vocab.isFunctional(as.duration), true)
    })

    it('knows non-functional properties', () => {
      assert.strictEqual(vocab.isFunctional(as.actor), false)
      assert.strictEqual(vocab.isFunctional(as.content), false)
      assert.strictEqual(vocab.isFunctional(as.rel), false)
      assert.strictEqual(vocab.isFunctional(ldp.inbox), false)
    })

    it('knows language-map properties', () => {
      assert.strictEqual(vocab.isLanguageProperty(as.content), true)
      assert.strictEqual(vocab.isLanguageProperty(as.name), true)
      assert.strictEqual(vocab.isLanguageProperty(as.summary), true)
      assert.strictEqual(vocab.isLanguageProperty(as.published), false)
      assert.strictEqual(vocab.isLanguageProperty(as.actor), false)
    })

    it('knows object properties', () => {
      assert.strictEqual(vocab.isObjectProperty(as.actor), true)
      assert.strictEqual(vocab.isObjectProperty(as.tag), true)
      assert.strictEqual(vocab.isObjectProperty(ldp.inbox), true)
      assert.strictEqual(vocab.isObjectProperty(as.content), false)
      assert.strictEqual(vocab.isObjectProperty(as.rel), false)
    })

    it('allows a property to be both functional and object', () => {
      assert.strictEqual(vocab.isObjectProperty(as.first), true)
      assert.strictEqual(vocab.isFunctional(as.first), true)
      assert.strictEqual(vocab.isObjectProperty(as.describes), true)
      assert.strictEqual(vocab.isFunctional(as.describes), true)
    })

    it('answers false for unknown IRIs', () => {
      const junk = 'https://example.com/ns#junk'
      assert.strictEqual(vocab.isFunctional(junk), false)
      assert.strictEqual(vocab.isLanguageProperty(junk), false)
      assert.strictEqual(vocab.isObjectProperty(junk), false)
    })
  })

  describe('subPropertyOf', () => {
    it('knows the property hierarchy', () => {
      assert.strictEqual(
        vocab.isSubPropertyOf(as.actor, as.attributedTo), true)
      assert.strictEqual(
        vocab.isSubPropertyOf(as.author, as.attributedTo), true)
    })

    it('is directional and false for unrelated properties', () => {
      assert.strictEqual(
        vocab.isSubPropertyOf(as.attributedTo, as.actor), false)
      assert.strictEqual(vocab.isSubPropertyOf(as.actor, as.object), false)
    })
  })

  describe('literalKind (datatype buckets)', () => {
    it('buckets date types', () => {
      assert.strictEqual(vocab.literalKind(xsd.dateTime), 'date')
      assert.strictEqual(vocab.literalKind(xsd.date), 'date')
      assert.strictEqual(vocab.literalKind(xsd.gYear), 'date')
    })

    it('buckets number types, including transitively', () => {
      assert.strictEqual(vocab.literalKind(xsd.float), 'number')
      assert.strictEqual(vocab.literalKind(xsd.integer), 'number')
      // via nonNegativeInteger subClassOf integer in the xsd hierarchy
      assert.strictEqual(vocab.literalKind(xsd.nonNegativeInteger), 'number')
    })

    it('buckets boolean and duration', () => {
      assert.strictEqual(vocab.literalKind(xsd.boolean), 'boolean')
      assert.strictEqual(vocab.literalKind(xsd.duration), 'duration')
    })

    it('recognizes the asx bucket roots themselves', () => {
      assert.strictEqual(vocab.literalKind(asx.Date), 'date')
      assert.strictEqual(vocab.literalKind(asx.Number), 'number')
    })

    it('returns undefined for plain strings and unknown types', () => {
      assert.strictEqual(vocab.literalKind(xsd.string), undefined)
      assert.strictEqual(
        vocab.literalKind('https://example.com/ns#thing'), undefined)
      assert.strictEqual(vocab.literalKind(undefined), undefined)
    })
  })
})
