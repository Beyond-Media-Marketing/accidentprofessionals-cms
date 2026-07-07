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
  { uid: 'api::about-page.about-page', seedKey: 'aboutPage' },
  { uid: 'api::services-page.services-page', seedKey: 'servicesPage' },
  { uid: 'api::contact-page.contact-page', seedKey: 'contactPage' },
  { uid: 'api::service-defaults.service-defaults', seedKey: 'serviceDefaults' },
] as const;

/**
 * Public read actions to grant. Single-types only need `.find`; collection
 * types need both `.find` (list) and `.findOne` (single entry by id/slug).
 */
const READ_ACTIONS = [
  ...SINGLE_TYPES.map((t) => `${t.uid}.find`),
  'api::service-category.service-category.find',
  'api::service-category.service-category.findOne',
  'api::service.service.find',
  'api::service.service.findOne',
  'api::state-page.state-page.find',
  'api::state-page.state-page.findOne',
  'api::city-page.city-page.find',
  'api::city-page.city-page.findOne',
];

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

/**
 * Seed the service structure: categories first, then sub-services linked to
 * their parent category by slug. Keyed on `slug` so re-runs are idempotent.
 */
async function seedServiceStructure(strapi: Core.Strapi, force = false) {
  const CATEGORY_UID = 'api::service-category.service-category';
  const SERVICE_UID = 'api::service.service';
  const categories = (seedData as Record<string, any>).serviceCategories as any[] | undefined;
  const services = (seedData as Record<string, any>).services as any[] | undefined;
  const catIdBySlug: Record<string, string> = {};

  if (Array.isArray(categories)) {
    for (const cat of categories) {
      try {
        const existing = await strapi
          .documents(CATEGORY_UID as any)
          .findFirst({ filters: { slug: cat.slug } });
        let doc: any;
        if (existing && !force) {
          doc = existing;
        } else if (existing && force) {
          doc = await strapi
            .documents(CATEGORY_UID as any)
            .update({ documentId: existing.documentId, data: cat });
          strapi.log.info(`[seed] FORCE-updated service-category ${cat.slug}`);
        } else {
          doc = await strapi.documents(CATEGORY_UID as any).create({ data: cat });
          strapi.log.info(`[seed] created service-category ${cat.slug}`);
        }
        catIdBySlug[cat.slug] = doc.documentId;
      } catch (err) {
        strapi.log.error(`[seed] failed for service-category ${cat.slug}: ${(err as Error).message}`);
      }
    }
  }

  if (Array.isArray(services)) {
    for (const svc of services) {
      const { categorySlug, ...data } = svc;
      const categoryDocId = catIdBySlug[categorySlug];
      const payload = { ...data, ...(categoryDocId ? { category: categoryDocId } : {}) };
      try {
        const existing = await strapi
          .documents(SERVICE_UID as any)
          .findFirst({ filters: { slug: svc.slug } });
        if (existing && !force) continue;
        if (existing && force) {
          await strapi
            .documents(SERVICE_UID as any)
            .update({ documentId: existing.documentId, data: payload });
          strapi.log.info(`[seed] FORCE-updated service ${svc.slug}`);
        } else {
          await strapi.documents(SERVICE_UID as any).create({ data: payload });
          strapi.log.info(`[seed] created service ${svc.slug}`);
        }
      } catch (err) {
        strapi.log.error(`[seed] failed for service ${svc.slug}: ${(err as Error).message}`);
      }
    }
  }
}

/** Seed a slug-keyed collection (state-page, city-page) from data/seed.json. */
async function seedSlugCollection(strapi: Core.Strapi, uid: string, seedKey: string, force = false) {
  const pages = (seedData as Record<string, any>)[seedKey] as any[] | undefined;
  if (!Array.isArray(pages)) return;
  for (const page of pages) {
    try {
      const existing = await strapi.documents(uid as any).findFirst({ filters: { slug: page.slug } });
      if (existing && !force) continue;
      if (existing && force) {
        await strapi.documents(uid as any).update({ documentId: existing.documentId, data: page });
        strapi.log.info(`[seed] FORCE-updated ${uid} ${page.slug}`);
      } else {
        await strapi.documents(uid as any).create({ data: page });
        strapi.log.info(`[seed] created ${uid} ${page.slug}`);
      }
    } catch (err) {
      strapi.log.error(`[seed] failed for ${uid} ${page.slug}: ${(err as Error).message}`);
    }
  }
}

/** Grant the public role read access to every seeded content type. */
async function grantPublicRead(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;

  for (const action of READ_ACTIONS) {
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
    await seedServiceStructure(strapi, force);
    await seedSlugCollection(strapi, 'api::state-page.state-page', 'statePages', force);
    await seedSlugCollection(strapi, 'api::city-page.city-page', 'cityPages', force);
    await grantPublicRead(strapi);
  },
};
