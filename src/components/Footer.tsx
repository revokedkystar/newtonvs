import Image from "next/image";
import { business, navLinks } from "@/lib/site";
import { FacebookIcon, MessengerIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-ink pb-28 pt-16 lg:pb-10">
      <div className="speed-stripe absolute inset-x-0 top-0 h-px" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/images/logo-full.png"
            alt={`${business.name} — ${business.tagline}`}
            width={863}
            height={504}
            className="h-auto w-56 sm:w-64"
          />
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
          <p className="brand-caps text-sm tracking-[0.2em] text-white">Explore</p>
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
          <p className="brand-caps text-sm tracking-[0.2em] text-white">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-silver">
            <li>
              <a href={business.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white">
                <PhoneIcon className="h-4 w-4 text-racing" />
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={business.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <MessengerIcon className="h-4 w-4 shrink-0 text-[#0084FF]" />
                Messenger
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
