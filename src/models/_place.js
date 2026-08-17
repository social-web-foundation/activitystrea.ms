import Utils from '../utils.js'
import as from 'vocabs-as'
import xsd from 'vocabs-xsd'
import Base from './_base.js'

const range = Utils.range
const throwif = Utils.throwif
const composedType = Base.composedType

const Place = composedType(undefined, {
  get accuracy () {
    const ret = range(0, 100, this.get(as.accuracy))
    Object.defineProperty(this, 'accuracy', {
      enumerable: true,
      configurable: false,
      value: isNaN(ret) ? undefined : ret
    })
    return isNaN(ret) ? undefined : ret
  },
  get altitude () {
    const ret = this.get(as.altitude)
    Object.defineProperty(this, 'altitude', {
      enumerable: true,
      configurable: false,
      value: isNaN(ret) ? undefined : ret
    })
    return isNaN(ret) ? undefined : ret
  },
  get latitude () {
    const ret = range(-90.0, 90.0, this.get(as.latitude))
    Object.defineProperty(this, 'latitude', {
      enumerable: true,
      configurable: false,
      value: isNaN(ret) ? undefined : ret
    })
    return isNaN(ret) ? undefined : ret
  },
  get longitude () {
    const ret = range(-180.0, 180.0, this.get(as.longitude))
    Object.defineProperty(this, 'longitude', {
      enumerable: true,
      configurable: false,
      value: isNaN(ret) ? undefined : ret
    })
    return isNaN(ret) ? undefined : ret
  },
  get radius () {
    const ret = range(0, Infinity, this.get(as.radius))
    Object.defineProperty(this, 'radius', {
      enumerable: true,
      configurable: false,
      value: isNaN(ret) ? undefined : ret
    })
    return isNaN(ret) ? undefined : ret
  },
  get units () {
    const units = this.get(as.units)
    Object.defineProperty(this, 'units', {
      enumerable: true,
      configurable: false,
      value: units
    })
    return units
  }
})

const PlaceBuilder = composedType(undefined, {
  accuracy (val) {
    throwif(isNaN(val), 'accuracy must be a number')
    this.set(as.accuracy, range(0.00, 100.0, val), { type: xsd.float })
    return this
  },
  altitude (val) {
    throwif(isNaN(val), 'altitude must be a number')
    this.set(as.altitude, val, { type: xsd.float })
    return this
  },
  latitude (val) {
    throwif(isNaN(val), 'latitude must be a number')
    this.set(as.latitude, range(-90.0, 90.0, val), { type: xsd.float })
    return this
  },
  longitude (val) {
    throwif(isNaN(val), 'longitude must be a number')
    this.set(as.longitude, range(-180.0, 180.0, val), { type: xsd.float })
    return this
  },
  radius (val) {
    throwif(isNaN(val), 'radius must be a number')
    this.set(as.radius, range(0.00, Infinity, val), { type: xsd.float })
    return this
  },
  units (val) {
    return this.set(as.units, val)
  }
})

Place.Builder = PlaceBuilder

export default Place
