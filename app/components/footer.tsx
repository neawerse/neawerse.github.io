import { siteCopy } from "../content/site_copy";

// The three sites link to each other; this one points to the author's own.
export function Footer() {
  return (
    <footer className="footer">
      <a href="https://saitkaplan.com/">{siteCopy.authorName}</a>
    </footer>
  );
}
