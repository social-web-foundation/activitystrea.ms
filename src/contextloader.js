'use strict'

const jsonld = require('jsonld')()
const as = require('vocabs-as')
const asContext = require('activitystreams-context')
const securityContext = require('./jsig')

const jsigUrl = 'https://w3id.org/security/v1'
const asUrlNohash = 'https://www.w3.org/ns/activitystreams'
const defaultDocLoader = jsonld.documentLoaders.node()
const _map = Symbol('map')

/**
 * Creates a custom JSON-LD document loader using an internal map of
 * context objects
 **/
class Loader {
  constructor () {
    this[_map] = Object.create(null)
    this.register(as.ns, asContext)
    this.register(asUrlNohash, asContext)
    this.register(jsigUrl, securityContext)
  }

  register (url, context) {
    this[_map][url] = context
    return this
  }

  get (url) {
    return this[_map][url]
  }

  makeDocLoader () {
    return async (url) => {
      const context = this[_map][url]
      if (context) {
        return {
          contextUrl: null,
          document: context,
          documentUrl: url
        }
      }

      return defaultDocLoader(url)
    }
  }
}

Loader.defaultInstance = new Loader()

module.exports = Loader
