import jsonldFactory from 'jsonld'
import as from 'vocabs-as'
import { asContext, securityContext } from './contexts/contexts.js'

const jsonld = jsonldFactory()
const securityUrl = 'https://w3id.org/security/v1'
const asUrlNohash = 'https://www.w3.org/ns/activitystreams'
const defaultDocLoader = (jsonld.documentLoaders.node)
  ? jsonld.documentLoaders.node()
  : (jsonld.documentLoaders.xhr)
      ? jsonld.documentLoaders.xhr()
      : null
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
    this.register(securityUrl, securityContext)
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

export default Loader
