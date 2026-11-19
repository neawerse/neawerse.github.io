import { siteLaunched } from "./site_config";

// What the app shows. import.meta.env.DEV is replaced at build time, so the
// production bundle and the prerendered HTML always agree.
//
// The same two rules exist for the route list (lib/routed_books.ts), which
// runs outside the bundle and reads the NEAWE_DRAFTS variable that
// `npm run dev` sets instead — run the dev server through npm, or draft
// books are listed on the home page without routes behind them.

/** The full site (book list, reading pages) instead of the coming-soon card. */
export const showFullSite = siteLaunched;

/** Draft books exist only in the dev server; they never reach a build. */
export const includeDrafts = import.meta.env.DEV;
