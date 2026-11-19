import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { Config } from "@react-router/dev/config";
import { books, chapterFile } from "./app/content/books";
import { contentPaths } from "./app/lib/paths";
import { routedBooks } from "./app/lib/routed_books";

const contentDir = "app/content";

// Fails the build loudly if the catalogue and the chapter files drifted
// apart: a listed chapter without its Markdown file, or a file the catalogue
// does not list (a chapter that would silently never be published).
function assertBooksComplete(): void {
  const problems: string[] = [];
  for (const book of books) {
    for (const chapter of book.chapters) {
      const file = chapterFile(book.slug, chapter.slug);
      if (!existsSync(join(contentDir, file))) problems.push(`listed but missing: ${file}`);
    }
    const dir = join(contentDir, "books", book.slug);
    const listed = new Set(book.chapters.map((chapter) => `${chapter.slug}.md`));
    for (const name of existsSync(dir) ? readdirSync(dir) : []) {
      if (name.endsWith(".md") && !listed.has(name)) problems.push(`file not in books.ts: books/${book.slug}/${name}`);
    }
  }
  if (problems.length > 0) {
    throw new Error(`books.ts and the chapter files drifted apart:\n  ${problems.join("\n  ")}`);
  }
}

export default {
  // Fully static site — no server runtime. GitHub Pages only serves files.
  ssr: false,
  async prerender() {
    assertBooksComplete();
    // Exactly the routed books (lib/routed_books.ts): a build never contains
    // drafts, and before launch only the home page (and the 404) is built.
    return [...contentPaths(routedBooks()), "/404"];
  },
} satisfies Config;
