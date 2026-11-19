import { visibleBooks, type Book } from "../content/books";
import { siteLaunched } from "./site_config";

// The books that get routes — read by both app/routes.ts and
// react-router.config.ts's prerender(), so the two lists can never differ.
// They must not: with `ssr: false`, a route with a loader is only valid if
// it is prerendered, and the build stops otherwise.
//
// Runs outside the app bundle (Node, at config time), so it reads the
// NEAWE_DRAFTS variable that `npm run dev` and `npm run typecheck` set
// (package.json); `npm run build` never sets it, so a build never contains a
// draft. Before launch a build has no book routes at all — only the
// coming-soon home page and the 404.
export function routedBooks(): Book[] {
  const withDrafts = process.env.NEAWE_DRAFTS === "1";
  return siteLaunched || withDrafts ? visibleBooks(withDrafts) : [];
}
