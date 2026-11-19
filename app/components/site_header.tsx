import { siteCopy } from "../content/site_copy";
import { homePath } from "../lib/paths";

export function SiteHeader() {
  return (
    <header className="site_header">
      <a className="site_header_mark" href={homePath}>
        {siteCopy.name}
      </a>
    </header>
  );
}
