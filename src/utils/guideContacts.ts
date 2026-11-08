import type { CollectionEntry } from "astro:content";

type Contact = CollectionEntry<"guides">["data"]["contact"];

export type ContactLink = {
  type: "email" | "phone" | "instagram" | "website";
  href: string;
  label: string;
  external: boolean;
};

/** "+353 (0)86 199 27 60" → "+353861992760" */
const telHref = (phone: string) => {
  const cleaned = phone.replace(/\(0\)/g, "").replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
};

/** Accepts "@handle", "handle" or a full profile URL. */
const instagramHref = (value: string) => {
  const v = value.trim();
  if (/^https?:\/\//i.test(v)) return v;
  const handle = v
    .replace(/^@/, "")
    .replace(/^(www\.)?instagram\.com\//i, "")
    .replace(/\/+$/, "");
  return `https://www.instagram.com/${handle}/`;
};

/** Adds https:// when the scheme is missing ("www.example.com"). */
const websiteHref = (value: string) => {
  const v = value.trim();
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
};

/** Contact links for a guide, in display order, skipping empty fields. */
export const guideContactLinks = (
  contact: Contact,
  name: string
): ContactLink[] => {
  const links: ContactLink[] = [];
  const { email, phone, instagram, website } = contact ?? {};
  if (email?.trim())
    links.push({
      type: "email",
      href: `mailto:${email.trim()}`,
      label: `Email ${name}`,
      external: false,
    });
  if (phone?.trim())
    links.push({
      type: "phone",
      href: telHref(phone),
      label: `Call ${name}`,
      external: false,
    });
  if (instagram?.trim())
    links.push({
      type: "instagram",
      href: instagramHref(instagram),
      label: `${name} on Instagram`,
      external: true,
    });
  if (website?.trim())
    links.push({
      type: "website",
      href: websiteHref(website),
      label: `Website of ${name}`,
      external: true,
    });
  return links;
};
