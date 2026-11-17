import Image from "next/image";
import { business, navLinks } from "@/lib/site";
import { FacebookIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-ink pb-28 pt-16 lg:pb-10">
      <div className="speed-stripe absolute inset-x-0 top-0 h-px" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={56} height={56} className="h-14 w-14" />
            <div>
              <p className="display text-2xl">
                Newton <span className="text-racing">Vehicle Solutions</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.35em] text-silver">{business.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver">
            Diagnostics, repairs, servicing, brakes, suspension and remaps — brought to your door by{" "}
            {business.owner}, with over {business.yearsExperience} years&apos; experience.
          </p>
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2.5 text-sm font-medium transition-colors hover:border-[#1877F2] hover:text-white"
          >
            <FacebookIcon className="h-4 w-4 text-[#1877F2]" />
            Find us on Facebook
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="display text-lg not-italic text-white">Explore</p>
          <ul className="mt-4 space-y-3 text-sm text-silver">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="display text-lg not-italic text-white">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-silver">
            <li>
              <a href={business.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white">
                <PhoneIcon className="h-4 w-4 text-racing" />
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-white">
                <MailIcon className="h-4 w-4 shrink-0 text-racing" />
                {business.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <PinIcon className="h-4 w-4 text-racing" />
              {business.town}, {business.county}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-white/5 px-4 pt-6 text-xs text-silver/70 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>&copy; {year} {business.name}. All rights reserved.</p>
        <p>Mobile mechanic serving {business.town} &amp; Teignbridge, Devon.</p>
      </div>
    </footer>
  );
}
