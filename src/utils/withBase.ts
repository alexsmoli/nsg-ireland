const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

/** Prefix a root-relative path ("/guides/") with the configured base path. */
export const withBase = (path: string): string =>
  path.startsWith("/") && !path.startsWith("//") ? `${BASE}${path}` : path;

/** Strip the base path from a pathname, e.g. for breadcrumbs. */
export const stripBase = (pathname: string): string =>
  BASE && pathname.startsWith(BASE)
    ? pathname.slice(BASE.length) || "/"
    : pathname;
