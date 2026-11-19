// While the site is not launched, every build and the dev server serve only
// the "coming soon" page (and the 404); the reading pages stay in the code
// but are never shown. Flip this once real books are in.
//
// Kept free of import.meta.env on purpose: lib/routed_books.ts (read by
// react-router.config.ts and app/routes.ts) imports it too and runs outside
// the app bundle. The app-side switches live in lib/visibility.ts.
export const siteLaunched = false;
