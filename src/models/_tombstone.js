'use strict'

const as = require('vocabs-as')
const AsObject = require('./_object')
const Base = require('./_base')
const setDateVal = require('../utils').setDateVal
const composedType = Base.composedType

const Tombstone = composedType(AsObject, {
  get deleted () {
    const deleted = this.get(as.deleted)
    Object.defineProperty(this, 'deleted', {
      enumerable: true,
      configurable: false,
      value: deleted
    })
    return deleted
  },
  get formerType () {
    const formerType = this.get(as.formerType)
    Object.defineProperty(this, 'formerType', {
      enumerable: true,
      configurable: false,
      value: formerType
    })
    return formerType
  }
})

const TombstoneBuilder = composedType(AsObject.Builder, {
  deleted (val) {
    setDateVal.call(this, as.deleted, val)
    return this
  },
  formerType (val) {
    this.set(as.formerType, val)
  }
})
Tombstone.Builder = TombstoneBuilder

module.exports = Tombstone
