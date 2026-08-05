"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, type LeadFormData } from "@/features/leads/schema";
import { submitLead } from "@/features/leads/actions";
import { MARKET_LABELS, type Market } from "@/config/markets";

const DESTINATIONS = [
  "Canada Express Entry",
  "Canada PNP",
  "Canada Study Permit",
  "Canada Family Sponsorship",
  "Australia Skilled Independent (189)",
  "Australia Skilled Nominated (190)",
  "Australia Skilled Work Regional (491)",
  "Australia Employer Sponsored (482)",
  "UK Skilled Worker Visa",
  "Visit Visa",
  "Business / Investment Immigration",
  "Resume Marketing",
  "Other / Not Sure",
];

const AGE_RANGES = ["18-24", "25-34", "35-44", "45-54", "55+"];
const EDUCATION_LEVELS = [
  "High School",
  "Diploma / Certificate",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Other",
];

interface LeadFormProps {
  market: Market;
  phone?: string;
  kicker?: string;
  title?: string;
  copy?: string[];
  sourceComponent?: string;
  variant?: "inline" | "sidebar" | "dialog";
  onSuccess?: () => void;
}

export function LeadForm({
  market,
  phone,
  kicker,
  title,
  copy,
  sourceComponent = "lead-form",
  variant = "inline",
  onSuccess,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      preferredMarket: market,
      currentMarket: market,
      enquiryType: "consultation",
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
      sourceComponent,
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  const onSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      const formData = data as LeadFormData;
      setStatus("submitting");
      setErrorMsg("");

      try {
        const result = await submitLead({
          ...formData,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
          currentMarket: market,
        });

        if (result.success) {
          setStatus("success");
          reset();
          onSuccess?.();
        } else {
          setStatus("error");
          setErrorMsg(result.error || "Something went wrong. Please try again.");
        }
      } catch {
        setStatus("error");
        setErrorMsg("Network error. Please check your connection and try again.");
      }
    },
    [market, reset, onSuccess],
  );

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-brand-50 p-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-3xl text-white">
          ✓
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold text-ink">Thank you!</h3>
        <p className="mb-4 text-slate-600">
          Your enquiry has been received. Our {MARKET_LABELS[market]} team will review your details and get back to
          you shortly.
        </p>
        {phone && (
          <p className="text-sm text-slate-500">
            Prefer to call?{" "}
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold text-brand-600 hover:underline">
              {phone}
            </a>
          </p>
        )}
      </div>
    );
  }

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300 transition";
  const labelBase = "mb-1 block text-sm font-medium text-slate-700";
  const errorBase = "mt-1 text-xs text-red-600";

  return (
    <div className={variant === "sidebar" ? "" : "rounded-2xl border border-slate-200 bg-white p-6 md:p-8"}>
      {kicker && <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-600">{kicker}</span>}
      {title && (
        <h3 className="mb-2 font-display text-2xl font-bold text-ink">{title}</h3>
      )}
      {copy && copy.length > 0 && (
        <div className="mb-6 space-y-2 text-sm text-slate-600">
          {copy.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Honeypot */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="hp">Do not fill this</label>
          <input id="hp" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
        </div>

        <div>
          <label htmlFor="fullName" className={labelBase}>Full Name *</label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Ahmed Al-Rashid"
            className={inputBase}
            {...register("fullName")}
          />
          {errors.fullName && <p className={errorBase}>{errors.fullName.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelBase}>Email *</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={inputBase}
              {...register("email")}
            />
            {errors.email && <p className={errorBase}>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={labelBase}>Phone *</label>
            <input
              id="phone"
              type="tel"
              placeholder="+971 50 123 4567"
              className={inputBase}
              {...register("phone")}
            />
            {errors.phone && <p className={errorBase}>{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="destination" className={labelBase}>Destination / Program of Interest *</label>
          <select id="destination" className={inputBase} {...register("destination")}>
            <option value="">Select a program or destination</option>
            {DESTINATIONS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.destination && <p className={errorBase}>{errors.destination.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ageRange" className={labelBase}>Age Range</label>
            <select id="ageRange" className={inputBase} {...register("ageRange")}>
              <option value="">Select age range</option>
              {AGE_RANGES.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="education" className={labelBase}>Highest Education</label>
            <select id="education" className={inputBase} {...register("education")}>
              <option value="">Select education level</option>
              {EDUCATION_LEVELS.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="preferredMarket" className={labelBase}>Preferred DMC Office *</label>
          <select id="preferredMarket" className={inputBase} {...register("preferredMarket")}>
            {(Object.entries(MARKET_LABELS) as [Market, string][]).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          {errors.preferredMarket && <p className={errorBase}>{errors.preferredMarket.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className={labelBase}>Message (optional)</label>
          <textarea
            id="message"
            rows={3}
            placeholder="Tell us about your immigration goals or questions..."
            className={inputBase}
            {...register("message")}
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            {...register("consent")}
          />
          <label htmlFor="consent" className="text-xs text-slate-500">
            I agree to the{" "}
            <a href="/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-600">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/legal/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-600">
              Terms & Conditions
            </a>
            . I consent to DMC contacting me about immigration services.
          </label>
        </div>
        {errors.consent && <p className={errorBase}>{errors.consent.message}</p>}

        {status === "error" && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert" aria-live="assertive">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Enquiry"
          )}
        </button>

        {phone && (
          <p className="text-center text-xs text-slate-500">
            Or call us directly at{" "}
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold text-brand-600 hover:underline">
              {phone}
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
