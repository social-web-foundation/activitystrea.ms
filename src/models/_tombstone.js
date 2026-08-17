import as from 'vocabs-as'
import AsObject from './_object.js'
import Base from './_base.js'
import Utils from '../utils.js'

const setDateVal = Utils.setDateVal
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

export default Tombstone
