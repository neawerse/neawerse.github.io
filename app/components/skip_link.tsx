import { siteCopy } from "../content/site_copy";
import { mainContentId } from "../lib/paths";

// First focusable element on every page: keyboard users jump past the header.
export function SkipLink() {
  return (
    <a className="skip_link" href={`#${mainContentId}`}>
      {siteCopy.skipLink}
    </a>
  );
}
