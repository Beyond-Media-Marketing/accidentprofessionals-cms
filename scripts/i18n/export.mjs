#!/usr/bin/env node
/**
 * Export every translatable English string from the LIVE CMS into the
 * translation memory.
 *
 *   STRAPI_URL=https://… node scripts/i18n/export.mjs
 *
 * The memory lives in data/i18n/:
 *   en/NNN.json  { "<hash>": "English text" }   ← written by this script
 *   es/NNN.json  { "<hash>": "Texto en español" } ← the translations
 *
 * <hash> is the first 12 hex chars of sha1(English text), so identical strings
 * (the boilerplate repeated across 25 city pages) are translated once. Re-runs
 * only append strings that aren't in the memory yet, as new numbered chunks —
 * those are the ones still to translate.
 *
 * The import (src/i18n/import-translations.ts) hashes the live English text and
 * looks it up, so content an editor changed after the export simply has no match
 * and keeps its English text rather than getting a stale translation.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const config = JSON.parse(readFileSync(join(root, 'data/i18n/config.json'), 'utf8'))
const STRAPI_URL = (process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '')

const TEXT_TYPES = new Set(['string', 'text', 'richtext', 'customField', 'json', 'blocks'])
const HAS_LETTERS = /\p{L}/u

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))

function loadSchema(uid) {
  const [, rest] = uid.split('::')
  const [api, name] = rest.split('.')
  return readJson(join(root, 'src/api', api, 'content-types', name, 'schema.json'))
}
function loadComponent(comp) {
  const [cat, name] = comp.split('.')
  return readJson(join(root, 'src/components', cat, `${name}.json`))
}

/** REST populate tree covering every (nested) component. Media/relations aren't needed. */
function buildPopulate(attributes) {
  const out = {}
  for (const [field, attr] of Object.entries(attributes)) {
    if (attr.type !== 'component') continue
    const nested = buildPopulate(loadComponent(attr.component).attributes)
    out[field] = Object.keys(nested).length ? { populate: nested } : true
  }
  return out
}

/** { a: { populate: { b: true } } } → populate[a][populate][b]=true */
function toQuery(obj, prefix = 'populate') {
  const parts = []
  for (const [k, v] of Object.entries(obj)) {
    const key = `${prefix}[${k}]`
    if (v === true) parts.push(`${key}=true`)
    else parts.push(...toQuery(v.populate, `${key}[populate]`))
  }
  return parts
}

function isSkipped(uid, componentUid, field) {
  if (componentUid && config.skipComponentFields.includes(`${componentUid}.${field}`)) return true
  if (!config.skipFields.includes(field)) return false
  return !(uid && config.translateAnyway.includes(`${uid}.${field}`))
}

/** Walk an entry with its schema, collecting translatable strings by path. */
function collect(entry, attributes, out, path, uid, componentUid) {
  if (!entry) return
  for (const [field, attr] of Object.entries(attributes)) {
    const value = entry[field]
    if (value == null) continue
    const p = path ? `${path}.${field}` : field
    if (attr.type === 'component') {
      const comp = loadComponent(attr.component)
      if (config.sharedComponents.includes(attr.component)) continue
      if (attr.repeatable) value.forEach((v, i) => collect(v, comp.attributes, out, `${p}.${i}`, null, attr.component))
      else collect(value, comp.attributes, out, p, null, attr.component)
    } else if (TEXT_TYPES.has(attr.type) && !isSkipped(uid, componentUid, field)) {
      collectStrings(value, out, p)
    }
  }
}

function collectStrings(value, out, path) {
  if (typeof value === 'string') {
    if (HAS_LETTERS.test(value)) out[path] = value
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => collectStrings(v, out, `${path}.${i}`))
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collectStrings(v, out, `${path}.${k}`)
  }
}

async function fetchAll(uid, schema) {
  const endpoint = schema.kind === 'singleType' ? schema.info.singularName : schema.info.pluralName
  const populate = toQuery(buildPopulate(schema.attributes))
  const base = `${STRAPI_URL}/api/${endpoint}?${['locale=en', ...populate].join('&')}`
  if (schema.kind === 'singleType') {
    const res = await fetch(base)
    if (!res.ok) throw new Error(`${uid}: HTTP ${res.status}`)
    return [(await res.json()).data].filter(Boolean)
  }
  const all = []
  for (let page = 1; ; page++) {
    const res = await fetch(`${base}&pagination[page]=${page}&pagination[pageSize]=100&sort=id:asc`)
    if (!res.ok) throw new Error(`${uid}: HTTP ${res.status}`)
    const json = await res.json()
    all.push(...json.data)
    if (page >= json.meta.pagination.pageCount) break
  }
  return all
}

export const hashOf = (text) => createHash('sha1').update(text).digest('hex').slice(0, 12)

const CHUNK_CHARS = 20000
const enDir = join(root, 'data/i18n/en')
mkdirSync(enDir, { recursive: true })

const known = new Set()
let lastChunk = 0
for (const file of readdirSync(enDir).filter((f) => f.endsWith('.json'))) {
  lastChunk = Math.max(lastChunk, parseInt(file, 10) || 0)
  for (const hash of Object.keys(readJson(join(enDir, file)))) known.add(hash)
}

const fresh = new Map()
let totalChars = 0
for (const { uid, key } of config.types) {
  const schema = loadSchema(uid)
  const entries = await fetchAll(uid, schema)
  let chars = 0
  let newChars = 0
  for (const entry of entries) {
    const strings = {}
    collect(entry, schema.attributes, strings, '', uid, null)
    for (const text of Object.values(strings)) {
      chars += text.length
      const hash = hashOf(text)
      if (known.has(hash) || fresh.has(hash)) continue
      fresh.set(hash, text)
      newChars += text.length
    }
  }
  totalChars += chars
  console.log(`${key.padEnd(20)} ${String(entries.length).padStart(4)} entries  ${String(chars).padStart(7)} chars  ${String(newChars).padStart(7)} new`)
}

// Chunk the new strings, keeping export order so related text stays together.
const chunks = []
let current = {}
let size = 0
for (const [hash, text] of fresh) {
  if (size && size + text.length > CHUNK_CHARS) {
    chunks.push(current)
    current = {}
    size = 0
  }
  current[hash] = text
  size += text.length
}
if (size) chunks.push(current)

chunks.forEach((chunk, i) => {
  const name = String(lastChunk + i + 1).padStart(3, '0')
  writeFileSync(join(enDir, `${name}.json`), JSON.stringify(chunk, null, 2) + '\n')
})
console.log(`total ${totalChars} chars — ${fresh.size} new strings in ${chunks.length} new chunk(s)`)
