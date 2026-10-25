import type { Site, SocialObjects } from "./types";
import settings from "./data/settings.json";

export const SITE: Site = {
  website: "https://alexsmoli.github.io/nsg-ireland/", // switch to the custom domain (and remove `base` in astro.config.ts) once DNS is set up
  author: "Night Sky Guides Ireland",
  desc: "Look up and explore the wonders of the universe with your personal Night Sky Guide in the Kerry International Dark Sky Reserve.",
  title: "Night Sky Guides Ireland",
  ogImage: "assets/nsg-logo-original.jpg",
  lightAndDarkMode: false,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

// Edited in Pages CMS → "Site settings" (src/data/settings.json)
export const CONTACT = settings.contact;

export const NAV_LINKS = [
  { href: "/about/", label: "About Us", key: "about" },
  { href: "/guides/", label: "Our Guides", key: "guides" },
  { href: "/dark-sky-reserve/", label: "Dark Sky Reserve", key: "reserve" },
  { href: "/posts/", label: "News", key: "posts" },
  { href: "/membership/", label: "Membership", key: "membership" },
  { href: "/contact/", label: "Contact", key: "contact" },
] as const;

export type NavKey = (typeof NAV_LINKS)[number]["key"];

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-IE"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

// Social links are edited in Pages CMS → "Site settings"; empty = hidden
export const SOCIALS: SocialObjects = [
  {
    name: "Facebook",
    href: settings.socials.facebook,
    linkTitle: `${SITE.title} on Facebook`,
    active: Boolean(settings.socials.facebook),
  },
  {
    name: "Instagram",
    href: settings.socials.instagram,
    linkTitle: `${SITE.title} on Instagram`,
    active: Boolean(settings.socials.instagram),
  },
  {
    name: "Mail",
    href: `mailto:${CONTACT.email}`,
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];
