import Utils from '../utils.js'
import as from 'vocabs-as'
import ldp from 'vocabs-ldp'
import Base from './_base.js'
import tinyduration from 'tinyduration'

const setDateVal = Utils.setDateVal
const setDurationVal = Utils.setDurationVal

function parseRet (ret) {
  let dur
  try {
    dur = tinyduration.parse(ret)
  } catch (err) {
    dur = undefined
  }
  return dur
}

class AsObject extends Base {
  constructor (expanded, builder, environment) {
    super(expanded, builder || AsObject.Builder, environment)
  }

  get mediaType () {
    const mediaType = this.get(as.mediaType) || 'text/html'
    Object.defineProperty(this, 'mediaType', {
      enumerable: true,
      configurable: false,
      value: mediaType
    })
    return mediaType
  }

  get attachment () {
    const attachment = this.get(as.attachment)
    Object.defineProperty(this, 'attachment', {
      enumerable: true,
      configurable: false,
      value: attachment
    })
    return attachment
  }

  get attributedTo () {
    const attributedTo = this.get(as.attributedTo)
    Object.defineProperty(this, 'attributedTo', {
      enumerable: true,
      configurable: false,
      value: attributedTo
    })
    return attributedTo
  }

  get content () {
    const content = this.get(as.content)
    Object.defineProperty(this, 'content', {
      enumerable: true,
      configurable: false,
      value: content
    })
    return content
  }

  get context () {
    const context = this.get(as.context)
    Object.defineProperty(this, 'context', {
      enumerable: true,
      configurable: false,
      value: context
    })
    return context
  }

  get name () {
    const name = this.get(as.name)
    Object.defineProperty(this, 'name', {
      enumerable: true,
      configurable: false,
      value: name
    })
    return name
  }

  get summary () {
    const summary = this.get(as.summary)
    Object.defineProperty(this, 'summary', {
      enumerable: true,
      configurable: false,
      value: summary
    })
    return summary
  }

  get endTime () {
    const endTime = this.get(as.endTime)
    Object.defineProperty(this, 'endTime', {
      enumerable: true,
      configurable: false,
      value: endTime
    })
    return endTime
  }

  get published () {
    const published = this.get(as.published)
    Object.defineProperty(this, 'published', {
      enumerable: true,
      configurable: false,
      value: published
    })
    return published
  }

  get startTime () {
    const startTime = this.get(as.startTime)
    Object.defineProperty(this, 'startTime', {
      enumerable: true,
      configurable: false,
      value: startTime
    })
    return startTime
  }

  get updated () {
    const updated = this.get(as.updated)
    Object.defineProperty(this, 'updated', {
      enumerable: true,
      configurable: false,
      value: updated
    })
    return updated
  }

  get generator () {
    const generator = this.get(as.generator)
    Object.defineProperty(this, 'generator', {
      enumerable: true,
      configurable: false,
      value: generator
    })
    return generator
  }

  get icon () {
    const icon = this.get(as.icon)
    Object.defineProperty(this, 'icon', {
      enumerable: true,
      configurable: false,
      value: icon
    })
    return icon
  }

  get image () {
    const image = this.get(as.image)
    Object.defineProperty(this, 'image', {
      enumerable: true,
      configurable: false,
      value: image
    })
    return image
  }

  get inReplyTo () {
    const inReplyTo = this.get(as.inReplyTo)
    Object.defineProperty(this, 'inReplyTo', {
      enumerable: true,
      configurable: false,
      value: inReplyTo
    })
    return inReplyTo
  }

  get location () {
    const location = this.get(as.location)
    Object.defineProperty(this, 'location', {
      enumerable: true,
      configurable: false,
      value: location
    })
    return location
  }

  get preview () {
    const preview = this.get(as.preview)
    Object.defineProperty(this, 'preview', {
      enumerable: true,
      configurable: false,
      value: preview
    })
    return preview
  }

  get replies () {
    const replies = this.get(as.replies)
    Object.defineProperty(this, 'replies', {
      enumerable: true,
      configurable: false,
      value: replies
    })
    return replies
  }

  get audience () {
    const audience = this.get(as.audience)
    Object.defineProperty(this, 'audience', {
      enumerable: true,
      configurable: false,
      value: audience
    })
    return audience
  }

  get tag () {
    const tag = this.get(as.tag)
    Object.defineProperty(this, 'tag', {
      enumerable: true,
      configurable: false,
      value: tag
    })
    return tag
  }

  get url () {
    const url = this.get(as.url)
    Object.defineProperty(this, 'url', {
      enumerable: true,
      configurable: false,
      value: url
    })
    return url
  }

  get to () {
    const to = this.get(as.to)
    Object.defineProperty(this, 'to', {
      enumerable: true,
      configurable: false,
      value: to
    })
    return to
  }

  get bto () {
    const bto = this.get(as.bto)
    Object.defineProperty(this, 'bto', {
      enumerable: true,
      configurable: false,
      value: bto
    })
    return bto
  }

