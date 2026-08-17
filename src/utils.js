import tinyduration from 'tinyduration'
import xsd from 'vocabs-xsd'

const _toString = {}.toString

class Utils {
  static throwif (condition, message) {
    if (condition) throw Error(message)
  }

  static range (min, max, val) {
    return Math.min(max, Math.max(min, val))
  }

  static isPrimitive (val) {
    return val === null ||
           val === undefined ||
           Utils.isString(val) ||
           !isNaN(val) ||
           Utils.isBoolean(val)
  }

  static isString (val) {
    return typeof val === 'string' ||
           val instanceof String ||
           _toString.apply(val) === '[object String]'
  }

  static isBoolean (val) {
    return typeof val === 'boolean' ||
           val instanceof Boolean ||
           _toString.apply(val) === '[object Boolean]'
  }

  static isDate (val) {
    return val instanceof Date ||
           _toString.apply(val) === '[object Date]'
  }

  static isInteger (val) {
    return !isNaN(val) &&
      isFinite(val) &&
      val > -9007199254740992 &&
      val < 9007199254740992 &&
      Math.floor(val) === val
  }

  static setDateVal (key, val) {
    Utils.throwif(!Utils.isDate(val), `${key} must be a date`)
    const fmt = val.toISOString()
    this.set(key, fmt, { type: xsd.dateTime })
  }

  static set_ranged_val (key, val, min, max, type) {
    Utils.throwif(isNaN(val), `${key} must be a number`)
    if (!isFinite(val)) return
    this.set(key, Utils.range(min, max, val), { type })
  }

  static set_non_negative_int (key, val) {
    Utils.throwif(isNaN(val), `${key} must be a number`)
    if (!isFinite(val)) return
    this.set(key,
      Utils.range(0, Infinity, Math.floor(val)),
      { type: xsd.nonNegativeInteger })
  }

  static setDurationVal (key, val) {
    Utils.throwif(
      isNaN(val) &&
      !Utils.isString(val),
      `${key} must be a number or a string`)
    val = !isNaN(val)
      ? tinyduration.serialize({ seconds: val })
      : val.toString()
    this.set(key, val, { type: xsd.duration })
  }
}

export default Utils
