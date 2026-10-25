const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

/** Prefix a root-relative path ("/guides/") with the configured base path. */
export const withBase = (path: string): string =>
  path.startsWith("/") && !path.startsWith("//") ? `${BASE}${path}` : path;

/** Prefix root-relative href/src attributes inside an HTML string (CMS rich text). */
export const withBaseHtml = (html: string): string =>
  html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`);

/** Strip the base path from a pathname, e.g. for breadcrumbs. */
export const stripBase = (pathname: string): string =>
  BASE && pathname.startsWith(BASE)
    ? pathname.slice(BASE.length) || "/"
    : pathname;
