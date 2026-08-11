"use client";

import { useState } from "react";

import type { Market } from "@/config/markets";
import { marketHref } from "@/lib/routing/routes";

type Destination = "canada" | "australia" | "uk" | "study" | "visit" | "business";

interface Answer {
  destination: Destination | null;
  ageGroup: string | null;
  education: string | null;
  english: string | null;
}

const DESTINATIONS: { value: Destination; label: string; blurb: string }[] = [
  { value: "canada", label: "Canada PR", blurb: "Express Entry, PNP and study-to-PR routes." },
  { value: "australia", label: "Australia PR", blurb: "Points-tested 189/190/491 and employer routes." },
  { value: "uk", label: "United Kingdom", blurb: "Skilled Worker and dependent routes." },
  { value: "study", label: "Study abroad", blurb: "Canada, Australia, UK and USA student visas." },
  { value: "visit", label: "Visit visa", blurb: "Tourist and family visit routes worldwide." },
  { value: "business", label: "Business & investment", blurb: "Golden visa, residency-by-investment and citizenship." },
];

const AGE_GROUPS = ["Under 25", "25–34", "35–44", "45+"];
const EDUCATION_LEVELS = ["High school or below", "Diploma / bachelor's", "Master's or higher", "Trade / vocational"];
const ENGLISH_LEVELS = ["Fluent / native", "IELTS 6+ (CLB 7+)", "Basic", "Not yet tested"];

const RESULT_BY_DESTINATION: Record<
  Destination,
  { heading: string; body: string; route: string; routeLabel: string; action: string }
> = {
  canada: {
    heading: "Canada PR looks like a realistic route to explore",
    body: "Your profile is the kind that typically moves through Express Entry or a provincial nomination. The next step is a CRS estimate and a document review — both free at DMC.",
    route: "/tools/canada/crs-calculator",
    routeLabel: "Estimate your CRS score",
    action: "Book a free Canada assessment",
  },
  australia: {
    heading: "Australia skilled migration could be a strong fit",
    body: "Your age, English and education profile is worth scoring against the points test. An occupation check and points estimate will confirm how competitive you are.",
    route: "/tools/australia/points-calculator",
    routeLabel: "Calculate your points",
    action: "Book a free Australia assessment",
  },
  uk: {
    heading: "The UK Skilled Worker route is worth a closer look",
    body: "UK sponsorship depends on your occupation and a qualifying employer offer. DMC can review your occupation code and the offer requirements with you.",
    route: "/visas/uk/skilled-worker",
    routeLabel: "Read the UK Skilled Worker guide",
    action: "Book a free UK assessment",
  },
  study: {
    heading: "A study pathway could open the door to PR",
    body: "Study permits are one of the most common first steps toward permanent residence — especially in Canada and Australia. A study-plan review is the natural next step.",
    route: "/study-abroad/canada-student-visas",
    routeLabel: "Explore student visas",
    action: "Book a free study assessment",
  },
  visit: {
    heading: "A visit visa is the most common starting point",
    body: "Most visit-visa applications succeed when the documents are complete and consistent. DMC can review your travel history and evidence before you apply.",
    route: "/visit-visas",
    routeLabel: "Browse visit-visa destinations",
    action: "Book a free visit-visa review",
  },
  business: {
    heading: "Business and investment routes fit your profile",
    body: "Golden visas, residency-by-investment and citizenship programs each have their own thresholds. A short eligibility conversation will map the realistic options.",
    route: "/business-investment/residency",
    routeLabel: "Explore residency by investment",
    action: "Book a free business assessment",
  },
};

export function EligibilityChecker({ market }: { market: Market }) {
  const [answers, setAnswers] = useState<Answer>({
    destination: null,
    ageGroup: null,
    education: null,
    english: null,
  });
  const [step, setStep] = useState(0);

  const steps = [
    { key: "destination", title: "What are you aiming for?", options: DESTINATIONS.map((d) => d.label) },
    { key: "ageGroup", title: "How old are you?", options: AGE_GROUPS },
    { key: "education", title: "What is your highest qualification?", options: EDUCATION_LEVELS },
    { key: "english", title: "How would you rate your English?", options: ENGLISH_LEVELS },
  ] as const;

  const setAnswer = (key: keyof Answer, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const complete = answers.destination !== null && answers.ageGroup !== null && answers.education !== null && answers.english !== null;
  const result = answers.destination ? RESULT_BY_DESTINATION[answers.destination] : null;

  if (complete && result) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Your result</span>
        <h3 className="mt-2 font-display text-2xl font-bold text-ink">{result.heading}</h3>
        <p className="mt-3 leading-relaxed text-slate-600">{result.body}</p>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <strong className="text-ink">Your answers:</strong> {answers.ageGroup} · {answers.education} ·{" "}
          {answers.english} English
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={marketHref(market, "/contact")}
            className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            {result.action}
          </a>
          <a
            href={marketHref(market, result.route)}
            className="rounded-xl border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            {result.routeLabel}
          </a>
          <button
            onClick={() => {
              setAnswers({ destination: null, ageGroup: null, education: null, english: null });
              setStep(0);
            }}
            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Start over
          </button>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          This quick check is a general orientation only — it is not an eligibility assessment and does not
          guarantee any outcome. A DMC consultant can review your full profile in a free consultation.
        </p>
      </div>
    );
  }

  const current = steps[Math.min(step, steps.length - 1)];
  const currentOptions =
    current.key === "destination" ? DESTINATIONS.map((d) => d.label) : current.options;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
          Step {step + 1} of {steps.length}
        </span>
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full transition ${i <= step ? "bg-brand-600" : "bg-slate-200"}`}
            />
          ))}
        </div>
      </div>

      <h3 className="font-display text-xl font-bold text-ink">{current.title}</h3>
      <p className="mt-1 text-sm text-slate-500">
        {current.key === "destination" ? "Pick the broad outcome you are working toward." : "This helps us point you to the right route."}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {currentOptions.map((option) => {
          const activeValue = answers[current.key];
          return (
            <button
              key={option}
              onClick={() => setAnswer(current.key, option)}
              className={`rounded-xl border p-4 text-left transition ${
                activeValue === option
                  ? "border-brand-600 bg-brand-50"
                  : "border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/40"
              }`}
            >
              <span className="block text-sm font-bold text-ink">{option}</span>
              {current.key === "destination" ? (
                <span className="mt-0.5 block text-xs text-slate-500">
                  {DESTINATIONS.find((d) => d.label === option)?.blurb}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {step > 0 ? (
        <button
          onClick={() => setStep((prev) => prev - 1)}
          className="mt-6 text-sm font-semibold text-slate-500 transition hover:text-brand-700"
        >
          ← Back
        </button>
      ) : null}
    </div>
  );
}
