// The catalogue: every book and its chapters, in reading order. A chapter's
// text is a Markdown file at app/content/books/<book slug>/<chapter slug>.md;
// react-router.config.ts fails the build if a listed chapter has no file or
// a file is not listed, so the two can never drift apart.
//
// Slugs become addresses (/<book>/<chapter>/): lowercase ASCII letters,
// digits and underscores only, never changed once published.

export interface Chapter {
  slug: string;
  title: string;
}

export interface Book {
  slug: string;
  title: string;
  /** One or two sentences for the book list and the share preview. */
  summary: string;
  /** Drafts are visible in the dev server only, never in a build. */
  draft: boolean;
  chapters: Chapter[];
}

// No books yet: the first one comes with the content plan.
export const books: Book[] = [];

export function visibleBooks(withDrafts: boolean): Book[] {
  return books.filter((book) => withDrafts || !book.draft);
}

export function chapterFile(bookSlug: string, chapterSlug: string): string {
  return `books/${bookSlug}/${chapterSlug}.md`;
}
