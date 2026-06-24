import type { Core } from '@strapi/strapi';
import seedData from '../data/seed.json';

/**
 * Every single-type that should be auto-seeded on boot and exposed to the
 * public (read-only) API. Add one line here per new page/global single-type.
 */
const SINGLE_TYPES = [
  { uid: 'api::global-setting.global-setting', seedKey: 'globalSetting' },
  { uid: 'api::navigation.navigation', seedKey: 'navigation' },
  { uid: 'api::footer.footer', seedKey: 'footer' },
  { uid: 'api::home-page.home-page', seedKey: 'homePage' },
] as const;

/**
 * Seed single-types from data/seed.json.
 * - Empty single-type  → create from seed
 * - Existing + !force  → leave as-is (editor changes are preserved)
 * - Existing + force    → overwrite (SEED_FORCE=true)
 */
async function seedSingleTypes(strapi: Core.Strapi, force = false) {
  for (const { uid, seedKey } of SINGLE_TYPES) {
    const data = (seedData as Record<string, any>)[seedKey];
    if (!data) continue;

    const existing = await strapi.documents(uid as any).findFirst({});

    if (existing && !force) continue;

    try {
      if (existing && force) {
        await strapi.documents(uid as any).update({ documentId: existing.documentId, data });
        strapi.log.info(`[seed] FORCE-updated ${uid}`);
      } else {
        await strapi.documents(uid as any).create({ data });
        strapi.log.info(`[seed] created ${uid}`);
      }
    } catch (err) {
      strapi.log.error(`[seed] failed for ${uid}: ${(err as Error).message}`);
    }
  }
}

/** Grant the public role read (find) access to every seeded single-type. */
async function grantPublicRead(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;

  for (const { uid } of SINGLE_TYPES) {
    const action = `${uid}.find`;
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });
    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
      strapi.log.info(`[seed] granted public read: ${action}`);
    }
  }
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const force = process.env.SEED_FORCE === 'true';
    if (force) strapi.log.warn('[seed] SEED_FORCE=true — overwriting single-types');
    await seedSingleTypes(strapi, force);
    await grantPublicRead(strapi);
  },
};
