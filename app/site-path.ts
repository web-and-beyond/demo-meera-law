/** Prefix plain HTML links and public images, which Next's basePath does not rewrite. */
export function sitePath(path = "") {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "/demos/meera";
  return `${base}/${path.replace(/^\/+/, "")}`;
}
