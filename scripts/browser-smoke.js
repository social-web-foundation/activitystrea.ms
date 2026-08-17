'use strict'

const { buildSync } = require('esbuild')
const { execFileSync } = require('node:child_process')
const { statSync } = require('node:fs')
const path = require('node:path')
const os = require('node:os')

const outfile = path.join(os.tmpdir(), 'as2-browser-smoke.js')

buildSync({
  entryPoints: [path.join(__dirname, 'browser-entry.mjs')],
  bundle: true,
  platform: 'browser',
  minify: true,
  outfile
})

const output = execFileSync(process.execPath, [outfile], { encoding: 'utf8' })

if (!output.includes('browser bundle OK')) {
  console.error(output)
  throw new Error('browser bundle smoke test failed')
}

const kb = (statSync(outfile).size / 1024).toFixed(1)
console.log(`browser bundle OK (${kb} KB minified)`)
