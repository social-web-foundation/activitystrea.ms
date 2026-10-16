// Adapted from linkeddata-vocabs by James M Snell. SPDX-License-Identifier: Apache-2.0
// https://github.com/jasnell/linkeddata-vocabs
import defineVocabulary from './vocabulary.js'
import context from './context.js'
const vocabulary = {}
const ignore = new Set(['@vocab', 'xsd', 'as', 'id', 'type', 'inbox'])

const terms = {
  * [Symbol.iterator] () {
    for (const term of Object.keys(context['@context'])) {
      if (!ignore.has(term)) { yield term }
    }
  }
}

defineVocabulary(vocabulary, context['@context'].as, 'as', terms)

export default vocabulary
