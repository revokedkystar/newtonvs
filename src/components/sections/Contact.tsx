import { business } from "@/lib/site";
import { ArrowRightIcon, ClockIcon, MessengerIcon, PhoneIcon, PinIcon } from "../icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const tips = [
  "Your car's make, model and year (or the registration)",
  "What's happening: the noise, warning light or job you need",
  "Where the car is and when suits you",
];

/** Contact: Facebook Messenger first, phone as the secondary option. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-white/5 bg-ink-2/50 py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[#0084FF]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-racing/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
            id="contact-title"
            eyebrow="Book / Quote"
            title={
              <>
                Get your free quote
                <br />
                <span className="text-racing">in minutes.</span>
              </>
            }
            intro="The quickest way to reach James is a message on Facebook Messenger. Prefer to talk? Give him a call."
          />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          {/* Primary: Messenger */}
          <Reveal className="h-full">
            <a
              href={business.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#0084FF] via-[#5B4BFF] to-[#A033FF] p-6 sm:p-10"
            >
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <MessengerIcon className="absolute -bottom-10 -right-10 h-56 w-56 text-white/10 transition-transform duration-700 group-hover:-rotate-12 sm:h-72 sm:w-72" />

              <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Recommended · Fastest reply
              </span>
              <p className="display relative mt-6 text-3xl sm:text-5xl">Message us on Messenger</p>
              <p className="relative mt-4 max-w-md text-white/85">
                Send a message to the {business.name} Facebook page and James will reply with a price and a time
                that suits. Photos and videos of the problem help too.
              </p>

              <ul className="relative mt-6 space-y-2 text-sm text-white/90">
                {tips.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-3 shrink-0 -skew-x-[24deg] bg-white/80" />
                    {t}
                  </li>
                ))}
              </ul>

              <span className="relative mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-white px-7 font-display font-bold uppercase tracking-wide [font-stretch:112.5%] text-[#0060c0] shadow-xl transition-transform group-hover:scale-[1.02] group-active:scale-[0.98] sm:w-fit">
                <MessengerIcon className="h-5 w-5" />
                Open Messenger
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="flex h-full flex-col gap-5">
            {/* Secondary: phone */}
            <a
              href={business.phoneHref}
              className="group relative block overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 transition-colors hover:border-racing/60 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-silver">Or give James a call</p>
              <p className="display mt-3 flex items-center gap-3 text-3xl sm:text-4xl">
                <PhoneIcon className="h-7 w-7 shrink-0 text-racing" />
                {business.phoneDisplay}
              </p>
              <p className="mt-2 text-sm text-silver group-hover:text-white">Tap to call · texts welcome too</p>
            </a>

            <div className="flex-1 rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
              <ul className="space-y-6">
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
                    <p className="mt-1 font-medium">Quick replies on Messenger and by phone</p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
