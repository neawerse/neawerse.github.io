import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { bookRouteId, chapterRouteId } from "./lib/paths";
import { routedBooks } from "./lib/routed_books";

// Which books get routes (drafts, launch) is decided in one place,
// lib/routed_books.ts, shared with the prerender list.
//
// One literal route per real page, generated from books.ts — never a
// catch-all dynamic segment. A dynamic segment also matches every unknown
// URL, /404 included, and the prerendered 404.html would render a book page
// instead of not_found.tsx. Every unknown URL must reach the "*" route.
export default [
  index("routes/home.tsx"),
  ...routedBooks().flatMap((book) => [
    route(book.slug, "routes/book.tsx", { id: bookRouteId(book.slug) }),
    ...book.chapters.map((chapter) =>
      route(`${book.slug}/${chapter.slug}`, "routes/chapter.tsx", { id: chapterRouteId(book.slug, chapter.slug) }),
    ),
  ]),
  route("*", "routes/not_found.tsx"),
] satisfies RouteConfig;
