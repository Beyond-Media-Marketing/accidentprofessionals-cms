import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  // HTML-based rich text editor (CKEditor 5, self-hosted) for blog content.
  ckeditor5: { enabled: true },
});

export default config;
