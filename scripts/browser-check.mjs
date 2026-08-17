import { buildSync } from 'esbuild'
import { chromium, firefox, webkit } from 'playwright'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const outfile = path.join(os.tmpdir(), 'as2-browser-check.js')

buildSync({
  entryPoints: [path.join(dirname, 'browser-entry.mjs')],
  bundle: true,
  platform: 'browser',
  minify: true,
  outfile
})

const engines = { chromium, firefox, webkit }
let failed = false

for (const [name, engine] of Object.entries(engines)) {
  const browser = await engine.launch()
  const context = await browser.newContext({ locale: 'en-US' })
  const page = await context.newPage()

  const result = new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error('timed out waiting for result')), 15000)
    page.on('console', (msg) => {
      const text = msg.text()
      if (text === 'browser bundle OK') {
        clearTimeout(timer)
        resolve()
      } else if (msg.type() === 'error') {
        clearTimeout(timer)
        reject(new Error(text))
      }
    })
    page.on('pageerror', (err) => {
      clearTimeout(timer)
      reject(err)
    })
  })

  try {
    await page.addScriptTag({ path: outfile })
    await result
    console.log(`${name}: OK`)
  } catch (err) {
    console.error(`${name}: FAILED — ${err.message}`)
    failed = true
  } finally {
    await browser.close()
  }
}

process.exit(failed ? 1 : 0)
