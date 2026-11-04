import type { Core } from '@strapi/strapi';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Create the Spanish version of every entry from the translation memory in
 * data/i18n/es/*.json (see scripts/i18n/export.mjs for how it's produced).
 *
 * - Missing Spanish entry → created as a copy of the English one (images,
 *   links, section order) with every string found in the memory swapped for
 *   its translation — but only once at least MIN_COVERAGE of its text is
 *   translated. Until then the site keeps serving the English entry instead of
 *   a half-Spanish page.
 * - Existing Spanish entry → only strings that are still in English *and* have
 *   a translation in the memory are filled in (e.g. a section added after the
 *   first import, once its text has been translated). Anything an editor has
 *   written or fixed in Spanish no longer matches an English source string, so
 *   it is never touched.
 * - Set I18N_IMPORT=false to skip this step entirely.
 */

type Config = {
  locale: string;
  localeName: string;
  types: { uid: string; key: string }[];
  skipFields: string[];
  translateAnyway: string[];
  skipComponentFields: string[];
  sharedComponents: string[];
};

const TEXT_TYPES = new Set(['string', 'text', 'richtext', 'customField', 'json', 'blocks']);
/** Share of an entry's text (by characters) that must be translated before its Spanish version is created. */
const MIN_COVERAGE = 0.8;
const HAS_LETTERS = /\p{L}/u;
const hashOf = (text: string) => createHash('sha1').update(text).digest('hex').slice(0, 12);


function loadMemory(dir: string): Map<string, string> {
  const memory = new Map<string, string>();
  if (!existsSync(dir)) return memory;
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const chunk = JSON.parse(readFileSync(join(dir, file), 'utf8')) as Record<string, string>;
    for (const [hash, text] of Object.entries(chunk)) if (text) memory.set(hash, text);
  }
  return memory;
}

/** Document Service populate tree: every component, media and relation, nested. */
function buildPopulate(strapi: Core.Strapi, attributes: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [field, attr] of Object.entries(attributes)) {
    if (attr.type === 'component') {
      const nested = buildPopulate(strapi, strapi.components[attr.component].attributes);
      out[field] = Object.keys(nested).length ? { populate: nested } : true;
    } else if (attr.type === 'media') {
      out[field] = true;
    } else if (attr.type === 'relation' && !attr.mappedBy) {
      out[field] = { fields: ['documentId'] };
    }
  }
  return out;
}

