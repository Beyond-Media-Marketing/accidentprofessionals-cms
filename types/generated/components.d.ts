import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCityAreas extends Struct.ComponentSchema {
  collectionName: 'components_shared_city_areas';
  info: {
    description: 'Header + region tabs with city cards';
    displayName: 'City Areas';
    icon: 'pinMap';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    regions: Schema.Attribute.Component<'shared.city-region', true>;
  };
}

export interface SharedCityRegion extends Struct.ComponentSchema {
  collectionName: 'components_shared_city_regions';
  info: {
    description: 'A Georgia region tab + its city cards';
    displayName: 'City Region';
    icon: 'pinMap';
  };
  attributes: {
    cities: Schema.Attribute.Component<'shared.location', true>;
    region: Schema.Attribute.String;
  };
}

export interface SharedClosingCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_closing_ctas';
  info: {
    description: 'Final CTA banner \u2014 lead heading + dark call-to-action block';
    displayName: 'Closing CTA';
    icon: 'bell';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta', false>;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    leadHeading: Schema.Attribute.String;
    note: Schema.Attribute.String;
    subtext: Schema.Attribute.Text;
  };
}

export interface SharedContactForm extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_forms';
  info: {
    description: 'Contact form + reach-us info card + map';
    displayName: 'Contact Form';
    icon: 'envelop';
  };
  attributes: {
    address: Schema.Attribute.Text;
    callHeading: Schema.Attribute.String;
    email: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    formSubject: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    mapEmbedUrl: Schema.Attribute.String;
    mapImage: Schema.Attribute.Media<'images'>;
    phone: Schema.Attribute.String;
    phoneLabel: Schema.Attribute.String;
    phoneNote: Schema.Attribute.String;
    reachHeading: Schema.Attribute.String;
    submitLabel: Schema.Attribute.String;
  };
}

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

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    description: 'Heading + list of FAQ items (emits FAQPage schema)';
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'shared.faq-item', true>;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    description: 'Question + answer pair';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface SharedFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    description: 'Icon + title + description card';
    displayName: 'Feature';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    linkHref: Schema.Attribute.String;
    linkLabel: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_grids';
  info: {
    description: 'Centered header + grid of feature cards (e.g. Why Choose Us)';
    displayName: 'Feature Grid';
    icon: 'grid';
  };
  attributes: {
    bgImage: Schema.Attribute.Media<'images'>;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    eyebrow: Schema.Attribute.String;
    features: Schema.Attribute.Component<'shared.feature', true>;
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.RichText;
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
    align: Schema.Attribute.Enumeration<['left', 'center']> &
      Schema.Attribute.DefaultTo<'left'>;
    bgImage: Schema.Attribute.Media<'images'>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    primaryCta: Schema.Attribute.Component<'shared.cta', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta', false>;
    subhead: Schema.Attribute.RichText;
  };
}

export interface SharedInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_info_cards_item';
  info: {
    description: 'Icon + title + description text card';
    displayName: 'Info Card';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedInfoCards extends Struct.ComponentSchema {
  collectionName: 'components_shared_info_cards';
  info: {
    description: 'Header + row of image cards (e.g. Georgia PI law)';
    displayName: 'Info Cards';
    icon: 'bulletList';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.info-card', true>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true>;
    intro: Schema.Attribute.Text;
  };
}

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_location';
  info: {
    description: 'City / service-area name with optional link';
    displayName: 'Location';
    icon: 'pinMap';
  };
  attributes: {
    href: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface SharedLocations extends Struct.ComponentSchema {
  collectionName: 'components_shared_locations';
  info: {
    description: "Where To Find Us \u2014 header + city grid + 'don't see your city' CTA card";
    displayName: 'Locations';
    icon: 'pinMap';
  };
  attributes: {
    cities: Schema.Attribute.Component<'shared.location', true>;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    ctaBody: Schema.Attribute.Text;
    ctaHeading: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    intro: Schema.Attribute.RichText;
  };
}

export interface SharedMediaText extends Struct.ComponentSchema {
  collectionName: 'components_shared_media_texts';
  info: {
    description: 'Image + content (side-by-side or stacked), with optional highlight card';
    displayName: 'Media Text';
    icon: 'picture';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    highlightText: Schema.Attribute.Text;
    highlightTitle: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    layout: Schema.Attribute.Enumeration<
      ['image-left', 'image-right', 'stacked']
    > &
      Schema.Attribute.DefaultTo<'image-left'>;
    theme: Schema.Attribute.Enumeration<['light', 'dark']> &
      Schema.Attribute.DefaultTo<'light'>;
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

export interface SharedProcessBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_blocks';
  info: {
    description: 'Centered header + image with highlight card + numbered steps (e.g. How We Help)';
    displayName: 'Process Block';
    icon: 'apps';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta', false>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    highlightIcon: Schema.Attribute.Media<'images'>;
    highlightText: Schema.Attribute.Text;
    highlightTitle: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    intro: Schema.Attribute.RichText;
    steps: Schema.Attribute.Component<'shared.step', true>;
  };
}

export interface SharedProcessCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_card';
  info: {
    description: 'Big numbered card \u2014 icon, title, body and CTA';
    displayName: 'Process Card';
    icon: 'layer';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    icon: Schema.Attribute.String;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedProcessCards extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_cards';
  info: {
    description: 'Header + row of big numbered process cards (e.g. Our Process)';
    displayName: 'Process Cards';
    icon: 'layer';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.process-card', true>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.RichText;
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

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    description: 'A single number + label (e.g. 15+ Years)';
    displayName: 'Stat';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps';
  info: {
    description: 'Numbered process step';
    displayName: 'Step';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedStepsRow extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps_rows';
  info: {
    description: 'Two-column header + a row of numbered step cards (first highlighted)';
    displayName: 'Steps Row';
    icon: 'bulletList';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'shared.step', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.city-areas': SharedCityAreas;
      'shared.city-region': SharedCityRegion;
      'shared.closing-cta': SharedClosingCta;
      'shared.contact-form': SharedContactForm;
      'shared.contact-info': SharedContactInfo;
      'shared.cta': SharedCta;
      'shared.faq': SharedFaq;
      'shared.faq-item': SharedFaqItem;
      'shared.feature': SharedFeature;
      'shared.feature-grid': SharedFeatureGrid;
      'shared.hero': SharedHero;
      'shared.info-card': SharedInfoCard;
      'shared.info-cards': SharedInfoCards;
      'shared.location': SharedLocation;
      'shared.locations': SharedLocations;
      'shared.media-text': SharedMediaText;
      'shared.menu-column': SharedMenuColumn;
      'shared.nav-item': SharedNavItem;
      'shared.nav-link': SharedNavLink;
      'shared.process-block': SharedProcessBlock;
      'shared.process-card': SharedProcessCard;
      'shared.process-cards': SharedProcessCards;
      'shared.section-heading': SharedSectionHeading;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.stat': SharedStat;
      'shared.step': SharedStep;
      'shared.steps-row': SharedStepsRow;
    }
  }
}
