'use strict'

const as = require('vocabs-as')
const Loader = require('./contextloader')
const _input = Symbol('input')
const _origcontext = Symbol('originalContext')
const _defcontext = Symbol('defaultContext')
const _loader = Symbol('loader')
const asUrlNohash = 'https://www.w3.org/ns/activitystreams'

let defaultContext = [asUrlNohash]

class Environment {
  constructor (input) {
    this[_input] = input
    this[_origcontext] = input ? input['@context'] : undefined
    this[_defcontext] = [].concat(defaultContext)
    this[_loader] = Loader.defaultInstance
  }

  get input () {
    return this[_input]
  }

  get originalContext () {
    return this[_origcontext]
  }

  get loader () {
    return this[_loader]
  }

  set loader (loader) {
    if (!(loader instanceof Loader)) { throw new TypeError('value must be an instance of Loader') }
    this[_loader] = loader
  }

  addAssumedContext () {
    if (arguments.length > 0) {
      const contexts = new Array(arguments.length)
      for (let n = 0; n < arguments.length; n++) { contexts[n] = arguments[n] }
      this[_defcontext] = contexts.concat(this[_defcontext])
    }
    return this
  }

  setAssumedContext () {
    const contexts = new Array(arguments.length)
    let hasAs = false
    if (arguments.length > 0) {
      for (let n = 0; n < arguments.length; n++) {
        contexts[n] = arguments[n]
        if ((contexts[n] === as.ns || contexts[n] === asUrlNohash) && !hasAs) { hasAs = true }
      }
    }
    if (!hasAs) contexts.push(asUrlNohash)
    this[_defcontext] = contexts
    return this
  }

  applyAssumedContext (input) {
    if (!input['@context']) { input['@context'] = this[_defcontext] }
  }

  static addDefaultAssumedContext () {
    if (arguments.length > 0) {
      for (let n = 0; n < arguments.length; n++) { defaultContext.unshift(arguments[n]) }
    }
  }

  static setDefaultAssumedContext () {
    const contexts = new Array(arguments.length)
    let hasAs = false
    for (let n = 0; n < arguments.length; n++) {
      contexts[n] = arguments[n]
      if ((contexts[n] === as.ns || contexts[n] === asUrlNohash) && !hasAs) { hasAs = true }
    }
    if (!hasAs) contexts.push(asUrlNohash)
    defaultContext = contexts
  }
}

Object.defineProperty(Environment, 'environment', {
  configurable: false,
  enumerable: true,
  value: Symbol('environment')
})

module.exports = Environment
