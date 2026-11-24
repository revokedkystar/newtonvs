"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { business, exampleJobs, formatPrice, type ExampleJob } from "@/lib/site";
import { ClockIcon, MessengerIcon, serviceIcons } from "../icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

function JobCard({ job, index }: { job: ExampleJob; index: number }) {
  const Icon = serviceIcons[job.icon];
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-ink-2 transition-colors hover:border-white/25"
    >
      {/* Visual: photo when we have one, otherwise a graphic panel */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {job.image ? (
          <Image
            src={job.image.src}
            alt={`${job.vehicle}: ${job.service}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ink-3 via-ink-2 to-racing/40">
            <div className="bg-grid absolute inset-0 opacity-60" />
            <div className="absolute -bottom-6 -right-4 h-20 w-[70%] -skew-x-[24deg] bg-racing/70" />
            <Icon className="absolute left-6 top-1/2 h-16 w-16 -translate-y-1/2 text-white/90 transition-transform duration-500 group-hover:scale-110" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
        <span className="display absolute left-4 top-4 rounded bg-racing px-2 py-0.5 text-xs">{job.service}</span>
        <span className="display absolute bottom-3 right-4 text-4xl text-white/10">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="display text-lg">{job.vehicle}</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-semibold uppercase tracking-widest text-[11px] leading-5 text-racing">Issue</dt>
            <dd className="text-silver">{job.problem}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-semibold uppercase tracking-widest text-[11px] leading-5 text-emerald-400">Fix</dt>
            <dd className="text-white/90">{job.fix}</dd>
          </div>
        </dl>
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-5 text-sm">
          <span className="flex items-center gap-2 text-silver">
            <ClockIcon className="h-4 w-4 text-racing" />
            {job.time}
          </span>
          {job.priceFrom === null ? (
            <span className="text-silver">Quoted per job</span>
          ) : (
            <span className="text-silver">
              From <span className="display text-xl text-white">{formatPrice(job.priceFrom)}</span>
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ExampleJobs() {
  return (
    <section id="examples" aria-labelledby="examples-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="examples-title"
            eyebrow="Example Jobs"
            title={
              <>
                What a visit
                <br />
                <span className="text-racing">looks like.</span>
              </>
            }
            intro="Typical jobs James handles on driveways and in work car parks every week: the problem, the fix, roughly how long it takes and where the price starts."
          />
          <Reveal delay={0.1}>
            <a
              href={business.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wide [font-stretch:112.5%] text-white transition-colors hover:text-racing"
            >
              <MessengerIcon className="h-4 w-4" />
              Got a similar problem? Message us
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {exampleJobs.map((job, i) => (
            <JobCard key={job.service + job.vehicle} job={job} index={i} />
          ))}
        </div>

        <p className="mt-6 text-xs text-silver/80">
          Examples are illustrative. Times and prices vary by vehicle and parts required.
        </p>
      </div>
    </section>
  );
}
