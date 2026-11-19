import type { Book } from "../content/books";

// Every internal path is built here, trailing slash included. GitHub Pages
// serves each route as a folder + index.html; a path without the trailing
// slash costs every visitor one extra 301 redirect.

export const homePath = "/";

export function bookPath(bookSlug: string): string {
  return `/${bookSlug}/`;
}

export function chapterPath(bookSlug: string, chapterSlug: string): string {
  return `/${bookSlug}/${chapterSlug}/`;
}

// Every real, indexable page for the given books — what
// react-router.config.ts prerenders (plus /404).
export function contentPaths(shownBooks: Book[]): string[] {
  const paths = [homePath];
  for (const book of shownBooks) {
    paths.push(bookPath(book.slug));
    for (const chapter of book.chapters) {
      paths.push(chapterPath(book.slug, chapter.slug));
    }
  }
  return paths;
}

// Deployed custom domain — see public/CNAME.
export const siteUrl = "https://neawe.com";

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}

// React Router route ids. app/routes.ts registers one literal route per page,
// so the book and chapter modules each serve several routes and every route
// needs its own id.
export function bookRouteId(bookSlug: string): string {
  return `book/${bookSlug}`;
}

export function chapterRouteId(bookSlug: string, chapterSlug: string): string {
  return `chapter/${bookSlug}/${chapterSlug}`;
}

// The literal routes carry no :params, so a loader reads which page it serves
// from its own URL: /<book>/ → [book], /<book>/<chapter>/ → [book, chapter].
export function pathSegments(url: string): string[] {
  return new URL(url).pathname.split("/").filter(Boolean);
}

// The skip link's target: every route's top-level <main> carries this id.
export const mainContentId = "main_content";
