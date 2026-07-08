import type { Schema, Struct } from '@strapi/strapi';

export interface SharedApplyForms extends Struct.ComponentSchema {
  collectionName: 'components_shared_apply_forms';
  info: {
    description: 'Toggle section swapping between the attorney-application and client-match forms';
    displayName: 'Apply Forms';
    icon: 'apps';
  };
  attributes: {
    attorneyForm: Schema.Attribute.Component<'shared.attorney-form', false>;
    attorneyTabLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Join the AP Attorney Network'>;
    clientForm: Schema.Attribute.Component<'shared.client-form', false>;
    clientTabLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Personal Injury Attorney'>;
  };
}

export interface SharedAttorney extends Struct.ComponentSchema {
  collectionName: 'components_shared_attorneys';
  info: {
    description: 'Team member: image (path) + name + role + bio + stats';
    displayName: 'Attorney';
    icon: 'user';
  };
  attributes: {
    address: Schema.Attribute.String;
    bio: Schema.Attribute.Text;
    firm: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    location: Schema.Attribute.String;
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
    yearsExperience: Schema.Attribute.Integer;
  };
}

export interface SharedAttorneyForm extends Struct.ComponentSchema {
  collectionName: 'components_shared_attorney_forms';
  info: {
    description: 'Attorney application form config (heading, image, select options, next-steps)';
    displayName: 'Attorney Form';
    icon: 'briefcase';
  };
  attributes: {
    cityOptions: Schema.Attribute.JSON;
    consentText: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    languageOptions: Schema.Attribute.JSON;
    nextSteps: Schema.Attribute.JSON;
    nextStepsTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What Happens Next?'>;
    note: Schema.Attribute.Text;
    practiceAreaOptions: Schema.Attribute.JSON;
    submitLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Submit My Application'>;
  };
}

export interface SharedAttorneyProfile extends Struct.ComponentSchema {
  collectionName: 'components_shared_attorney_profiles';
  info: {
    description: 'Shared labels + CTA for the attorney profile pages';
    displayName: 'Attorney Profile';
    icon: 'user';
  };
  attributes: {
    aboutHeading: Schema.Attribute.String & Schema.Attribute.DefaultTo<'About'>;
    backLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Back to Network'>;
    credentialsHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Credentials'>;
    requestCta: Schema.Attribute.Component<'shared.cta', false>;
  };
}

