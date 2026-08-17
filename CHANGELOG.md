# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Date-valued properties (`published`, `updated`, `startTime`,
  `endTime`, `deleted`, `closed`) return plain `Date` objects instead of
  moment instances. Builder date setters accept only `Date` (or anything
  `Object.prototype.toString`-tagged as a Date); moment objects are now
  rejected with a `must be a date` error, and invalid dates throw at set
  time instead of being silently stored.
- Duration-valued properties (`duration`) returns a plain, frozen object with the same
  properties as [Temporal.Duration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration). This might become
  a Temporal.Duration in a future version.
- Upgraded eslint infrastructure.
- Update "engines" to LTS 22 so we can use ESM modules.
- replace rfc5646 with bcp-47-match.
- Replace heavyweight `reasoner` module and dependencies with table-driven `vocab` module.

### Removed

- JSON-LD Signatures support; options.sign and as2.verify removed.
- `interval` and `social` extensions.
- extension mechanism (`use()` and `extend()`).
- streaming interface, including Express middleware.
- `moment` as a dependency.

## [3.3.3] - 2026-05-09

### Added

- CHANGELOG.md for tracking changes in the project.

### Fixed

- Use `application/n-quads` (with hyphen) as the RDF format identifier in
  `JsonLD.normalize` and `JsonLD.importFromRDF`; the previous
  `application/nquads` value caused `jsonld.fromRDF` to throw
  `jsonld.UnknownFormat` under jsonld v9.

### Changed

- Dependabot configured for npm updates.
- Dependency bumps: `mocha` to 11.7.5, `moment` to 2.30.1, `readable-stream`
  to 4.7.0, `@digitalbazaar/ed25519-signature-2020` to 5.4.0,
  `@digitalbazaar/ed25519-verification-key-2020` to 4.2.0, and assorted
  transitive bumps (`minimatch`, `picomatch`, `flatted`, `undici`).

## [3.3.2] - 2026-04-02

### Fixed

- Corrected repository URL in `package.json`.

## [3.3.1] - 2026-04-02

### Added

- GitHub Actions workflows to build and push.
- Evan Prodromou listed as a contributor.

### Changed

- Updated repository URL to the social-web-foundation org.

### Fixed

- `npm run test` now sets the `LANG` environment variable so tests run with
  a deterministic locale.

## [3.3.0] - 2026-02-04

### Added

- `isActivity()` helper for distinguishing activities from other objects.

## [3.2.0] - 2025-09-13

### Added

- `as.registerContext()` to register a context document from client code.

### Fixed

- Use the default document loader for `jsonld.documentLoader`.
- Correct the `origContext` property of an environment when calling
  `export()`.

## [3.1.0] - 2024-01-29

### Changed

- Repackaged 3.0.0 release with corrected URL in `package.json`.

## [2.1.4] - 2024-01-24

Maintenance release on the 2.1.x line.

### Changed

- `npm audit fix` and miscellaneous dependency bumps.
- Override the default language in tests so they pass under any locale.
- Basic linting added; small bug fixes; signature test reworked.

## [3.0.0] - 2022-11-06

### Changed

- **Breaking:** API converted to Promises; callbacks are no longer
  supported. Major rewrite of the public surface.
- Upgraded to `jsonld` 1.8.x and `jsonld-signatures` 5.2.0; replaced the
  legacy `jsonld@0.4.x` and matching signatures stack.
- Migrated to ES6 idioms throughout (`const`/`let`, arrow functions,
  classes), removed the `jshint` configuration, and added linting.
- Switched to the hashless Activity Streams 2.0 context URL by default.
- README rewritten for the Promises-based API.

### Removed

- Removed unused constants and several legacy compatibility shims.

## [2.1.3] - 2018-03-27

### Added

- Compact representation for ActivityPub stream properties (`inbox`,
  `outbox`, `following`, `followers`, `liked`).

## [2.1.2] - 2018-03-27

### Changed

- Switched the default `@context` URL from `http://` to `https://`.

## [2.1.1] - 2018-03-27

### Fixed

