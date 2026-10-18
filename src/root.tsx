import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { ReactNode } from "react";
import type { Route } from "./+types/root";
import "@fontsource/imbue/latin-400.css";
import "@fontsource/schibsted-grotesk/latin-400.css";
import "@fontsource/schibsted-grotesk/latin-600.css";
import imbueWoff2 from "@fontsource/imbue/files/imbue-latin-400-normal.woff2?url";
import "./index.css";

// The display face sets the hero headline, so it loads first.
export const links: Route.LinksFunction = () => [
  { rel: "preload", href: imbueWoff2, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ced Cantong | Video Editor</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
