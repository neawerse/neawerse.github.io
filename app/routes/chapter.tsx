import { Link, useLoaderData, type LoaderFunctionArgs, type MetaArgs } from "react-router";
import { books } from "../content/books";
import { chapterHtml } from "../content/chapter_source.server";
import { siteCopy } from "../content/site_copy";
import { bookPath, chapterPath, mainContentId, pathSegments } from "../lib/paths";
import { buildMeta } from "../lib/seo";
import "../styles/reading.css";

// Route types are written out with React Router's generics instead of the
// generated ./+types module: typegen covers only the routes in the config,
// and while the catalogue has no book, routes.ts registers no book or chapter
// route, so the generated types would not exist.

// Runs at build time (prerender): the chapter's Markdown becomes HTML in the
// page's own file, and the previous / next chapter come from books.ts order.
export async function loader({ request }: LoaderFunctionArgs) {
  const [bookSlug, chapterSlug] = pathSegments(request.url);
  const book = books.find((candidate) => candidate.slug === bookSlug);
  const index = book ? book.chapters.findIndex((chapter) => chapter.slug === chapterSlug) : -1;
  const chapter = book?.chapters[index];
  if (!book || !chapter) {
    throw new Error(`chapter: no chapter in books.ts for "${bookSlug}/${chapterSlug}"`);
  }
  return {
    book: { slug: book.slug, title: book.title },
    chapter,
    html: await chapterHtml(book.slug, chapter.slug),
    previous: book.chapters[index - 1] ?? null,
    next: book.chapters[index + 1] ?? null,
  };
}

export function meta({ loaderData }: MetaArgs<typeof loader>) {
  if (!loaderData) return [];
  const { book, chapter } = loaderData;
  return buildMeta({
    path: chapterPath(book.slug, chapter.slug),
    title: `${chapter.title} — ${book.title}`,
    description: `${book.title}: ${chapter.title}`,
  });
}

export default function ChapterPage() {
  const { book, chapter, html, previous, next } = useLoaderData<typeof loader>();
  return (
    <main className="page reading" id={mainContentId} tabIndex={-1}>
      <Link to={bookPath(book.slug)} className="back_link">
        <span aria-hidden="true">← </span>
        {book.title}
      </Link>
      <h1 className="chapter_title">{chapter.title}</h1>
      <article className="chapter_text" dangerouslySetInnerHTML={{ __html: html }} />
      <nav className="chapter_nav" aria-label={siteCopy.chapterNavLabel}>
        {previous ? (
          <Link to={chapterPath(book.slug, previous.slug)} rel="prev">
            <span aria-hidden="true">← </span>
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={chapterPath(book.slug, next.slug)} rel="next">
            {next.title}
            <span aria-hidden="true"> →</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
