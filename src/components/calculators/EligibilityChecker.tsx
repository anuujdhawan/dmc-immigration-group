"use client";

import {
  ArrowRight,
  Building2,
  Check,
  GraduationCap,
  Landmark,
  Leaf,
  Plane,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import type { Market } from "@/config/markets";
import { marketHref } from "@/lib/routing/routes";
import { ToolBadge, ToolButton, ToolNote } from "@/components/calculators/tool-kit";

type Destination = "canada" | "australia" | "uk" | "study" | "visit" | "business";

interface Answer {
  destination: Destination | null;
  ageGroup: string | null;
  education: string | null;
  english: string | null;
}

const DESTINATIONS: { value: Destination; label: string; blurb: string; icon: typeof Leaf }[] = [
  { value: "canada", label: "Canada PR", blurb: "Express Entry, PNP and study-to-PR routes.", icon: Leaf },
  { value: "australia", label: "Australia PR", blurb: "Points-tested 189/190/491 and employer routes.", icon: Plane },
  { value: "uk", label: "United Kingdom", blurb: "Skilled Worker and dependent routes.", icon: Landmark },
  { value: "study", label: "Study abroad", blurb: "Canada, Australia, UK and USA student visas.", icon: GraduationCap },
  { value: "visit", label: "Visit visa", blurb: "Tourist and family visit routes worldwide.", icon: Plane },
  { value: "business", label: "Business & investment", blurb: "Golden visa, residency-by-investment and citizenship.", icon: Building2 },
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

const STEPS = [
  { key: "destination", title: "What are you aiming for?", sub: "Pick the broad outcome you are working toward.", options: DESTINATIONS.map((d) => d.label) },
  { key: "ageGroup", title: "How old are you?", sub: "This helps us point you to the right route.", options: AGE_GROUPS },
  { key: "education", title: "What is your highest qualification?", sub: "This helps us point you to the right route.", options: EDUCATION_LEVELS },
  { key: "english", title: "How would you rate your English?", sub: "Language ability shapes most skilled routes.", options: ENGLISH_LEVELS },
] as const;

export function EligibilityChecker({ market }: { market: Market }) {
  const [answers, setAnswers] = useState<Answer>({
    destination: null,
    ageGroup: null,
    education: null,
    english: null,
  });
  const [step, setStep] = useState(0);

  const setAnswer = (key: keyof Answer, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const restart = () => {
    setAnswers({ destination: null, ageGroup: null, education: null, english: null });
    setStep(0);
  };

  const complete = answers.destination !== null && answers.ageGroup !== null && answers.education !== null && answers.english !== null;
  const result = answers.destination ? RESULT_BY_DESTINATION[answers.destination] : null;

  if (complete && result) {
    const destination = DESTINATIONS.find((d) => d.value === answers.destination);
    const DestinationIcon = destination?.icon ?? Sparkles;
    return (
      <div className="relative overflow-hidden rounded-3xl border border-brand-100/80 bg-white shadow-[0_1px_3px_rgba(23,61,13,0.06),0_10px_30px_rgba(23,61,13,0.07)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gradient-to-br from-brand-100/80 to-transparent blur-2xl"
        />
        <div className="relative p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/25">
              <DestinationIcon aria-hidden="true" className="size-5" />
            </span>
            <ToolBadge tone="pass">Your result</ToolBadge>
          </div>
          <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
            {result.heading}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{result.body}</p>

          <div className="mt-5 flex flex-wrap gap-2 rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-sm text-slate-600">
            {answers.destination ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm">
                <Check aria-hidden="true" className="size-3.5" /> {DESTINATIONS.find((d) => d.value === answers.destination)?.label}
              </span>
            ) : null}
            {[answers.ageGroup, answers.education, `${answers.english} English`].map((part) =>
              part ? (
                <span key={part} className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                  {part}
                </span>
              ) : null,
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={marketHref(market, "/contact")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-all duration-200 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/25 active:scale-[0.98]"
            >
              {result.action}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href={marketHref(market, result.route)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-all duration-200 hover:border-brand-300 hover:bg-brand-50/50 active:scale-[0.98]"
            >
              {result.routeLabel}
            </a>
            <ToolButton variant="secondary" onClick={restart}>
              <RotateCcw aria-hidden="true" className="size-4" />
              Start over
            </ToolButton>
          </div>

          <ToolNote className="mt-5">
            This quick check is a general orientation only — it is not an eligibility assessment and
            does not guarantee any outcome. A DMC consultant can review your full profile in a free
            consultation.
          </ToolNote>
        </div>
      </div>
    );
  }

  const current = STEPS[Math.min(step, STEPS.length - 1)];
  const currentOptions = current.key === "destination" ? DESTINATIONS.map((d) => d.label) : current.options;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-100/80 bg-white shadow-[0_1px_3px_rgba(23,61,13,0.06),0_10px_30px_rgba(23,61,13,0.07)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gradient-to-br from-brand-100/80 to-transparent blur-2xl"
      />
      <div className="relative p-6 md:p-8">
        {/* Progress */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
            Step {step + 1} of {STEPS.length}
          </span>
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => {
              const done = answers[s.key] !== null;
              const active = i === step;
              return (
                <span
                  key={s.key}
                  aria-hidden="true"
                  className={active ? "relative flex items-center" : "flex items-center"}
                >
                  <span
                    className={`grid size-6 place-items-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                      done
                        ? "bg-brand-600 text-white"
                        : active
                          ? "bg-brand-100 text-brand-700 ring-2 ring-brand-500/30"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {done ? <Check aria-hidden="true" className="size-3.5 stroke-[3]" /> : i + 1}
                  </span>
                  {i < STEPS.length - 1 ? (
                    <span className={`mx-1.5 h-0.5 w-4 rounded-full transition-colors duration-300 sm:w-6 ${done ? "bg-brand-400" : "bg-slate-200"}`} />
                  ) : null}
                </span>
              );
            })}
          </div>
        </div>

        <h3 className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
          {current.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{current.sub}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {currentOptions.map((option) => {
            const activeValue = answers[current.key];
            const isActive = activeValue === option;
            const destination = current.key === "destination" ? DESTINATIONS.find((d) => d.label === option) : null;
            const OptionIcon = destination?.icon;
            return (
              <button
                key={option}
                onClick={() => setAnswer(current.key, option)}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                  isActive
                    ? "border-brand-600 bg-brand-50 shadow-sm shadow-brand-600/10"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50/40 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  {OptionIcon ? (
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "bg-brand-600 text-white"
                          : "bg-brand-50 text-brand-600 group-hover:bg-brand-100"
                      }`}
                    >
                      <OptionIcon aria-hidden="true" className="size-4.5" />
                    </span>
                  ) : null}
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-ink">{option}</span>
                    {current.key === "destination" ? (
                      <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                        {DESTINATIONS.find((d) => d.label === option)?.blurb}
                      </span>
                    ) : null}
                  </span>
                </div>
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-brand-600 text-white"
                  >
                    <Check aria-hidden="true" className="size-3 stroke-[3]" />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-brand-700"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          <span className="text-xs text-slate-400">Free · 30 seconds · No sign-up</span>
        </div>
      </div>
    </div>
  );
}
