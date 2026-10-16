// Adapted from linkeddata-vocabs by James M Snell. SPDX-License-Identifier: Apache-2.0
// https://github.com/jasnell/linkeddata-vocabs
import defineVocabulary from './vocabulary.js'
const vocabulary = {}
defineVocabulary(
  vocabulary,
  'http://www.w3.org/ns/ldp#', 'ldp',
  [
    'inbox',
    'pageSequence',
    'pageSortCollation',
    'pageSortOrder',
    'pageSortPredicate',
    'PageSortCriterion',
    'pageSortCriteria',
    'Page',
    'PreferMinimalContainer',
    'PreferEmptyContainer',
    'PreferMembership',
    'PreferContainment',
    'MemberSubject',
    'NonRDFSource',
    'IndirectContainer',
    'DirectContainer',
    'BasicContainer',
    'contains',
    'insertedContentRelation',
    'membershipResource',
    'isMemberOfRelation',
    'hasMemberRelation',
    'Container',
    'RDFSource',
    'constrainedBy',
    'member',
    'Resource'
  ]
)

export default vocabulary
