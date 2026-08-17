import Collection from './_collection.js'
import Base from './_base.js'

const composedType = Base.composedType

const OrderedCollection = composedType(Collection, {})

const OrderedCollectionBuilder = composedType(Collection.Builder, {
  items () {
    return this.orderedItems.apply(this, arguments)
  }
})

OrderedCollection.Builder = OrderedCollectionBuilder

export default OrderedCollection
