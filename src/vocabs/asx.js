// Adapted from linkeddata-vocabs by James M Snell. SPDX-License-Identifier: Apache-2.0
// https://github.com/jasnell/linkeddata-vocabs
import defineVocabulary from './vocabulary.js'
const vocabulary = {}
defineVocabulary(
  vocabulary,
  'http://ns.jasnell.me/activitystreams-ex#', 'asx',
  [
    'LanguageProperty',
    'Number',
    'Date',
    'PossiblyOrdered'
  ]
)

export default vocabulary
