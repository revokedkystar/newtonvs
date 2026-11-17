import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-racing text-white shadow-[0_10px_30px_-10px_rgba(220,38,38,0.7)] hover:bg-racing-hot hover:shadow-[0_14px_36px_-10px_rgba(225,29,72,0.8)]",
  outline:
    "border border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/50 hover:bg-white/10",
  ghost: "text-white hover:text-racing",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

/** Anchor styled as a button (every CTA on this site is a link: tel:, mailto: or #section). */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`group inline-flex select-none items-center justify-center gap-2 rounded-md font-semibold uppercase tracking-wide transition-all duration-200 active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
