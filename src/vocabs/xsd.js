// Adapted from linkeddata-vocabs by James M Snell. SPDX-License-Identifier: Apache-2.0
// https://github.com/jasnell/linkeddata-vocabs
import defineVocabulary from './vocabulary.js'
const vocabulary = {}
defineVocabulary(
  vocabulary,
  'http://www.w3.org/2001/XMLSchema#', 'xsd',
  ['boolean', 'string', 'anyType', 'anySimpleType', 'gMonth',
    'gDay', 'gMonthDay', 'gYear', 'gYearMonth', 'date', 'time',
    'dateTime', 'duration', 'base64Binary', 'hexBinary', 'float',
    'decimal', 'double', 'anyURI', 'QName', 'NOTATION', 'integer',
    'nonPositiveInteger', 'long', 'nonNegativeInteger', 'negativeInteger',
    'int', 'unsignedLong', 'positiveInteger', 'short', 'byte',
    'unsignedInt', 'unsignedShort', 'unsignedByte', 'normalizedString',
    'token', 'language', 'Name', 'NMTOKEN', 'NCName', 'NMTOKENS',
    'ID', 'IDREF', 'ENTITY', 'IDREFS', 'ENTITIES'
  ]
)

export default vocabulary
