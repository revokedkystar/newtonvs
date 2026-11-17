import type { InputHTMLAttributes, ReactNode } from "react";

export const inputClass =
  "block w-full rounded-lg border border-line bg-ink px-4 py-3.5 text-base text-white placeholder:text-white/30 transition-colors focus:border-racing focus:outline-none focus:ring-2 focus:ring-racing/30 aria-[invalid=true]:border-racing-hot";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}

/** Label + control + error message, wired together for screen readers. */
export function Field({ id, label, error, hint, optional, children, className = "" }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-white/90">
        {label}
        {optional && <span className="text-xs font-normal text-silver">Optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-racing-hot">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-silver">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Tidies a UK registration: upper-case, strips stray characters, formats current-style plates as "AB12 CDE". */
export function formatPlate(raw: string, finalise = false): string {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9 ]/g, "").replace(/\s+/g, " ").slice(0, 8);
  if (!finalise) return cleaned;
  const compact = cleaned.replace(/\s/g, "");
  return /^[A-Z]{2}\d{2}[A-Z]{3}$/.test(compact) ? `${compact.slice(0, 4)} ${compact.slice(4)}` : cleaned.trim();
}

type PlateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onValueChange: (value: string) => void;
};

/** Rear-style yellow UK number plate input with the blue UK identifier band. */
export function PlateInput({ value, onValueChange, ...props }: PlateInputProps) {
  return (
    <div className="flex h-[58px] overflow-hidden rounded-lg border-2 border-black/80 bg-plate shadow-[inset_0_0_0_2px_rgba(255,255,255,0.35)] focus-within:ring-2 focus-within:ring-racing focus-within:ring-offset-2 focus-within:ring-offset-ink-2">
      <span aria-hidden className="flex w-10 shrink-0 flex-col items-center justify-end bg-[#003399] pb-1.5 text-[11px] font-bold text-white">
        <span className="mb-auto mt-1.5 grid h-4 w-4 place-items-center text-[8px] text-[#FFCC00]">★</span>
        UK
      </span>
      <input
        {...props}
        value={value}
        onChange={(e) => onValueChange(formatPlate(e.target.value))}
        onBlur={(e) => onValueChange(formatPlate(e.target.value, true))}
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        maxLength={8}
        className="w-full bg-transparent px-3 text-center font-display text-[1.7rem] font-bold uppercase tracking-[0.06em] text-black placeholder:text-black/25 focus:outline-none"
      />
    </div>
  );
}