- Fix problem with array `@context` (#13).
- Use the hashless URL as the default `@context`.

## [2.1.0] - 2017-12-24

### Added

- `inbox`, `outbox`, `following`, `followers`, and `liked` properties on
  `Object` (#14).

### Changed

- Updated `activitystreams-context` and `vocabs-as` (#18).
- Force `LANG=en-US` for unit tests so locale differences don't break the
  suite (#15).

## [2.0.0] - 2017-03-06

### Changed

- **Breaking:** major refactor of the library internals and public API.

## [1.0.0] - 2016-09-01

### Changed

- First 1.0 release. Updated to the latest editor's draft of Activity
  Streams 2.0.
- Use `process.emitWarning` when available.
- Dependency updates.

## [0.14.0] - 2016-01-05

### Changed

- Updated to the latest Activity Streams 2.0 editor's draft.

## [0.13.0] - 2015-12-14

### Changed

- **Breaking:** major refactor to a composition-based model.

## [0.12.1] - 2015-12-13

### Added

- Customizable document loader and `Environment` for context resolution.

### Changed

- Pass the environment through correctly during expansion/compaction.
- Improved test coverage.
- Removed per-file license headers in favor of a single LICENSE file.
- Dependency updates.

### Fixed

- Various code cleanups.

## [0.12.0] - 2015-12-11

### Removed

- Removed the `Content` object.

## [0.11.0] - 2015-12-01

### Changed

- Updated to the latest Activity Streams 2.0 editor's draft.

## [0.10.1] - 2015-11-04

### Changed

- `mediaType` is now a property on `Object`, not just on `Content`.

## [0.10.0] - 2015-11-03

### Changed

- Updated to the current Activity Streams 2.0 editor's draft.

## [0.9.1] - 2015-10-24

### Fixed

- Quick bug fix on top of 0.9.0.

## [0.9.0] - 2015-10-20

### Changed

- Refactored the `LanguageValue` API.
- README link updates.

## [0.8.1] - 2015-10-19

### Changed

- Various cleanups and ES6 improvements.

## [0.8.0] - 2015-10-01

### Changed

- **Breaking:** refactor for Node.js v4 and ES6 features; switched from
  custom date handling to `moment`.

## [0.7.2] - 2015-09-17

### Added

- `CollectionPage` and `OrderedCollectionPage` support.
- Basic `send` support.

### Changed

- Removed copyright boilerplate from individual JS files.
- Switched to `const` where appropriate.
- README updates and install-issue documentation.
- Dependency updates.

## [0.6.6] - 2015-08-05

### Fixed

- Changed the order of extension resolvers.

## [0.6.5] - 2015-08-04

### Fixed

- Bug fixes.

## [0.6.4] - 2015-08-04

### Added

- `objectMode` option on `Base.prototype.stream`.

### Fixed

- Typo fix.

## [0.6.3] - 2015-08-03

### Added

- Express/Connect middleware and template helper.
- Expanded API documentation.

## [0.6.2] - 2015-08-02

### Added

- Dust template-engine context helper.

## [0.6.1] - 2015-08-01

### Added

- Stream support.

## [0.6.0] - 2015-08-01

### Added

- Custom export handlers.
- Experimental JSON-LD signature support and generated IDs.
- RDF import and export.
- Strict mode and a `jshint` configuration.

### Changed

- Reasoner extracted to a separate module to improve performance.
- Updates to match successive Activity Streams 2.0 editor's drafts.
- Refactored extensions with proper tests.
- General performance and design improvements.

## [0.2.0] - 2015-02-09

### Changed

- Refactored away from using a triple store on the internals; reorganized
  the source tree.
- Switched to the `activitystreams-context` and linked-data vocabs
  modules.
- Removed Bower and Grunt build infrastructure.
- Dependency updates.

### Added

- Support for extension contexts in `compact`.
- Actions support.
- Caching in the reasoner for better performance.

### Fixed

- Bug fix for `orderedItems`.
- Invalid serialization on `as:href`.
- Various regression fixes.

## [0.0.1] - 2015-01-18

### Added

- Initial tagged release.
- Implementation updated to match the then-current W3C Activity Streams
  2.0 editor's draft.
- Experimental interval and social-namespace support.
- Allow bypassing the builder when triples and an N3 store are already
  available.

### Notes

- Project history begins with the initial check-in on 2014-04-17 by
  James M Snell. Early work (April 2014 – January 2015) covered the
  initial implementation, package renaming to avoid npm conflicts, and
  documentation cleanup before this first tagged release.
