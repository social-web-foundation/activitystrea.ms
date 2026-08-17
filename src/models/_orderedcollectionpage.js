import as from 'vocabs-as'
import xsd from 'vocabs-xsd'
import Utils from '../utils.js'
import CollectionPage from './_collectionpage.js'
import OrderedCollection from './_orderedcollection.js'
import Base from './_base.js'

const range = Utils.range
const composedType = Base.composedType

const OrderedCollectionPage =
  composedType([OrderedCollection, CollectionPage],
    {
      get startIndex () {
        const ret = Math.max(0, this.get(as.startIndex))
        Object.defineProperty(this, 'startIndex', {
          enumerable: true,
          configurable: false,
          value: isNaN(ret) ? 0 : ret
        })
        return isNaN(ret) ? 0 : ret
      }
    })

const OrderedCollectionPageBuilder =
  composedType([OrderedCollection.Builder, CollectionPage.Builder],
    {
      startIndex (val) {
        this.set(
          as.startIndex,
          range(0, Infinity, val),
          { type: xsd.nonNegativeInteger })
        return this
      },
      items () {
        return this.orderedItems.apply(this, arguments)
      }
    })
OrderedCollectionPage.Builder = OrderedCollectionPageBuilder

export default OrderedCollectionPage
