#!/usr/bin/env node
/**
 * Buduje podzbiór OpenMoji używany przez apkę.
 *
 * 1. przechodzi po src/ i wyciąga wszystkie emoji z kodu,
 * 2. dopasowuje każde do pliku SVG z paczki OpenMoji,
 * 3. kopiuje TYLKO potrzebne pliki do public/openmoji/,
 * 4. generuje src/content/openmoji.ts — mapę „emoji → nazwa pliku".
 *
 * Dzięki mapie runtime nie musi zgadywać nazw plików z codepointów: co nie zostało
 * dopasowane tutaj, w apce po prostu renderuje się jako zwykły tekst.
 *
 * Uruchomienie:  node scripts/build-openmoji.mjs [ścieżka-do-rozpakowanej-paczki]
 */

import { readdir, readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'src')
const OUT_DIR = path.join(ROOT, 'public', 'openmoji')
const MAP_FILE = path.join(SRC, 'content', 'openmoji.ts')

const packDir = process.argv[2]
if (!packDir || !existsSync(packDir)) {
  console.error('Podaj ścieżkę do rozpakowanej paczki OpenMoji (katalog z plikami *.svg).')
  process.exit(1)
}

// ——— 1. zbierz emoji z kodu

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (/\.(ts|tsx)$/.test(entry.name)) yield full
  }
}

const segmenter = new Intl.Segmenter('pl', { granularity: 'grapheme' })
const PICTO = /\p{Extended_Pictographic}/u

const found = new Set()
for await (const file of walk(SRC)) {
  if (file.endsWith(path.join('content', 'openmoji.ts'))) continue
  const text = await readFile(file, 'utf8')
  for (const { segment } of segmenter.segment(text)) {
    if (PICTO.test(segment)) found.add(segment)
  }
}

// ——— 2. dopasuj do plików paczki

const available = new Set(
  (await readdir(packDir)).filter((f) => f.endsWith('.svg')).map((f) => f.slice(0, -4)),
)

const hex = (cp) => cp.toString(16).toUpperCase().padStart(4, '0')

/** OpenMoji nazywa pliki codepointami; FE0F i selektory bywają obecne albo nie. */
function candidates(cluster) {
  const cps = [...cluster].map((c) => c.codePointAt(0))
  const all = cps.map(hex).join('-')
  const noFe0f = cps.filter((c) => c !== 0xfe0f).map(hex).join('-')
  const noMods = cps
    .filter((c) => c !== 0xfe0f && c !== 0x200d && !(c >= 0x1f3fb && c <= 0x1f3ff))
    .map(hex)
    .join('-')
  const base = hex(cps[0])
  return [...new Set([all, noFe0f, noMods, base])].filter(Boolean)
}

const map = {}
const missing = []
for (const cluster of [...found].sort()) {
  const hit = candidates(cluster).find((name) => available.has(name))
  if (hit) map[cluster] = hit
  else missing.push(cluster + ' (' + candidates(cluster).join(', ') + ')')
}

// ——— 3. skopiuj tylko potrzebne pliki

await rm(OUT_DIR, { recursive: true, force: true })
await mkdir(OUT_DIR, { recursive: true })
for (const name of new Set(Object.values(map))) {
  await copyFile(path.join(packDir, `${name}.svg`), path.join(OUT_DIR, `${name}.svg`))
}

// ——— 4. wygeneruj mapę

const entries = Object.entries(map)
  .map(([cluster, name]) => `  ${JSON.stringify(cluster)}: '${name}',`)
  .join('\n')

await writeFile(
  MAP_FILE,
  `// PLIK GENEROWANY — nie edytuj ręcznie.
// Źródło: node scripts/build-openmoji.mjs <paczka-openmoji>
//
// Grafika: OpenMoji (https://openmoji.org), licencja CC BY-SA 4.0.

/** Emoji → nazwa pliku SVG w public/openmoji/. Brak wpisu = renderujemy jako tekst. */
export const OPENMOJI: Record<string, string> = {
${entries}
}

export const OPENMOJI_COUNT = ${entries ? entries.split('\n').length : 0}
`,
  'utf8',
)

console.log(`emoji w kodzie: ${found.size}`)
console.log(`dopasowanych do OpenMoji: ${Object.keys(map).length}`)
console.log(`skopiowanych plików: ${new Set(Object.values(map)).size}`)
if (missing.length) {
  console.log(`\nBEZ ODPOWIEDNIKA (${missing.length}) — zostaną jako tekst:`)
  for (const m of missing) console.log('  ' + m)
}
