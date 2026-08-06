"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { leadSchema, type LeadFormData } from "@/features/leads/schema";
import { submitLead } from "@/features/leads/actions";
import { MARKET_LABELS, type Market } from "@/config/markets";
import { FormSelect } from "@/components/ui/FormSelect";
import {
  landingThankYouHref,
  type LandingDestination,
  type LandingPageId,
} from "@/config/landing-pages";
import { landingDestinationLabel } from "@/content/landing";
import { mergeUrlTracking } from "@/lib/utils/url-tracking";

const AGE_RANGES = ["18–45", "45+"];
const EDUCATION_LEVELS = ["12th", "Diploma", "Bachelor's", "Master's", "PhD"];
const WORK_EXPERIENCE = ["0–2 yrs", "3–5 yrs", "5+ yrs"];

interface LandingLeadFormProps {
  market: Market;
  pageId: LandingPageId;
  destination: LandingDestination;
  preferredOffices: Market[];
  submitLabel?: string;
}

export function LandingLeadForm({
  market,
  pageId,
  destination,
  preferredOffices,
  submitLabel = "Get My Free Assessment",
}: LandingLeadFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      preferredMarket: market,
      currentMarket: market,
      enquiryType: "consultation",
      destination: landingDestinationLabel(destination),
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
      sourceComponent: pageId,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      const formData = data as LeadFormData;
      setStatus("submitting");
      setErrorMsg("");

      try {
        // react-hook-form stores a checkbox's checked state as a boolean, but
        // leadSchema expects the string "on"; normalize before submitting.
        const rawConsent = data.consent;
        const consent = rawConsent === true || rawConsent === "on" ? "on" : "";
        // Pull utm_source / utm_medium / utm_campaign / gclid from the landing URL
        // and send them with the lead so every ad click is attributable.
        const result = await submitLead(
          mergeUrlTracking({
            ...formData,
            consent,
            sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
            currentMarket: market,
          }),
        );

        if (result.success) {
          router.push(landingThankYouHref(market, pageId));
        } else {
          setStatus("error");
          setErrorMsg(result.error || "Something went wrong. Please try again.");
        }
      } catch {
        setStatus("error");
        setErrorMsg("Network error. Please check your connection and try again.");
      }
    },
    [market, pageId, router],
  );

  const inputBase =
    "w-full rounded-xl border border-brand-600/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300 transition";
  const labelBase = "mb-1 block text-sm font-medium text-slate-700";
  const errorBase = "mt-1 text-xs text-red-600";

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="hp">Do not fill this</label>
        <input id="hp" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
        <div>
          <label htmlFor="phone" className={labelBase}>Phone (+971) *</label>
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

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="ageRange" className={labelBase}>Age Range</label>
          <FormSelect
            name="ageRange"
            control={control}
            id="ageRange"
            label="Age Range"
            placeholder="Select"
            options={AGE_RANGES.map((value) => ({ value, label: value }))}
            className="border border-brand-600/15 focus:border-brand-500"
          />
        </div>
        <div>
          <label htmlFor="education" className={labelBase}>Highest Qualification</label>
          <FormSelect
            name="education"
            control={control}
            id="education"
            label="Highest Qualification"
            placeholder="Select"
            options={EDUCATION_LEVELS.map((value) => ({ value, label: value }))}
            className="border border-brand-600/15 focus:border-brand-500"
          />
        </div>
        <div>
          <label htmlFor="workExperience" className={labelBase}>Work Experience</label>
          <FormSelect
            name="workExperience"
            control={control}
            id="workExperience"
            label="Work Experience"
            placeholder="Select"
            options={WORK_EXPERIENCE.map((value) => ({ value, label: value }))}
            className="border border-brand-600/15 focus:border-brand-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="preferredMarket" className={labelBase}>Preferred Office *</label>
        <FormSelect
          name="preferredMarket"
          control={control}
          id="preferredMarket"
          label="Preferred Office"
          placeholder="Select office"
          options={preferredOffices.map((key) => ({ value: key, label: MARKET_LABELS[key] }))}
          showPlaceholder={false}
          error={errors.preferredMarket?.message}
          className="border border-brand-600/15 focus:border-brand-500"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          value="on"
          className="mt-1 h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          {...register("consent")}
        />
        <label htmlFor="consent" className="text-sm text-slate-500">
          I agree to DMC contacting me about immigration services and I consent to my
          details being used to assess my eligibility. DMC does not share personal data
          with third parties for marketing.
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
        className="w-full rounded-xl bg-brand-600 px-6 py-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(53,142,26,.3)] transition hover:bg-brand-700 hover:shadow-[0_16px_40px_rgba(53,142,26,.38)] disabled:cursor-not-allowed disabled:opacity-60"
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
          submitLabel
        )}
      </button>
    </form>
  );
}
