'use strict'

const Base = require('../models').Base
const composedType = Base.composedType
const social = require('vocabs-social')
const utils = require('../utils')
const range = utils.range
const isInteger = utils.isInteger
const throwif = utils.throwif
const Population = require('./_population')

const Common = composedType(Population, {
  get havingDimension () {
    const ret = this.get(social.havingDimension)
    Object.defineProperty(this, 'havingDimension', {
      enumerable: true,
      configurable: false,
      value: ret
    })
    return ret
  },
  get confidence () {
    const ret = range(0, 100, this.get(social.confidence))
    Object.defineProperty(this, 'confidence', {
      enumerable: true,
      configurable: false,
      value: isNaN(ret) ? undefined : ret
    })
    return isNaN(ret) ? undefined : ret
  }
})

const CommonBuilder = composedType(Population.Builder, {
  havingDimension (val) {
    this.set(social.havingDimension, val)
    return this
  },
  confidence (val) {
    throwif(
      !isInteger(val),
      'confidence must be an integer between 0 and 100')
    this.set(
      social.confidence,
      range(0, 100, val))
    return this
  }
})
Common.Builder = CommonBuilder

module.exports = Common
