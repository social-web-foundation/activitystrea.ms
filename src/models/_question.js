import as from 'vocabs-as'
import Activity from './_activity.js'
import Base from './_base.js'
import Utils from '../utils.js'

const setDateVal = Utils.setDateVal
const composedType = Base.composedType

const Question = composedType(Activity, {
  get anyOf () {
    const anyOf = this.get(as.anyOf)
    Object.defineProperty(this, 'anyOf', {
      enumerable: true,
      configurable: false,
      value: anyOf
    })
    return anyOf
  },
  get oneOf () {
    const oneOf = this.get(as.oneOf)
    Object.defineProperty(this, 'oneOf', {
      enumerable: true,
      configurable: false,
      value: oneOf
    })
    return oneOf
  },
  get closed () {
    const closed = this.get(as.closed)
    Object.defineProperty(this, 'closed', {
      enumerable: true,
      configurable: false,
      value: closed
    })
    return closed
  }
})

const QuestionBuilder = composedType(Activity.Builder, {
  anyOf (val) {
    return this.set(as.anyOf, val)
  },
  oneOf (val) {
    return this.set(as.oneOf, val)
  },
  closed (val) {
    setDateVal.call(this, as.closed, val)
    return this
  }
})
Question.Builder = QuestionBuilder

export default Question