  get cc () {
    const cc = this.get(as.cc)
    Object.defineProperty(this, 'cc', {
      enumerable: true,
      configurable: false,
      value: cc
    })
    return cc
  }

  get bcc () {
    const bcc = this.get(as.bcc)
    Object.defineProperty(this, 'bcc', {
      enumerable: true,
      configurable: false,
      value: bcc
    })
    return bcc
  }

  get duration () {
    const ret = this.get(as.duration)
    const props = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds', 'microseconds', 'nanoseconds']
    const dur = ret === undefined
      ? undefined
      : typeof (ret) === 'string'
        ? parseRet(ret)
        : typeof (ret) === 'number'
          ? { seconds: ret }
          : undefined
    if (dur) {
      if ('seconds' in dur && !Number.isInteger(dur.seconds)) {
        const msec = Math.round(dur.seconds * 1000)
        dur.milliseconds = msec % 1000
        dur.seconds = Math.floor(msec / 1000)
      }
      const neg = 'negative' in dur
      if (neg) {
        delete dur.negative
      }
      for (const prop of props) {
        if (!(prop in dur)) {
          dur[prop] = 0
        }
        if (neg && dur[prop] !== 0) {
          dur[prop] = -1 * dur[prop]
        }
      }
    }
    Object.defineProperty(this, 'duration', {
      enumerable: true,
      configurable: false,
      value: dur
    })
    return Object.freeze(dur)
  }

  get inbox () {
    const inbox = this.get(ldp.inbox)
    Object.defineProperty(this, 'inbox', {
      enumerable: true,
      configurable: false,
      value: inbox
    })
    return inbox
  }

  get outbox () {
    const outbox = this.get(as.outbox)
    Object.defineProperty(this, 'outbox', {
      enumerable: true,
      configurable: false,
      value: outbox
    })
    return outbox
  }

  get followers () {
    const followers = this.get(as.followers)
    Object.defineProperty(this, 'followers', {
      enumerable: true,
      configurable: false,
      value: followers
    })
    return followers
  }

  get following () {
    const following = this.get(as.following)
    Object.defineProperty(this, 'following', {
      enumerable: true,
      configurable: false,
      value: following
    })
    return following
  }

  get liked () {
    const liked = this.get(as.liked)
    Object.defineProperty(this, 'liked', {
      enumerable: true,
      configurable: false,
      value: liked
    })
    return liked
  }
}

class AsObjectBuilder extends Base.Builder {
  constructor (types, base, environment) {
    types = (types || []).concat([as.Object])
    super(types, base || new AsObject({}, undefined, environment))
  }

  mediaType (val) {
    this.set(as.mediaType, val)
    return this
  }

  attachment (val) {
    this.set(as.attachment, val)
    return this
  }

  attributedTo (val) {
    this.set(as.attributedTo, val)
    return this
  }

  content (val) {
    this.set(as.content, val)
    return this
  }

  context (val) {
    this.set(as.context, val)
    return this
  }

  name (val) {
    this.set(as.name, val)
    return this
  }

  summary (val) {
    this.set(as.summary, val)
    return this
  }

  endTime (val) {
    setDateVal.call(this, as.endTime, val)
    return this
  }

  published (val) {
    setDateVal.call(this, as.published, val)
    return this
  }

  startTime (val) {
    setDateVal.call(this, as.startTime, val)
    return this
  }

  updated (val) {
    setDateVal.call(this, as.updated, val)
    return this
  }

  endTimeNow () {
    return this.endTime(new Date())
  }

  startTimeNow () {
    return this.startTime(new Date())
  }

  publishedNow () {
    return this.published(new Date())
  }

  updatedNow () {
    return this.updated(new Date())
  }

  generator (val) {
    return this.set(as.generator, val)
  }

  icon (val) {
    return this.set(as.icon, val)
  }

  image (val) {
    return this.set(as.image, val)
  }

  inReplyTo (val) {
    return this.set(as.inReplyTo, val)
  }

  location (val) {
    return this.set(as.location, val)
  }

  preview (val) {
    return this.set(as.preview, val)
  }

  replies (val) {
    return this.set(as.replies, val)
  }

  audience (val) {
    return this.set(as.audience, val)
  }

  tag (val) {
    return this.set(as.tag, val)
  }

  url (val) {
    return this.set(as.url, val)
  }

  to (val) {
    return this.set(as.to, val)
  }

  bto (val) {
    return this.set(as.bto, val)
  }

  cc (val) {
    return this.set(as.cc, val)
  }

  bcc (val) {
    return this.set(as.bcc, val)
  }

  duration (val) {
    setDurationVal.call(this, as.duration, val)
    return this
  }

  inbox (val) {
    return this.set(ldp.inbox, val)
  }

  outbox (val) {
    return this.set(as.outbox, val)
  }

  followers (val) {
    return this.set(as.followers, val)
  }

  following (val) {
    return this.set(as.following, val)
  }

  liked (val) {
    return this.set(as.liked, val)
  }
}
AsObject.Builder = AsObjectBuilder

export default AsObject
