#!/usr/bin/env node
/**
 * Turn on Strapi i18n for every content type listed in data/i18n/config.json.
 *
 *   node scripts/i18n/enable-schemas.mjs
 *
 * Idempotent — re-run it after adding a new content type to the config.
 *
 * Per attribute:
 *   - text (string/text/richtext/customField/json) → localized, unless the field
 *     is in `skipFields` (URLs, phones, names…) — those stay shared across languages
 *   - components → localized (each language keeps its own copy, images included),
 *     except `sharedComponents` which have nothing to translate
 *   - media, numbers, booleans, enums, dates → shared, so swapping an image or
 *     toggling a flag in English applies to Spanish too
 *   - relations + uid (slug) are always per-language in Strapi 5; no option needed
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const config = JSON.parse(readFileSync(join(root, 'data/i18n/config.json'), 'utf8'))

const TEXT_TYPES = new Set(['string', 'text', 'richtext', 'customField', 'json', 'blocks'])

for (const { uid } of config.types) {
  const [, rest] = uid.split('::')
  const [api, name] = rest.split('.')
  const file = join(root, 'src/api', api, 'content-types', name, 'schema.json')
  const schema = JSON.parse(readFileSync(file, 'utf8'))

  schema.pluginOptions = { ...(schema.pluginOptions || {}), i18n: { localized: true } }

  for (const [field, attr] of Object.entries(schema.attributes)) {
    if (attr.type === 'relation' || attr.type === 'uid') continue
    let localized
    if (TEXT_TYPES.has(attr.type)) {
      const skipped = config.skipFields.includes(field) && !config.translateAnyway.includes(`${uid}.${field}`)
      localized = !skipped
    } else if (attr.type === 'component') {
      localized = !config.sharedComponents.includes(attr.component)
    } else if (attr.type === 'dynamiczone') {
      localized = true
    } else {
      localized = false
    }
    attr.pluginOptions = { ...(attr.pluginOptions || {}), i18n: { localized } }
  }

  writeFileSync(file, JSON.stringify(schema, null, 2) + '\n')
  console.log(`enabled i18n: ${uid}`)
}