export interface SharedBullet extends Struct.ComponentSchema {
  collectionName: 'components_shared_bullets';
  info: {
    description: 'A single bullet line of text';
    displayName: 'Bullet';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

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

export interface SharedClientForm extends Struct.ComponentSchema {
  collectionName: 'components_shared_client_forms';
  info: {
    description: 'Client match form config (heading, image, contact info rows)';
    displayName: 'Client Form';
    icon: 'user';
  };
  attributes: {
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    infoRows: Schema.Attribute.JSON;
    note: Schema.Attribute.Text;
    submitLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Submit \u2014 Match Me with a Georgia Attorney'>;
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
    variant: Schema.Attribute.Enumeration<
      ['primary', 'dark', 'ghost', 'outline']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_banners';
  info: {
    description: 'Closing CTA banner (also feeds the contact form). Phone/CTA come from Service Defaults.';
    displayName: 'CTA Banner';
    icon: 'bell';
  };
  attributes: {
    caseOptions: Schema.Attribute.Component<'shared.select-option', true>;
    formSubject: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    headingMain: Schema.Attribute.String;
    subheading: Schema.Attribute.Text;
  };
}

export interface SharedDamageItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_damage_items';
  info: {
    description: 'Icon + title + description card for the Damages/Compensation grid';
    displayName: 'Damage Item';
    icon: 'shield';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedDamageTab extends Struct.ComponentSchema {
  collectionName: 'components_shared_damage_tabs';
  info: {
    description: 'A labeled tab with its own set of damage/benefit cards';
    displayName: 'Damage Tab';
    icon: 'shield';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.damage-item', true>;
    label: Schema.Attribute.String;
  };
}

export interface SharedDamages extends Struct.ComponentSchema {
  collectionName: 'components_shared_damages';
  info: {
    description: "Dark 'Compensation you can recover' section \u2014 segmented header + icon cards + disclaimer";
    displayName: 'Damages';
    icon: 'shield';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta', false>;
    disclaimer: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    tabs: Schema.Attribute.Component<'shared.damage-tab', true>;
  };
}

export interface SharedDualCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_dual_ctas';
  info: {
    description: 'Dark band \u2014 headline + two text columns + two CTAs';
    displayName: 'Dual CTA';
    icon: 'cursor';
  };
  attributes: {
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    leftText: Schema.Attribute.Text;
    primaryCta: Schema.Attribute.Component<'shared.cta', false>;
    rightText: Schema.Attribute.Text;
    secondaryCta: Schema.Attribute.Component<'shared.cta', false>;
  };
}

export interface SharedFacts extends Struct.ComponentSchema {
  collectionName: 'components_shared_facts';
  info: {
    description: 'Accident facts / road safety \u2014 eyebrow + heading + intro + image + body + stat cards';
    displayName: 'Facts';
    icon: 'chartBubble';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    intro: Schema.Attribute.Text;
    stats: Schema.Attribute.Component<'shared.stat', true>;
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

export interface SharedFaqTabs extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_tabs';
  info: {
    description: 'FAQ with two toggle groups (clients / attorneys)';
    displayName: 'FAQ Tabs';
    icon: 'question';
  };
  attributes: {
    attorneyFaqs: Schema.Attribute.Component<'shared.faq-item', true>;
    attorneyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'For Attorneys'>;
    clientFaqs: Schema.Attribute.Component<'shared.faq-item', true>;
    clientLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'For Injured Clients'>;
    heading: Schema.Attribute.String;
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
    icon: Schema.Attribute.Media<'images'>;
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

export interface SharedHowItWorks extends Struct.ComponentSchema {
  collectionName: 'components_shared_how_it_works';
  info: {
    description: 'Heading + image + 3 numbered steps';
    displayName: 'How It Works';
    icon: 'bulletList';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    steps: Schema.Attribute.Component<'shared.numbered-step', true>;
    subheading: Schema.Attribute.Text;
  };
}

export interface SharedIconCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_icon_card_grids';
  info: {
    description: 'Centered header + grid of named-icon feature cards';
    displayName: 'Icon Card Grid';
    icon: 'grid';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.icon-feature', true>;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    theme: Schema.Attribute.Enumeration<['light', 'dark']> &
      Schema.Attribute.DefaultTo<'dark'>;
  };
}

export interface SharedIconFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_icon_features';
  info: {
    description: 'Named-icon feature card (icon rendered in code, not uploaded)';
    displayName: 'Icon Feature';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    iconImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedIconStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_icon_steps';
  info: {
    description: 'number + icon (path) + title + description';
    displayName: 'Icon Step';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
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
    code: Schema.Attribute.String;
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

export interface SharedLookFor extends Struct.ComponentSchema {
  collectionName: 'components_shared_look_fors';
  info: {
    description: 'What we look for \u2014 image + Preferred / Must-Haves checklists + CTA';
    displayName: 'Look For';
    icon: 'filter';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta', false>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    mustHaves: Schema.Attribute.Component<'shared.bullet', true>;
    mustHavesTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Must-Haves'>;
    preferred: Schema.Attribute.Component<'shared.bullet', true>;
    preferredTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Preferred'>;
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
    ctaSecondary: Schema.Attribute.Component<'shared.cta', false>;
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
    href: Schema.Attribute.String;
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

export interface SharedNearbyCities extends Struct.ComponentSchema {
  collectionName: 'components_shared_nearby_cities';
  info: {
    description: "Dark section \u2014 header + flat list of nearby cities + 'Don't see your city?' band";
    displayName: 'Nearby Cities';
    icon: 'pinMap';
  };
  attributes: {
    body: Schema.Attribute.Text;
    cities: Schema.Attribute.Component<'shared.location', true>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    noticeCtaHref: Schema.Attribute.String;
    noticeCtaLabel: Schema.Attribute.String;
    noticeHeading: Schema.Attribute.String;
    noticeText: Schema.Attribute.Text;
  };
}

export interface SharedNetworkHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_network_heroes';
  info: {
    description: 'Dark hero \u2014 badge, headline, stats row, and two role cards';
    displayName: 'Network Hero';
    icon: 'landscape';
  };
  attributes: {
    badge: Schema.Attribute.String;
    bgImage: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    roleCards: Schema.Attribute.Component<'shared.role-card', true>;
    stats: Schema.Attribute.Component<'shared.stat', true>;
    subhead: Schema.Attribute.Text;
  };
}

export interface SharedNumberedStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_numbered_steps';
  info: {
    description: 'number + title + description (no icon)';
    displayName: 'Numbered Step';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
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
    iconImage: Schema.Attribute.Media<'images'>;
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

export interface SharedRoleCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_role_cards';
  info: {
    description: "Hero role card \u2014 variant icon, title, body, CTA (I'm an Attorney / I Need an Attorney)";
    displayName: 'Role Card';
    icon: 'user';
  };
  attributes: {
    body: Schema.Attribute.Text;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['attorney', 'client']> &
      Schema.Attribute.DefaultTo<'attorney'>;
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

export interface SharedSelectOption extends Struct.ComponentSchema {
  collectionName: 'components_shared_select_options';
  info: {
    description: 'value + label pair for a dropdown option';
    displayName: 'Select Option';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
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

export interface SharedServiceHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_heroes';
  info: {
    description: 'Per-category hero (variable copy). Constants live in Service Defaults.';
    displayName: 'Service Hero';
    icon: 'picture';
  };
  attributes: {
    bgImage: Schema.Attribute.Media<'images'>;
    caseOptions: Schema.Attribute.Component<'shared.select-option', true>;
    description: Schema.Attribute.Text;
    formSubject: Schema.Attribute.String;
    h1Accent: Schema.Attribute.String;
    h1Part1: Schema.Attribute.String;
    h1Subtitle: Schema.Attribute.String;
    heroBody: Schema.Attribute.Text;
    urgencyBullets: Schema.Attribute.Component<'shared.bullet', true>;
  };
}

export interface SharedServiceHeroDefaults extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_hero_defaults';
  info: {
    description: 'Brand-level hero constants shared by every service page';
    displayName: 'Service Hero Defaults';
    icon: 'cog';
  };
  attributes: {
    badge: Schema.Attribute.String;
    clientCount: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    phoneHref: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'shared.stat', true>;
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

export interface SharedStepsToTake extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps_to_take';
  info: {
    description: 'Heading + list of icon steps (what to do after an accident)';
    displayName: 'Steps To Take';
    icon: 'bulletList';
  };
  attributes: {
    heading: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'shared.icon-step', true>;
    subheading: Schema.Attribute.Text;
  };
}

export interface SharedTeam extends Struct.ComponentSchema {
  collectionName: 'components_shared_teams';
  info: {
    description: "Our Attorneys heading + subheading. The roster is chosen via the Service Defaults 'Selected attorneys' picker (relations can't live inside a component).";
    displayName: 'Team';
    icon: 'user';
  };
  attributes: {
    heading: Schema.Attribute.String;
    subheading: Schema.Attribute.Text;
  };
}

export interface SharedTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials_item';
  info: {
    description: 'A single client quote + name + location + star rating';
    displayName: 'Testimonial';
    icon: 'quote';
  };
  attributes: {
    location: Schema.Attribute.String;
    name: Schema.Attribute.String;
    quote: Schema.Attribute.Text;
    rating: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<5>;
  };
}

export interface SharedTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials';
  info: {
    description: 'Heading + carousel of client testimonials';
    displayName: 'Testimonials';
    icon: 'quote';
  };
  attributes: {
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.testimonial', true>;
  };
}

export interface SharedWhyChoose extends Struct.ComponentSchema {
  collectionName: 'components_shared_why_chooses';
  info: {
    description: "Dark 'Why \u2026 choose us' section \u2014 header + card grid + image";
    displayName: 'Why Choose';
    icon: 'check';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'shared.why-choose-item', true>;
  };
}

export interface SharedWhyChooseItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_why_choose_items';
  info: {
    description: 'Title + description card for the Why Choose Us grid';
    displayName: 'Why Choose Item';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedWhyUs extends Struct.ComponentSchema {
  collectionName: 'components_shared_why_us';
  info: {
    description: 'Heading + accent + 3 body paragraphs (features live in Service Defaults)';
    displayName: 'Why Us';
    icon: 'check';
  };
  attributes: {
    body1: Schema.Attribute.Text;
    body2: Schema.Attribute.Text;
    body3: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    headingAccent: Schema.Attribute.String;
  };
}

export interface SharedWhyUsFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_why_us_features';
  info: {
    description: 'grey/yellow icon pair + title + description';
    displayName: 'Why Us Feature';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.String;
    iconGrey: Schema.Attribute.String;
    iconYellow: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.apply-forms': SharedApplyForms;
      'shared.attorney': SharedAttorney;
      'shared.attorney-form': SharedAttorneyForm;
      'shared.attorney-profile': SharedAttorneyProfile;
      'shared.bullet': SharedBullet;
      'shared.city-areas': SharedCityAreas;
      'shared.city-region': SharedCityRegion;
      'shared.client-form': SharedClientForm;
      'shared.closing-cta': SharedClosingCta;
      'shared.contact-form': SharedContactForm;
      'shared.contact-info': SharedContactInfo;
      'shared.cta': SharedCta;
      'shared.cta-banner': SharedCtaBanner;
      'shared.damage-item': SharedDamageItem;
      'shared.damage-tab': SharedDamageTab;
      'shared.damages': SharedDamages;
      'shared.dual-cta': SharedDualCta;
      'shared.facts': SharedFacts;
      'shared.faq': SharedFaq;
      'shared.faq-item': SharedFaqItem;
      'shared.faq-tabs': SharedFaqTabs;
      'shared.feature': SharedFeature;
      'shared.feature-grid': SharedFeatureGrid;
      'shared.hero': SharedHero;
      'shared.how-it-works': SharedHowItWorks;
      'shared.icon-card-grid': SharedIconCardGrid;
      'shared.icon-feature': SharedIconFeature;
      'shared.icon-step': SharedIconStep;
      'shared.info-card': SharedInfoCard;
      'shared.info-cards': SharedInfoCards;
      'shared.location': SharedLocation;
      'shared.locations': SharedLocations;
      'shared.look-for': SharedLookFor;
      'shared.media-text': SharedMediaText;
      'shared.menu-column': SharedMenuColumn;
      'shared.nav-item': SharedNavItem;
      'shared.nav-link': SharedNavLink;
      'shared.nearby-cities': SharedNearbyCities;
      'shared.network-hero': SharedNetworkHero;
      'shared.numbered-step': SharedNumberedStep;
      'shared.process-block': SharedProcessBlock;
      'shared.process-card': SharedProcessCard;
      'shared.process-cards': SharedProcessCards;
      'shared.role-card': SharedRoleCard;
      'shared.section-heading': SharedSectionHeading;
      'shared.select-option': SharedSelectOption;
      'shared.seo': SharedSeo;
      'shared.service-hero': SharedServiceHero;
      'shared.service-hero-defaults': SharedServiceHeroDefaults;
      'shared.social-link': SharedSocialLink;
      'shared.stat': SharedStat;
      'shared.step': SharedStep;
      'shared.steps-row': SharedStepsRow;
      'shared.steps-to-take': SharedStepsToTake;
      'shared.team': SharedTeam;
      'shared.testimonial': SharedTestimonial;
      'shared.testimonials': SharedTestimonials;
      'shared.why-choose': SharedWhyChoose;
      'shared.why-choose-item': SharedWhyChooseItem;
      'shared.why-us': SharedWhyUs;
      'shared.why-us-feature': SharedWhyUsFeature;
    }
  }
}
