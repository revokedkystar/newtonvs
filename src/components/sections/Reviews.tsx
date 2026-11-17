import { business, reviews } from "@/lib/site";
import { FacebookIcon, QuoteMarkIcon, ThumbIcon } from "../icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="reviews-title"
            eyebrow="Customer Reviews"
            title={
              <>
                Trusted by drivers
                <br />
                <span className="text-racing">across Teignbridge.</span>
              </>
            }
          />

          <Reveal delay={0.1}>
            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-line bg-ink-2 p-4 pr-6 transition-colors hover:border-[#1877F2]/60"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#1877F2]">
                <FacebookIcon className="h-7 w-7" />
              </span>
              <span>
                <span className="display block text-2xl">100% Recommended</span>
                <span className="text-sm text-silver group-hover:text-white">
                  on Facebook &middot; based on 6 reviews &rarr;
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.08} className="h-full">
              <figure className="relative flex h-full flex-col rounded-xl border border-line bg-ink-2 p-6">
                <QuoteMarkIcon className="absolute right-5 top-5 h-8 w-8 text-white/5" />
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-racing/15 px-2.5 py-1 text-xs font-semibold text-racing">
                  <ThumbIcon className="h-3.5 w-3.5" />
                  Recommended
                </span>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-white/90">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  <span className="display grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-racing to-racing-hot text-sm not-italic">
                    {initials(review.name)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{review.name}</span>
                    <span className="flex items-center gap-1 text-xs text-silver">
                      <FacebookIcon className="h-3 w-3 text-[#1877F2]" />
                      Facebook &middot; {review.date}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
