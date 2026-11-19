import { marked } from "marked";
import { chapterFile } from "./books";

// Build-time only (".server"): loaders run during prerender, so the Markdown
// files and the parser never reach the visitor's bundle — each reading page
// is plain HTML in its own prerendered file.
//
// Lazy glob: a chapter's text is read only when its own page is built.
const sources = import.meta.glob<string>("./books/**/*.md", { query: "?raw", import: "default" });

// The text is the author's own, so the HTML it produces is trusted. A scene
// break written as "* * *" becomes <hr>, drawn as the asterism (⁂) in
// app/styles/reading.css.
export async function chapterHtml(bookSlug: string, chapterSlug: string): Promise<string> {
  const key = `./${chapterFile(bookSlug, chapterSlug)}`;
  const load = sources[key];
  if (!load) {
    throw new Error(`chapter_source: no Markdown file at app/content/${chapterFile(bookSlug, chapterSlug)}`);
  }
  return marked.parse(await load(), { async: false, gfm: true });
}
