#!/usr/bin/env node
/**
 * Runs Lighthouse on the production preview server.
 * Usage: npm run seo:lighthouse
 */
import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const PORT = 4173
const URL = `http://localhost:${PORT}/`
const OUT_DIR = resolve(process.cwd(), 'docs/lighthouse')

function run(cmd, args, opts = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true, ...opts })
    child.on('close', (code) =>
      code === 0 ? resolvePromise() : reject(new Error(`${cmd} exited ${code}`)),
    )
  })
}

async function waitForServer(ms = 3000) {
  await new Promise((r) => setTimeout(r, ms))
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const reportPath = resolve(OUT_DIR, `report-${timestamp}.html`)
  const jsonPath = resolve(OUT_DIR, `report-${timestamp}.json`)

  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    stdio: 'pipe',
    shell: true,
  })

  try {
    await waitForServer(2500)
    await run('npx', [
      'lighthouse',
      URL,
      '--only-categories=performance,accessibility,best-practices,seo',
      '--output=html',
      `--output-path=${reportPath}`,
      '--chrome-flags=--headless --no-sandbox',
      '--quiet',
    ])
    await run('npx', [
      'lighthouse',
      URL,
      '--only-categories=performance',
      '--output=json',
      `--output-path=${jsonPath}`,
      '--chrome-flags=--headless --no-sandbox',
      '--quiet',
    ])

    console.log('\n✓ Reports saved to docs/lighthouse/')
    console.log('  HTML:', reportPath)
    console.log('  JSON:', jsonPath)
  } finally {
    preview.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
