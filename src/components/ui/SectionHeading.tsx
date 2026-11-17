import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
}

export function SectionHeading({ eyebrow, title, intro, align = "left", id }: SectionHeadingProps) {
  const centred = align === "center";
  return (
    <Reveal className={centred ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display mt-4 text-[1.75rem] sm:text-4xl lg:text-[2.9rem]">
        {title}
      </h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-silver sm:text-lg">{intro}</p>}
    </Reveal>
  );
}
