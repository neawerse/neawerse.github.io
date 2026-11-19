import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

// fonts.css loads the type the tokens name, from the site itself — no
// Google Fonts request, so no visitor IP address goes to Google.
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";

import { showFullSite } from "./lib/visibility";
import { SiteHeader } from "./components/site_header";
import { Footer } from "./components/footer";
import { SkipLink } from "./components/skip_link";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SkipLink />
        {/* Before launch the live site is the single coming-soon card:
            no header, no footer (app/lib/site_config.ts). */}
        {showFullSite && <SiteHeader />}
        {children}
        {showFullSite && <Footer />}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
