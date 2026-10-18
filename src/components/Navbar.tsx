import { Link } from "react-router";
import { bookCall, nav } from "../content/site";

// Sticky header. Below 768 px the three links take a second row, so the name
// and Book a call stay visible without a menu.
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bay font-text text-paper">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 px-5 py-2 md:px-12">
        <Link to="/" className="focus-ring font-title text-lead">
          {nav.name}
        </Link>
        <nav className="order-last w-full md:order-none md:ml-auto md:w-auto">
          <ul className="flex gap-6 md:gap-8">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="focus-ring inline-flex min-h-8 items-center text-small underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          to={bookCall.href}
          className="focus-ring inline-flex min-h-11 items-center rounded-sm bg-caption px-4 text-small font-semibold text-bay transition-colors hover:bg-paper"
        >
          {bookCall.label}
        </Link>
      </div>
    </header>
  );
}
