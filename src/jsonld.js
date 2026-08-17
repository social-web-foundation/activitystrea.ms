'use strict'

const jsonld = require('jsonld')()
const asContext = require('activitystreams-context')
const models = require('./models/models.js')
const Environment = require('./environment')
const Loader = require('./contextloader')
const asUrlNohash = 'https://www.w3.org/ns/activitystreams'

jsonld.documentLoader = Loader.defaultInstance.makeDocLoader()

function getContext (options) {
  if (options.useOriginalContext && options.origContext) {
    return { '@context': options.origContext }
  } else {
    const ctx = []
    if (options && options.additional_context) { ctx.push(options.additional_context) }
    ctx.push(asUrlNohash)
    return { '@context': ctx.length > 1 ? ctx : ctx[0] }
  }
}

class JsonLD {
  static async normalize (expanded, options = {}) {
    return jsonld.canonize(expanded, {
      format: 'application/n-quads',
      ...options
    })
  }

  static async compact (expanded, options = {}) {
    const _context = getContext(options)
    return jsonld.compact(
      expanded, _context, {}
    )
  }

  static async import (input, options = {}) {
    let environment = options.environment || new Environment(input)
    if (!(environment instanceof Environment)) {
      environment = new Environment(input)
    }
    environment.applyAssumedContext(input)
    const expanded = await jsonld.expand(input, {
      expandContext: asContext,
      documentLoader: environment.loader.makeDocLoader(),
      keepFreeFloatingNodes: true
    })

    if (expanded && expanded.length > 0) {
      return models.wrap_object(expanded[0], environment)
    }

    return null
  }

  static async importFromRDF (input) {
    const expanded = await jsonld.fromRDF(input, { format: 'application/n-quads' })
    return models.wrap_object(expanded[0])
  }
}

module.exports = JsonLD
