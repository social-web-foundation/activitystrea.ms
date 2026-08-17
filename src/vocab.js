import as from 'vocabs-as'
import asx from 'vocabs-asx'
import ldp from 'vocabs-ldp'
import rdf from 'vocabs-rdf'
import xsd from 'vocabs-xsd'

const FUNCTIONAL_OBJECT_PROPERTIES = [
  as.describes, as.subject, as.first, rdf.rest, as.partOf, as.current,
  as.last, as.next, as.prev, as.href
]

const FUNCTIONAL_PROPERTIES = new Set([
  ...FUNCTIONAL_OBJECT_PROPERTIES,
  as.accuracy, as.altitude, as.duration, as.endTime, as.height, as.hreflang,
  as.latitude, as.longitude, as.mediaType, as.published, as.closed,
  as.deleted, as.radius, as.startIndex, as.startTime, as.totalItems,
  as.units, as.updated, as.width
])

const OBJECT_PROPERTIES = new Set([
  ...FUNCTIONAL_OBJECT_PROPERTIES,
  as.relationship, as.actor, as.attributedTo, as.attachment, as.bcc, as.bto,
  as.cc, as.context, as.generator, as.icon, as.instrument, as.image,
  as.inReplyTo, as.items, as.location, as.object, as.oneOf, as.anyOf,
  as.preview, as.replies, as.formerType, as.result, as.audience, as.tag,
  as.target, as.origin, as.to, as.url, ldp.inbox, as.outbox, as.followers,
  as.following, as.liked
])

const LANGUAGE_PROPERTIES = new Set([as.name, as.summary, as.content])

const SUB_PROPERTIES = new Map([
  [as.actor, [as.attributedTo]],
  [as.author, [as.attributedTo]]
])

const SUPERTYPES = new Map([
  [as.items, [asx.PossiblyOrdered]],
  [as.Accept, [as.Activity]],
  [as.Activity, [as.Object]],
  [as.Tombstone, [as.Object]],
  [as.Block, [as.Ignore]],
  [as.IntransitiveActivity, [as.Activity]],
  [as.Add, [as.Activity]],
  [as.Announce, [as.Activity]],
  [as.Application, [as.Object]],
  [as.Arrive, [as.IntransitiveActivity]],
  [as.Article, [as.Object]],
  [as.Audio, [as.Document]],
  [as.Collection, [as.Object]],
  [as.CollectionPage, [as.Collection]],
  [as.OrderedCollectionPage, [as.CollectionPage, as.OrderedCollection]],
  [as.Relationship, [as.Object]],
  [as.Create, [as.Activity]],
  [as.Delete, [as.Activity]],
  [as.Dislike, [as.Activity]],
  [as.Document, [as.Object]],
  [as.Event, [as.Object]],
  [as.Flag, [as.Activity]],
  [as.Follow, [as.Activity]],
  [as.Group, [as.Object]],
  [as.Ignore, [as.Activity]],
  [as.Image, [as.Document]],
  [as.Invite, [as.Offer]],
  [as.Join, [as.Activity]],
  [as.Leave, [as.Activity]],
  [as.Like, [as.Activity]],
  [as.View, [as.Activity]],
  [as.Listen, [as.Activity]],
  [as.Read, [as.Activity]],
  [as.Move, [as.Activity]],
  [as.Travel, [as.IntransitiveActivity]],
  [as.Update, [as.Activity]],
  [as.Mention, [as.Link]],
  [as.Note, [as.Object]],
  [as.Offer, [as.Activity]],
  [as.OrderedCollection, [as.Collection]],
  [as.Page, [as.Object]],
  [as.Profile, [as.Object]],
  [as.Person, [as.Object]],
  [as.Organization, [as.Object]],
  [as.Place, [as.Object]],
  [as.Question, [as.Object, as.IntransitiveActivity]],
  [as.Reject, [as.Activity]],
  [as.Remove, [as.Activity]],
  [as.Service, [as.Object]],
  [as.TentativeAccept, [as.Accept]],
  [as.TentativeReject, [as.Reject]],
  [as.Undo, [as.Activity]],
  [as.Video, [as.Document]]
])

const LITERAL_KINDS = new Map([
  [asx.Date, 'date'],
  [xsd.date, 'date'],
  [xsd.dateTime, 'date'],
  [xsd.gMonth, 'date'],
  [xsd.gDay, 'date'],
  [xsd.gMonthDay, 'date'],
  [xsd.gYear, 'date'],
  [xsd.gYearMonth, 'date'],
  [asx.Number, 'number'],
  [xsd.decimal, 'number'],
  [xsd.double, 'number'],
  [xsd.float, 'number'],
  [xsd.integer, 'number'],
  [xsd.int, 'number'],
  [xsd.long, 'number'],
  [xsd.short, 'number'],
  [xsd.byte, 'number'],
  [xsd.nonPositiveInteger, 'number'],
  [xsd.negativeInteger, 'number'],
  [xsd.nonNegativeInteger, 'number'],
  [xsd.positiveInteger, 'number'],
  [xsd.unsignedLong, 'number'],
  [xsd.unsignedInt, 'number'],
  [xsd.unsignedShort, 'number'],
  [xsd.unsignedByte, 'number'],
  [xsd.boolean, 'boolean'],
  [xsd.duration, 'duration']
])

function isA (typeA, typeB) {
  if (typeA === typeB) {
    return true
  }
  const supers = SUPERTYPES.get(typeA)
  if (!supers) return false
  for (const s of supers) {
    if (s === typeB || isA(s, typeB)) return true
  }
  return false
}

function reduce (types) {
  if (!types) return []
  if (!Array.isArray(types)) return [types]
  const deduped = [...new Set(types)]
  return deduped.filter((value) =>
    !deduped.find((other) =>
      other !== value && isA(other, value)))
}

function isFunctional (prop) {
  return FUNCTIONAL_PROPERTIES.has(prop)
}

function isLanguageProperty (prop) {
  return LANGUAGE_PROPERTIES.has(prop)
}

function isObjectProperty (prop) {
  return OBJECT_PROPERTIES.has(prop)
}

function isSubPropertyOf (propA, propB) {
  const supers = SUB_PROPERTIES.get(propA)
  if (!supers) return false
  for (const s of supers) {
    if (s === propB || isSubPropertyOf(s, propB)) return true
  }
  return false
}

function literalKind (iri) {
  return LITERAL_KINDS.get(iri)
}

export default { isA, reduce, isFunctional, isLanguageProperty, isObjectProperty, isSubPropertyOf, literalKind }
