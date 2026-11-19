import { siteCopy } from "../content/site_copy";
import { mainContentId } from "../lib/paths";
import "../styles/coming_soon.css";

// The pre-launch page, carried over unchanged in look from the original
// index.html: the wordmark, the printer's asterism and one quiet line.
export function ComingSoon() {
  return (
    <main className="coming_soon" id={mainContentId} tabIndex={-1}>
      <div className="coming_soon_inner">
        <h1 className="wordmark">{siteCopy.name}</h1>
        <div className="asterism" aria-hidden="true">
          ⁂
        </div>
        <p className="status">{siteCopy.comingSoon}</p>
      </div>
    </main>
  );
}
