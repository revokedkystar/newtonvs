import { business } from "@/lib/site";

interface BrandMarkProps {
  size?: "sm" | "md";
  className?: string;
}

/**
 * Text lockup that mirrors the logo: chrome-white extended italic "NEWTON",
 * a slanted red "VEHICLE SOLUTIONS" bar, and tracked "MOBILE MECHANIC".
 */
export function BrandMark({ size = "sm", className = "" }: BrandMarkProps) {
  const md = size === "md";
  return (
    <span className={`inline-flex flex-col items-stretch leading-none ${className}`}>
      <span
        className={`display bg-gradient-to-b from-white via-white to-[#b5b5b5] bg-clip-text pr-1 text-transparent ${
          md ? "text-[2rem]" : "text-[1.35rem] sm:text-[1.55rem]"
        }`}
      >
        Newton
      </span>
      <span
        className={`brand-caps mt-0.5 -skew-x-12 bg-racing text-center font-extrabold text-ink ${
          md ? "px-1.5 py-[3px] text-[0.62rem] tracking-[0.06em]" : "px-1 py-[2px] text-[0.47rem] tracking-[0.05em] sm:text-[0.53rem]"
        }`}
      >
        Vehicle Solutions
      </span>
      <span
        className={`brand-caps mt-1 text-center font-medium text-white/80 ${
          md ? "text-[0.55rem] tracking-[0.42em]" : "text-[0.42rem] tracking-[0.38em] sm:text-[0.46rem]"
        }`}
      >
        {business.tagline}
      </span>
    </span>
  );
}
