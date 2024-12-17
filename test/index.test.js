import { test } from 'node:test'
import assert from 'node:assert'
import { fetch } from '../src/index.js'

test('fetch from web', async () => {
  const res = await fetch('https://arweave.net')
  const body = await res.json()
  console.log(body)
  assert(true)
})

test('fetch to nowhere', async () => {
  try {
    const res = await fetch('https://arweave.net/nowhere', {}, 3)
  } catch (e) {
    console.log(e)
    assert(true)
  }

})