import assert from 'node:assert'
import as from '../src/activitystreams.js'

// The post-moment contract: `duration` is a frozen plain object with the
// same numeric properties as a Temporal.Duration, zeros filled in, no
// balancing (90 seconds stays {seconds: 90}, not {minutes: 1, seconds: 30}).
const ZERO_DURATION = {
  years: 0,
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  microseconds: 0,
  nanoseconds: 0
}

function duration (fields) {
  return Object.assign({}, ZERO_DURATION, fields)
}

async function importDuration (value) {
  const doc = await as.import({ type: 'Object', duration: value })
  return doc.duration
}

describe('Duration...', () => {
  it('parses a time-only duration', async () => {
    const d = await importDuration('PT1H30M')
    assert.deepStrictEqual(d, duration({ hours: 1, minutes: 30 }))
  })

  it('parses date and time components, distinguishing months from minutes',
    async () => {
      const d = await importDuration('P4M3DT2H4M')
      assert.deepStrictEqual(d,
        duration({ months: 4, days: 3, hours: 2, minutes: 4 }))
    })

  it('parses fractional seconds into subsecond fields', async () => {
    const d = await importDuration('PT1.5S')
    assert.deepStrictEqual(d, duration({ seconds: 1, milliseconds: 500 }))
  })

  it('parses a negative duration with negative fields', async () => {
    const d = await importDuration('-PT1H')
    assert.deepStrictEqual(d, duration({ hours: -1 }))
  })

  it('treats a bare number as seconds, without balancing', async () => {
    const d = await importDuration(90)
    assert.deepStrictEqual(d, duration({ seconds: 90 }))
  })

  it('returns undefined when duration is absent', async () => {
    const doc = await as.import({ type: 'Object', name: 'no duration' })
    assert.strictEqual(doc.duration, undefined)
  })

  it('returns a frozen object', async () => {
    const d = await importDuration('PT1H')
    assert(Object.isFrozen(d))
  })

  it('memoizes the parsed duration', async () => {
    const doc = await as.import({ type: 'Object', duration: 'PT1H' })
    assert.strictEqual(doc.duration, doc.duration)
  })

  it('serializes a numeric duration from the builder as seconds', async () => {
    const obj = as.object().duration(90).get()
    const doc = await obj.export()
    assert.strictEqual(doc.duration, 'PT90S')
  })

  it('passes an ISO-8601 duration string through the builder unchanged',
    async () => {
      const obj = as.object().duration('P4M3DT2H').get()
      const doc = await obj.export()
      assert.strictEqual(doc.duration, 'P4M3DT2H')
    })

  it('round-trips a builder duration through the getter', async () => {
    const obj = as.object().duration('PT2H').get()
    assert.deepStrictEqual(obj.duration, duration({ hours: 2 }))
  })
})
