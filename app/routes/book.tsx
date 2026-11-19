import { Link, useLoaderData, type LoaderFunctionArgs, type MetaArgs } from "react-router";
import { books } from "../content/books";
import { siteCopy } from "../content/site_copy";
import { bookPath, chapterPath, homePath, mainContentId, pathSegments } from "../lib/paths";
import { buildMeta } from "../lib/seo";
import "../styles/reading.css";

// Route types are written out with React Router's generics instead of the
// generated ./+types module: typegen covers only the routes in the config,
// and while the catalogue has no book, routes.ts registers no book or chapter
// route, so the generated types would not exist.

// routes.ts registers this module once per book, so the slug always
// resolves; a miss means the two drifted apart, and the build fails loudly.
export function loader({ request }: LoaderFunctionArgs) {
  const [bookSlug] = pathSegments(request.url);
  const book = books.find((candidate) => candidate.slug === bookSlug);
  if (!book) {
    throw new Error(`book: no book in books.ts for "${bookSlug}"`);
  }
  return { book };
}

export function meta({ loaderData }: MetaArgs<typeof loader>) {
  if (!loaderData) return [];
  const { book } = loaderData;
  return buildMeta({ path: bookPath(book.slug), title: `${book.title} — ${siteCopy.name}`, description: book.summary });
}

export default function BookPage() {
  const { book } = useLoaderData<typeof loader>();
  return (
    <main className="page" id={mainContentId} tabIndex={-1}>
      <Link to={homePath} className="back_link">
        <span aria-hidden="true">← </span>
        {siteCopy.backToBooks}
      </Link>
      <h1 className="page_title">{book.title}</h1>
      <p className="page_note">{book.summary}</p>
      <ol className="chapter_list">
        {book.chapters.map((chapter) => (
          <li key={chapter.slug}>
            <Link to={chapterPath(book.slug, chapter.slug)}>{chapter.title}</Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
