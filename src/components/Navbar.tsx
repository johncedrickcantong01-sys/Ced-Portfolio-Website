import { Link } from "react-router";
import { bookCall, nav } from "../content/site";

// Sticky header, var(--header-h) tall so the hero frame can fill the rest of
// the screen. Its left edge lines up with the text inside the frame. Below
// 768 px the three links take a second row, so the name and Book a call stay
// visible without a menu.
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-(--header-h) bg-bay font-text text-paper">
      <div className="flex h-full flex-wrap content-center items-center justify-between gap-x-6 gap-y-1 px-6 md:flex-nowrap md:px-13">
        <Link
          to="/"
          translate="no"
          className="focus-ring inline-flex min-h-8 items-center text-body font-medium tracking-[-0.01em] decoration-paper/40 underline-offset-4 hover:underline"
        >
          {nav.name}
        </Link>
        <nav aria-label="Main" className="order-last w-full md:order-none md:ml-auto md:w-auto">
          <ul className="flex gap-6">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="focus-ring inline-flex min-h-8 items-center text-small text-dim transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          to={bookCall.href}
          className="focus-ring inline-flex min-h-11 items-center rounded-md bg-caption px-4 text-small font-medium text-bay transition-colors hover:bg-paper pointer-fine:min-h-9"
        >
          {bookCall.label}
        </Link>
      </div>
    </header>
  );
}
