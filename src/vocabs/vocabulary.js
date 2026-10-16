// Adapted from linkeddata-vocabs by James M Snell. SPDX-License-Identifier: Apache-2.0
// https://github.com/jasnell/linkeddata-vocabs
function define (value) {
  return {
    value,
    enumerable: true,
    configurable: false
  }
};

export default function defineVocabulary (exports, ns, prefix, terms) {
  const props = {
    ns: define(ns),
    prefix: define(prefix)
  }
  for (const term of terms) { props[term] = define(ns + term) }
  Object.defineProperties(exports, props)
};
