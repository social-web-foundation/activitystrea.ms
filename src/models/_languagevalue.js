import { lookup, basicFilter } from 'bcp-47-match'

const _map = Symbol('map')

// BCP 47 tags are case-insensitive; map keys are stored lowercased
function canonical (lang) {
  return String(lang).toLowerCase()
}

class LanguageValue {
  constructor (map) {
    this[_map] = map
  }

  get (lang) {
    if (!lang) return this.get(LanguageValue.SYSLANG)
    const key = canonical(lang)
    if (this[_map].has(key)) { return this[_map].get(key) }
    const tags = [...this[_map].keys()]
    const hit = lookup(tags, lang) || basicFilter(tags, lang)[0]
    if (hit !== undefined) { return this[_map].get(hit) }
  }

  has (lang) {
    if (!lang) return this.has(LanguageValue.SYSLANG)
    return this[_map].has(canonical(lang))
  }

  * [Symbol.iterator] () {
    for (const pair of this[_map]) { yield [pair[0], pair[1]] }
  }

  valueOf (lang) {
    return this.get(lang)
  }
}

class LanguageValueBuilder {
  constructor () {
    this[_map] = new Map()
  }

  set (lang, value) {
    if (arguments.length === 1) {
      value = lang
      lang = LanguageValue.SYSLANG
    }
    this[_map].set(canonical(lang), value)
    return this
  }

  get () {
    return new LanguageValue(this[_map])
  }
}

LanguageValue.SYSLANG =
  (typeof process !== 'undefined' && process.env.LANG)
    ? process.env.LANG.split('.')[0].replace('_', '-')
    : (typeof navigator !== 'undefined')
        ? navigator.language
        : 'en-US'

LanguageValue.Builder = LanguageValueBuilder

export default LanguageValue
