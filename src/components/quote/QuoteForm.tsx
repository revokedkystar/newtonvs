"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { business, formEndpoint, otherServiceOption, services } from "@/lib/site";
import { useQuote } from "../QuoteContext";
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "../icons";
import { Field, inputClass, PlateInput } from "./fields";

interface FormValues {
  name: string;
  phone: string;
  postcode: string;
  registration: string;
  message: string;
}

type Errors = Partial<Record<keyof FormValues | "service", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = { name: "", phone: "", postcode: "", registration: "", message: "" };

const UK_PHONE = /^(?:\+44\s?|0)(?:\d\s?){9,10}$/;

function validate(values: FormValues, service: string): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!UK_PHONE.test(values.phone.replace(/[()-]/g, "").trim()))
    errors.phone = "Please enter a valid UK phone number, e.g. 07700 900123.";
  if (values.postcode.trim().length < 2) errors.postcode = "Let us know roughly where the vehicle is.";
  if (!service) errors.service = "Please choose a service.";
  if (values.message.trim().length < 5) errors.message = "Please tell us a little about the job or the issue.";
  return errors;
}

export function QuoteForm() {
  const { selectedService, setSelectedService } = useQuote();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(values, selectedService);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      (form.querySelector(`[name="${firstError}"]`) as HTMLElement | null)?.focus();
      return;
    }

    // Honeypot: bots fill hidden fields, people don't.
    if ((form.elements.namedItem("_honey") as HTMLInputElement | null)?.value) return;

    setStatus("submitting");
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: values.name.trim(),
          Phone: values.phone.trim(),
          "Postcode / Location": values.postcode.trim().toUpperCase(),
          "Vehicle Registration": values.registration.trim() || "Not provided",
          "Service Required": selectedService,
          Message: values.message.trim(),
          _subject: `New quote request: ${selectedService} — ${values.postcode.trim().toUpperCase()}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data: { success?: string | boolean } = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) === "false") throw new Error("Submission failed");
      setStatus("success");
      setValues(initialValues);
      setSelectedService("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative rounded-2xl border border-line bg-ink-2 p-5 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-racing">
              <CheckIcon className="h-8 w-8" />
            </span>
            <h3 className="display mt-6 text-4xl">Thanks — request sent!</h3>
            <p className="mt-3 max-w-sm text-silver">
              James will get back to you shortly with a quote. Need help sooner? Give him a ring.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-racing px-6 font-semibold uppercase tracking-wide hover:bg-racing-hot"
              >
                <PhoneIcon className="h-4 w-4" />
                {business.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 px-6 font-semibold uppercase tracking-wide hover:border-white/50"
              >
                Send another
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="grid gap-5 sm:grid-cols-2"
            aria-describedby="quote-form-note"
          >
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <Field id="quote-name" label="Full Name" error={errors.name}>
              <input
                id="quote-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Sarah Jones"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "quote-name-error" : undefined}
                className={inputClass}
              />
            </Field>

            <Field id="quote-phone" label="Phone Number" error={errors.phone}>
              <input
                id="quote-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="07700 900123"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "quote-phone-error" : undefined}
                className={inputClass}
              />
            </Field>

            <Field id="quote-postcode" label="Postcode / Location" error={errors.postcode} hint="Where is the vehicle? e.g. TQ12 or Kingsteignton">
              <input
                id="quote-postcode"
                name="postcode"
                type="text"
                autoComplete="postal-code"
                placeholder="TQ12"
                value={values.postcode}
                onChange={(e) => set("postcode", e.target.value)}
                aria-invalid={!!errors.postcode}
                aria-describedby={errors.postcode ? "quote-postcode-error" : "quote-postcode-hint"}
                className={`${inputClass} uppercase placeholder:normal-case`}
              />
            </Field>

            <Field id="quote-reg" label="Vehicle Registration" optional hint="Helps James check parts before he arrives.">
              <PlateInput
                id="quote-reg"
                name="registration"
                placeholder="AB12 CDE"
                value={values.registration}
                onValueChange={(v) => set("registration", v)}
                aria-describedby="quote-reg-hint"
              />
            </Field>

            <Field id="quote-service" label="Service Required" error={errors.service} className="sm:col-span-2">
              <div className="relative">
                <select
                  id="quote-service"
                  name="service"
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    if (errors.service) setErrors((er) => ({ ...er, service: undefined }));
                  }}
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? "quote-service-error" : undefined}
                  className={`${inputClass} appearance-none pr-12 [&>option]:bg-ink-2 ${selectedService ? "" : "text-white/40"}`}
                >
                  <option value="" disabled>
                    Choose a service…
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.name} className="text-white">
                      {s.name}
                      {s.priceFrom !== null ? ` — from £${s.priceFrom}` : " — custom quote"}
                    </option>
                  ))}
                  <option value={otherServiceOption} className="text-white">
                    {otherServiceOption}
                  </option>
                </select>
                <ArrowRightIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-silver" />
              </div>
            </Field>

            <Field id="quote-message" label="Message / Issue Description" error={errors.message} className="sm:col-span-2">
              <textarea
                id="quote-message"
                name="message"
                rows={4}
                placeholder="Make & model, what's happening, and when suits you best — e.g. “2017 Ford Focus, grinding noise when braking. Free most weekday mornings.”"
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "quote-message-error" : undefined}
                className={`${inputClass} resize-y`}
              />
            </Field>

            <div className="sm:col-span-2">
              {status === "error" && (
                <p role="alert" className="mb-4 rounded-lg border border-racing/40 bg-racing/10 px-4 py-3 text-sm">
                  Sorry, something went wrong sending your request. Please try again or call James directly on{" "}
                  <a href={business.phoneHref} className="font-semibold underline">
                    {business.phoneDisplay}
                  </a>
                  .
                </p>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-racing px-7 font-semibold uppercase tracking-wide shadow-[0_10px_30px_-10px_rgba(220,38,38,0.7)] transition-all hover:bg-racing-hot active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending…
                  </>
                ) : (
                  <>
                    Get My Free Quote
                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <p id="quote-form-note" className="mt-3 text-center text-xs text-silver">
                No obligation. Your details are only used to reply to your enquiry.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
