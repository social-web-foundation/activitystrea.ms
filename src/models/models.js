import as from 'vocabs-as'
import vocab from '../vocab.js'
import { compose } from './compose.js'
import LanguageValue from './_languagevalue.js'
import Base from './_base.js'
import AsObject from './_object.js'
import Activity from './_activity.js'
import Collection from './_collection.js'
import OrderedCollection from './_orderedcollection.js'
import CollectionPage from './_collectionpage.js'
import OrderedCollectionPage from './_orderedcollectionpage.js'
import Link from './_link.js'
import Place from './_place.js'
import Relationship from './_relationship.js'
import Profile from './_profile.js'
import Question from './_question.js'
import Tombstone from './_tombstone.js'

const cache = Object.create(null)

function coreRecognizer (type) {
  let thing
  if (vocab.isA(type, as.OrderedCollectionPage)) {
    thing = OrderedCollectionPage
  } else if (vocab.isA(type, as.CollectionPage)) {
    thing = CollectionPage
  } else if (vocab.isA(type, as.OrderedCollection)) {
    thing = OrderedCollection
  } else if (vocab.isA(type, as.Collection)) {
    thing = Collection
  } else if (vocab.isA(type, as.Question)) {
    thing = Question
  } else if (vocab.isA(type, as.Activity)) {
    thing = Activity
  } else if (vocab.isA(type, as.Profile)) {
    thing = Profile
  } else if (vocab.isA(type, as.Place)) {
    thing = Place
  } else if (vocab.isA(type, as.Relationship)) {
    thing = Relationship
  } else if (vocab.isA(type, as.Tombstone)) {
    thing = Tombstone
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

export default {
  LanguageValue,
  Base,
  Object: AsObject,
  Activity,
  Collection,
  OrderedCollection,
  CollectionPage,
  OrderedCollectionPage,
  Link,
  Place,
  Relationship,
  Profile,
  Question,
  Tombstone,
  compose,

  compose_builder (builder, types) {
    types = vocab.reduce(types || [])
    for (const type of types) {
      const Thing = recognize(type)
      if (Thing) { builder[compose](Thing.Builder) }
    }
  },

  compose_base (base, types) {
    types = vocab.reduce(types || [])
    for (const type of types) {
      const Thing = recognize(type)
      if (Thing) { base[compose](Thing) }
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
      ? Link
      : AsObject
    return new Thing(expanded, undefined, environment)
  }
}
