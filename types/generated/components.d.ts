import type { Schema, Struct } from '@strapi/strapi';

export interface SharedContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_infos';
  info: {
    description: 'Phone / email / address / hours line';
    displayName: 'Contact Info';
    icon: 'phone';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['phone', 'email', 'address', 'hours']> &
      Schema.Attribute.DefaultTo<'phone'>;
    value: Schema.Attribute.String;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_ctas';
  info: {
    description: 'Single call-to-action button';
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    scrollTo: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['primary', 'dark', 'ghost']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    description: 'Above-the-fold hero block';
    displayName: 'Hero';
    icon: 'picture';
  };
  attributes: {
    bgImage: Schema.Attribute.Media<'images'>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    primaryCta: Schema.Attribute.Component<'shared.cta', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta', false>;
    subhead: Schema.Attribute.Text;
  };
}

export interface SharedMenuColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_menu_columns';
  info: {
    description: 'A titled column of links (mega-menu column / footer column)';
    displayName: 'Menu Column';
    icon: 'bulletList';
  };
  attributes: {
    heading: Schema.Attribute.String;
    links: Schema.Attribute.Component<'shared.nav-item', true>;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    description: 'Leaf menu link (used in mega-menu columns and footer columns)';
    displayName: 'Nav Item';
    icon: 'link';
  };
  attributes: {
    description: Schema.Attribute.String;
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface SharedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_links';
  info: {
    description: 'Top-level header nav entry \u2014 a plain link, or a mega-menu trigger';
    displayName: 'Nav Link';
    icon: 'link';
  };
  attributes: {
    columns: Schema.Attribute.Component<'shared.menu-column', true>;
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    hasMegaMenu: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface SharedSectionHeading extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headings';
  info: {
    description: 'Reusable eyebrow + heading + intro';
    displayName: 'Section Heading';
    icon: 'bold';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Per-page SEO metadata';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    focusKeyword: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    nofollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noindex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogImage: Schema.Attribute.Media<'images'>;
    schemaType: Schema.Attribute.Enumeration<
      [
        'WebPage',
        'AboutPage',
        'ContactPage',
        'Service',
        'CollectionPage',
        'FAQPage',
      ]
    > &
      Schema.Attribute.DefaultTo<'WebPage'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media profile link';
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    label: Schema.Attribute.String;
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'linkedin', 'youtube', 'tiktok', 'twitter']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.contact-info': SharedContactInfo;
      'shared.cta': SharedCta;
      'shared.hero': SharedHero;
      'shared.menu-column': SharedMenuColumn;
      'shared.nav-item': SharedNavItem;
      'shared.nav-link': SharedNavLink;
      'shared.section-heading': SharedSectionHeading;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