export async function importTranslations(strapi: Core.Strapi) {
  if (process.env.I18N_IMPORT === 'false') return;

  const base = join(strapi.dirs.app.root, 'data/i18n');
  if (!existsSync(join(base, 'config.json'))) return;
  const config: Config = JSON.parse(readFileSync(join(base, 'config.json'), 'utf8'));
  const memory = loadMemory(join(base, config.locale));
  if (!memory.size) return;

  // Make sure the target locale exists.
  const locales = strapi.plugin('i18n').service('locales');
  if (!(await locales.findByCode(config.locale))) {
    await locales.create({ code: config.locale, name: config.localeName });
    strapi.log.info(`[i18n] created locale ${config.locale}`);
  }
  const { locale } = config;

  const isSkipped = (uid: string | null, componentUid: string | null, field: string) => {
    if (componentUid && config.skipComponentFields.includes(`${componentUid}.${field}`)) return true;
    if (!config.skipFields.includes(field)) return false;
    return !(uid && config.translateAnyway.includes(`${uid}.${field}`));
  };

  const localizedUids = new Set(config.types.map((t) => t.uid));
  /** Fields that make up the Spanish entry: localized text/components + relations between translated types. */
  const isCopied = (attr: any) =>
    attr.type === 'relation'
      ? !attr.mappedBy && localizedUids.has(attr.target)
      : attr.type === 'uid' || attr?.pluginOptions?.i18n?.localized === true;

  // Per-entry counters, in characters: translated vs. left in English.
  let hits = 0;
  let misses = 0;
  const translate = (text: string) => {
    if (!HAS_LETTERS.test(text)) return text;
    const es = memory.get(hashOf(text));
    if (es) hits += text.length;
    else misses += text.length;
    return es ?? text;
  };
  const translateDeep = (value: any): any => {
    if (typeof value === 'string') return translate(value);
    if (Array.isArray(value)) return value.map(translateDeep);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, translateDeep(v)]));
    }
    return value;
  };

  const identity = (v: any) => v;
  /** A translation longer than the field allows (e.g. seo.metaTitle max 60) would fail
   *  the whole entry's validation — keep that one field in English instead. */
  const fit = (attr: any, original: any, translated: any) =>
    typeof translated === 'string' && attr.maxLength && translated.length > attr.maxLength ? original : translated;

  /** Copy of a component value for the Spanish entry: ids dropped, media → id, text run through `tr`. */
  const copyComponent = (value: any, componentUid: string, tr: (v: any) => any): any => {
    if (value == null) return value;
    const { attributes } = strapi.components[componentUid as keyof typeof strapi.components] as any;
    const out: Record<string, any> = {};
    for (const [field, attr] of Object.entries<any>(attributes)) {
      const v = value[field];
      if (v === undefined) continue;
      if (v === null) out[field] = null;
      else if (attr.type === 'component') {
        out[field] = attr.repeatable ? v.map((c: any) => copyComponent(c, attr.component, tr)) : copyComponent(v, attr.component, tr);
      } else if (attr.type === 'media') {
        out[field] = Array.isArray(v) ? v.map((m: any) => m.id) : v.id;
      } else if (attr.type === 'relation') {
        continue;
      } else if (TEXT_TYPES.has(attr.type) && !isSkipped(null, componentUid, field)) {
        out[field] = fit(attr, v, tr(v));
      } else {
        out[field] = v;
      }
    }
    return out;
  };

  /** Copy of a translatable field (text, component, dynamic zone) with its text run through `tr`. */
  const copyField = (attr: any, v: any, tr: (v: any) => any): any => {
    if (attr.type === 'component') {
      if (v == null) return null;
      return attr.repeatable ? v.map((c: any) => copyComponent(c, attr.component, tr)) : copyComponent(v, attr.component, tr);
    }
    if (attr.type === 'dynamiczone') {
      return (v ?? []).map((c: any) => ({ __component: c.__component, ...copyComponent(c, c.__component, tr) }));
    }
    return v == null ? null : fit(attr, v, tr(v));
  };

  for (const { uid } of config.types) {
    const model = strapi.contentTypes[uid as keyof typeof strapi.contentTypes] as any;
    if (!model) continue;
    const docs = strapi.documents(uid as any);
    const populate = buildPopulate(strapi, model.attributes);
    const entries: any[] =
      model.kind === 'singleType'
        ? [await docs.findFirst({ populate } as any)].filter(Boolean)
        : await docs.findMany({ populate, limit: 1000 } as any);

    // Parents before children, so a self-relation (blog-category.parent) can point
    // at a Spanish version that already exists.
    entries.sort((a, b) => Number(Boolean(a.parent)) - Number(Boolean(b.parent)));

    for (const entry of entries) {
      const label = `${uid} ${entry.slug ?? ''}`.trim();
      try {
        const existing = await docs.findOne({ documentId: entry.documentId, locale, populate } as any);
        // Fill mode works on the Spanish entry itself; create mode on a copy of the English one.
        const source = existing ?? entry;

        hits = 0;
        misses = 0;
        const data: Record<string, any> = {};
        for (const [field, attr] of Object.entries<any>(model.attributes)) {
          if (!isCopied(attr)) continue;
          const v = source[field];
          if (v === undefined) continue;
          let next: any;
          if (attr.type === 'relation') {
            if (existing || v == null) continue; // an existing entry keeps its own links
            // Only link Spanish versions that exist (relation targets are per-locale too).
            const target = strapi.documents(attr.target);
            const ids = (Array.isArray(v) ? v : [v]).map((r: any) => r.documentId);
            const present: string[] = [];
            for (const id of ids) if (await target.findOne({ documentId: id, locale, fields: ['documentId'] } as any)) present.push(id);
            next = Array.isArray(v) ? present : (present[0] ?? null);
          } else if (
            attr.type === 'component' ||
            attr.type === 'dynamiczone' ||
            (TEXT_TYPES.has(attr.type) && !isSkipped(uid, null, field))
          ) {
            next = copyField(attr, v, translateDeep);
            // Fill mode: only send fields where a string actually got translated.
            if (existing && JSON.stringify(next) === JSON.stringify(copyField(attr, v, identity))) continue;
          } else {
            if (existing) continue;
            next = v; // uid (same slug as English) and any other per-locale value
          }
          data[field] = next;
        }

        if (existing) {
          if (!Object.keys(data).length) continue;
          await docs.update({ documentId: entry.documentId, locale, data } as any);
          strapi.log.info(`[i18n] filled ${locale} ${label} (${hits} chars translated)`);
          continue;
        }

        const coverage = hits / Math.max(hits + misses, 1);
        if (coverage < MIN_COVERAGE) {
          if (hits) strapi.log.warn(`[i18n] ${label}: only ${Math.round(coverage * 100)}% translated — Spanish version not created yet`);
          continue;
        }
        await docs.update({ documentId: entry.documentId, locale, data } as any);
        strapi.log.info(`[i18n] created ${locale} ${label} (${Math.round(coverage * 100)}% translated)`);
      } catch (err) {
        strapi.log.error(`[i18n] failed for ${label}: ${(err as Error).message}`);
      }
    }
  }
}
