import type { ReactNode } from "react";

/** Endless horizontal ticker. Content is duplicated so the loop is seamless. */
export function Marquee({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="display whitespace-nowrap px-6 text-lg sm:text-2xl">{item}</span>
          <span className="h-2 w-6 -skew-x-[24deg] bg-racing" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
