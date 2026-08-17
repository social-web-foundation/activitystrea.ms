'use strict'

const as = require('vocabs-as')
const vocab = require('../vocab')
const _compose = Symbol('compose')

const cache = Object.create(null)

function coreRecognizer (type) {
  let thing
  if (vocab.isA(type, as.OrderedCollectionPage)) {
    thing = exports.OrderedCollectionPage
  } else if (vocab.isA(type, as.CollectionPage)) {
    thing = exports.CollectionPage
  } else if (vocab.isA(type, as.OrderedCollection)) {
    thing = exports.OrderedCollection
  } else if (vocab.isA(type, as.Collection)) {
    thing = exports.Collection
  } else if (vocab.isA(type, as.Question)) {
    thing = exports.Question
  } else if (vocab.isA(type, as.Activity)) {
    thing = exports.Activity
  } else if (vocab.isA(type, as.Profile)) {
    thing = exports.Profile
  } else if (vocab.isA(type, as.Place)) {
    thing = exports.Place
  } else if (vocab.isA(type, as.Relationship)) {
    thing = exports.Relationship
  } else if (vocab.isA(type, as.Tombstone)) {
    thing = exports.Tombstone
  }
  return thing
}

function recognize (type) {
  let thing = cache[type]
  if (thing !== undefined) return thing
  thing = coreRecognizer(type)
  if (thing !== undefined) {
    cache[type] = thing
  }
  return thing
}

module.exports = exports = {

  get LanguageValue () {
    const lv = require('./_languagevalue')
    Object.defineProperty(this, 'LanguageValue', {
      enumerable: true,
      configurable: false,
      value: lv
    })
    return lv
  },

  get Base () {
    const base = require('./_base')
    Object.defineProperty(this, 'Base', {
      enumerable: true,
      configurable: false,
      value: base
    })
    return base
  },

  get Object () {
    const obj = require('./_object')
    Object.defineProperty(this, 'Object', {
      enumerable: true,
      configurable: false,
      value: obj
    })
    return obj
  },

  get Activity () {
    const activity = require('./_activity')
    Object.defineProperty(this, 'Activity', {
      enumerable: true,
      configurable: false,
      value: activity
    })
    return activity
  },

  get Collection () {
    const col = require('./_collection')
    Object.defineProperty(this, 'Collection', {
      enumerable: true,
      configurable: false,
      value: col
    })
    return col
  },

  get OrderedCollection () {
    const col = require('./_orderedcollection')
    Object.defineProperty(this, 'OrderedCollection', {
      enumerable: true,
      configurable: false,
      value: col
    })
    return col
  },

  get CollectionPage () {
    const page = require('./_collectionpage')
    Object.defineProperty(this, 'CollectionPage', {
      enumerable: true,
      configurable: false,
      value: page
    })
    return page
  },

  get OrderedCollectionPage () {
    const page = require('./_orderedcollectionpage')
    Object.defineProperty(this, 'OrderedCollectionPage', {
      enumerable: true,
      configurable: false,
      value: page
    })
    return page
  },

  get Link () {
    const link = require('./_link')
    Object.defineProperty(this, 'Link', {
      enumerable: true,
      configurable: false,
      value: link
    })
    return link
  },

  get Place () {
    const place = require('./_place')
    Object.defineProperty(this, 'Place', {
      enumerable: true,
      configurable: false,
      value: place
    })
    return place
  },

  get Relationship () {
    const rel = require('./_relationship')
    Object.defineProperty(this, 'Relationship', {
      enumerable: true,
      configurable: false,
      value: rel
    })
    return rel
  },

  get Profile () {
    const profile = require('./_profile')
    Object.defineProperty(this, 'Profile', {
      enumerable: true,
      configurable: false,
      value: profile
    })
    return profile
  },

  get Question () {
    const question = require('./_question')
    Object.defineProperty(this, 'Question', {
      enumerable: true,
      configurable: false,
      value: question
    })
    return question
  },

  get Tombstone () {
    const tombstone = require('./_tombstone')
    Object.defineProperty(this, 'Tombstone', {
      enumerable: true,
      configurable: false,
      value: tombstone
    })
    return tombstone
  },

  get compose () {
    return _compose
  },

  compose_builder (builder, types) {
    types = vocab.reduce(types || [])
    for (const type of types) {
      const Thing = recognize(type)
      if (Thing) { builder[_compose](Thing.Builder) }
    }
  },

  compose_base (base, types) {
    types = vocab.reduce(types || [])
    for (const type of types) {
      const Thing = recognize(type)
      if (Thing) { base[_compose](Thing) }
    }
  },

  wrap_object (expanded, environment) {
    const types = vocab.reduce(expanded['@type'] || [])
    let isLink = false
    for (const type of types) {
      if (vocab.isA(type, as.Link)) {
        isLink = true
        break
      }
    }
    const Thing = isLink
      ? exports.Link
      : exports.Object
    return new Thing(expanded, undefined, environment)
  }
}
