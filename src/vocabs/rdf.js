// Adapted from linkeddata-vocabs by James M Snell. SPDX-License-Identifier: Apache-2.0
// https://github.com/jasnell/linkeddata-vocabs
import defineVocabulary from './vocabulary.js'
const vocabulary = {}
defineVocabulary(
  vocabulary,
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#', 'rdf',
  ['first', 'rest', 'nil', 'type']
)

export default vocabulary
