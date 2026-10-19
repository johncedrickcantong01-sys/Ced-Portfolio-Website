import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { ReactNode } from "react";
import type { Route } from "./+types/root";
import "@fontsource-variable/geist/wght.css";
import geistWoff2 from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
import "./index.css";

// Geist sets every word on the page; its latin file (one variable font for
// all weights) loads first.
export const links: Route.LinksFunction = () => [
  { rel: "preload", href: geistWoff2, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0E0F11" />
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
