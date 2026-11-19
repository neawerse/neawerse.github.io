import { Link } from "react-router";
import { ComingSoon } from "../components/coming_soon";
import { visibleBooks } from "../content/books";
import { siteCopy } from "../content/site_copy";
import { bookPath, homePath, mainContentId } from "../lib/paths";
import { buildMeta } from "../lib/seo";
import { includeDrafts, showFullSite } from "../lib/visibility";
import "../styles/reading.css";

export function meta() {
  return buildMeta({
    path: homePath,
    title: siteCopy.name,
    description: siteCopy.description,
  });
}

export default function Home() {
  if (!showFullSite) return <ComingSoon />;

  const shownBooks = visibleBooks(includeDrafts);
  return (
    <main className="page" id={mainContentId} tabIndex={-1}>
      <h1 className="page_title">{siteCopy.booksTitle}</h1>
      {shownBooks.length === 0 ? (
        <p className="page_note">{siteCopy.noBooks}</p>
      ) : (
        <ul className="book_list">
          {shownBooks.map((book) => (
            <li key={book.slug} className="book_list_item">
              <Link to={bookPath(book.slug)} className="book_list_title">
                {book.title}
              </Link>
              {book.draft && <span className="draft_badge">{siteCopy.draftBadge}</span>}
              <p className="book_list_summary">{book.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
