import { siteCopy } from "../content/site_copy";
import { homePath, mainContentId } from "../lib/paths";
import { buildMeta } from "../lib/seo";
import "../styles/reading.css";

export function meta() {
  return buildMeta({
    path: "/404",
    title: `404 — ${siteCopy.name}`,
    description: siteCopy.notFoundDescription,
    noindex: true,
  });
}

export default function NotFound() {
  return (
    <main className="page page_centered" id={mainContentId} tabIndex={-1}>
      <h1 className="page_title">{siteCopy.notFoundTitle}</h1>
      <a className="back_link" href={homePath}>
        <span aria-hidden="true">← </span>
        {siteCopy.homeLink}
      </a>
    </main>
  );
}
