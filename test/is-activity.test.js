const assert = require('assert')
const as = require('../src/activitystreams')

describe('Activity type check...', async () => {
  it('can identify a known activity type', async () => {
    const object = await as.import({
      type: 'Create'
    })
    assert.ok(object.isActivity())
  })

  it('can identify a multityped activity', async () => {
    const object = await as.import({
      type: ['Update', 'https://example.com/type/Other']
    })
    assert.ok(object.isActivity())
  })

  it('can identify a known non-activity type', async () => {
    const object = await as.import({
      type: 'Note'
    })
    assert.ok(!(object.isActivity()))
  })

  it('can identify a multi-typed non-activity', async () => {
    const object = await as.import({
      type: ['Note', 'https://example.com/type/Bogus']
    })
    assert.ok(!(object.isActivity()))
  })

  it('can identify a duck-typed activity', async () => {
    const object = await as.import({
      type: 'https://example.com/type/Ersatz',
      actor: 'https://person.example/user/frank'
    })
    assert.ok(object.isActivity())
  })

  it('can identify an object that is not otherwise an activity', async () => {
    const object = await as.import({
      type: 'https://example.com/type/Unknown'
    })
    assert.ok(!(object.isActivity()))
  })
})
