import { business } from "@/lib/site";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "../icons";

export function ContactCard() {
  return (
    <aside className="flex h-full flex-col gap-4">
      <a
        href={business.phoneHref}
        className="group relative overflow-hidden rounded-2xl bg-racing p-6 transition-transform active:scale-[0.99] sm:p-8"
      >
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-white/80">Prefer to talk?</p>
        <p className="display relative mt-3 flex items-center gap-3 text-4xl sm:text-5xl">
          <PhoneIcon className="h-8 w-8 shrink-0" />
          {business.phoneDisplay}
        </p>
        <p className="relative mt-3 text-sm text-white/85">Tap to call James directly — quickest way to book.</p>
      </a>

      <div className="flex-1 rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
        <ul className="space-y-6">
          <li className="flex gap-4">
            <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-racing" />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-widest text-silver">Email</p>
              <a href={`mailto:${business.email}`} className="mt-1 block break-all font-medium hover:text-racing">
                {business.email}
              </a>
            </div>
          </li>
          <li className="flex gap-4">
            <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-racing" />
            <div>
              <p className="text-xs uppercase tracking-widest text-silver">Coverage</p>
              <p className="mt-1 font-medium">{business.town} &amp; surrounding Teignbridge areas</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {business.serviceAreas.map((area) => (
                  <li key={area} className="rounded-full border border-white/10 bg-ink px-3 py-1 text-xs text-white/80">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="flex gap-4">
            <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-racing" />
            <div>
              <p className="text-xs uppercase tracking-widest text-silver">Response</p>
              <p className="mt-1 font-medium">Quick replies to calls, texts &amp; quote requests</p>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
