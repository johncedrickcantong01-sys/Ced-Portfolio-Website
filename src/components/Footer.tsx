import { email, linkedin, nav } from "../content/site";

const link =
  "focus-ring inline-flex min-h-8 items-center self-start text-dim underline decoration-dim/40 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper md:self-auto";

// The name, the email and LinkedIn. Same left edge as the header.
export default function Footer() {
  return (
    <footer className="px-6 pt-16 pb-10 font-text text-small md:px-13 md:pt-24">
      <div className="flex flex-col gap-y-1 border-t border-rule pt-6 md:flex-row md:items-center md:gap-x-10">
        <p translate="no" className="font-medium text-paper">
          {nav.name}
        </p>
        <a translate="no" href={`mailto:${email}`} className={link}>
          {email}
        </a>
        <a href={linkedin} target="_blank" rel="noopener" className={link}>
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
