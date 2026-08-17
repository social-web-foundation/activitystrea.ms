import as2 from '../src/activitystreams.js'

async function main () {
  const doc = await as2.import({
    type: 'Note',
    content: 'smoke test',
    published: '2026-08-04T00:00:00Z'
  })
  if (doc.content.get() !== 'smoke test') {
    throw new Error('content mismatch')
  }
  if (!(doc.published instanceof Date)) {
    throw new Error('published is not a Date')
  }
  const json = await doc.export()
  if (json['@context'] !== 'https://www.w3.org/ns/activitystreams') {
    throw new Error('exported @context missing')
  }
  if (json.content !== 'smoke test') {
    throw new Error('exported content mismatch')
  }
}

main().then(
  () => console.log('browser bundle OK'),
  (err) => {
    console.error(err)
    globalThis.process?.exit(1)
  }
)
