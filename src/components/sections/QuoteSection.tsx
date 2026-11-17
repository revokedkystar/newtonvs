import { ContactCard } from "../quote/ContactCard";
import { QuoteForm } from "../quote/QuoteForm";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function QuoteSection() {
  return (
    <section id="quote" aria-labelledby="quote-title" className="relative overflow-hidden border-t border-white/5 bg-ink-2/50 py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-racing/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="quote-title"
          eyebrow="Book / Quote"
          title={
            <>
              Get your free quote
              <br />
              <span className="text-racing">in minutes.</span>
            </>
          }
          intro="Tell us what's going on and where the vehicle is. James will come back to you with a clear price and a time that suits — at home or at work."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <QuoteForm />
          </Reveal>
          <Reveal delay={0.1}>
            <ContactCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
