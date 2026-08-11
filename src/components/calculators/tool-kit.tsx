"use client";

/**
 * DMC tool-kit — shared premium UI primitives for every calculator / tool.
 *
 * Implements a single, consistent design language that complements the site's
 * botanical-green theme (brand greens, Manrope display type, soft botanical
 * gradients, gentle shadows) so every tool feels like part of the same family.
 *
 * Components are intentionally small and composable. All logic stays in the
 * calculators; this file only owns presentation + micro-interactions.
 */

import {
  Check,
  ChevronDown,
  Info,
  type LucideIcon,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/* Card + header                                                       */
/* ------------------------------------------------------------------ */

export function ToolCard({
  icon: Icon,
  eyebrow,
  title,
  lede,
  children,
  className,
  headerClassName,
}: {
  icon?: LucideIcon;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-brand-100/60 bg-white transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(23,61,13,0.06),0_20px_48px_rgba(23,61,13,0.1)]",
        "shadow-[0_1px_3px_rgba(23,61,13,0.05),0_10px_30px_rgba(23,61,13,0.07)]",
        className,
      )}
    >
      {/* Accent top gradient bar */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-300 via-brand-500 to-brand-600" />
      {/* Soft botanical glow, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-gradient-to-br from-brand-100/60 via-brand-50/40 to-transparent blur-3xl"
      />
      {/* Fine leaf hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[3px] h-px bg-gradient-to-r from-transparent via-brand-300/50 to-transparent"
      />

      {eyebrow || title || lede ? (
        <header className={cn("relative px-6 pb-5 pt-7 md:px-8 md:pt-8", headerClassName)}>
          {Icon ? (
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/25 transition-transform duration-300">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              {eyebrow ? (
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
                  {eyebrow}
                </span>
              ) : null}
            </div>
          ) : eyebrow ? (
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h3 className="font-display text-xl font-extrabold leading-tight tracking-tight text-ink md:text-2xl">
              {title}
            </h3>
          ) : null}
          {lede ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">
              {lede}
            </p>
          ) : null}
        </header>
      ) : null}

      <div className="relative px-6 pb-7 md:px-8 md:pb-8">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form controls                                                       */
/* ------------------------------------------------------------------ */

export function ToolField({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-semibold text-slate-700">{label}</span>
        {hint ? <span className="text-xs font-medium text-brand-700">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

interface ToolSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  /** Optional trailing chip (e.g. computed points) shown next to the chevron. */
  chip?: string;
}

export function ToolSelect({ options, chip, className, ...rest }: ToolSelectProps) {
  return (
    <div className="relative group">
      <select
        {...rest}
        className={cn(
          "h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-4 text-sm font-medium text-ink shadow-sm transition-all duration-200",
          "hover:border-brand-300 hover:shadow-md hover:shadow-brand-600/5",
          "focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 focus:shadow-md focus:shadow-brand-600/5",
          chip ? "pr-24" : "pr-11",
          className,
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {chip ? (
        <span className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-bold text-brand-700 border border-brand-100">
          {chip}
        </span>
      ) : null}
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-brand-500"
      />
    </div>
  );
}

export function ToolSlider({
  label,
  value,
  min,
  max,
  onChange,
  hint,
  step = 1,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  hint?: ReactNode;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-semibold text-slate-700">{label}</span>
        <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold tabular-nums text-white shadow-sm shadow-brand-600/25">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className="dmc-range w-full"
        style={{
          background: `linear-gradient(to right, var(--color-brand-600) 0%, var(--color-brand-500) ${pct}%, var(--color-brand-100) ${pct}%, var(--color-brand-100) 100%)`,
        }}
      />
      {hint ? <div className="mt-1.5 text-xs font-medium text-brand-700">{hint}</div> : null}
    </div>
  );
}

export function ToolSegmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label?: string;
  value: T;
  options: { value: T; label: ReactNode }[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      {label ? (
        <span className="mb-2 block text-[13px] font-semibold text-slate-700">{label}</span>
      ) : null}
      <div className="inline-flex flex-wrap gap-1 rounded-2xl border border-slate-200 bg-slate-50/80 p-1">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={cn(
                "relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-250",
                active
                  ? "bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/30"
                  : "text-slate-600 hover:bg-white hover:text-brand-700 hover:shadow-sm",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ToolCheck({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  description?: ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition-all duration-300",
        checked
          ? "border-brand-300 bg-gradient-to-br from-brand-50/80 to-brand-50/40 shadow-sm shadow-brand-600/8 ring-1 ring-brand-200/50"
          : "border-slate-200 bg-white hover:border-brand-200 hover:bg-brand-50/30 hover:shadow-sm",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-lg border-2 transition-all duration-300",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2",
          checked
            ? "border-brand-600 bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-sm shadow-brand-600/30"
            : "border-slate-300 bg-white text-transparent",
        )}
      >
        <Check aria-hidden="true" className="size-3.5 stroke-[3]" />
      </span>
      <span className="min-w-0">
        <span className={cn("block text-sm font-bold transition-colors duration-200", checked ? "text-brand-900" : "text-ink")}>
          {label}
        </span>
        {description ? (
          <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-500">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function ToolButton({
  children,
  variant = "primary",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-250 active:scale-[0.97]",
        "disabled:cursor-not-allowed disabled:opacity-45 disabled:active:scale-100",
        variant === "primary" &&
          "bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/25 hover:from-brand-600 hover:to-brand-800 hover:shadow-lg hover:shadow-brand-600/30",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700 hover:shadow-md hover:shadow-brand-600/5",
        variant === "ghost" && "text-brand-700 hover:bg-brand-50/80",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Score gauge (circular) + count-up                                   */
/* ------------------------------------------------------------------ */

export function CountUp({
  value,
  duration = 700,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  // Start at the real value so server-rendered output never flashes “0”;
  // subsequent changes animate from the previous value to the new one.
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === fromRef.current) return;
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (value - from) * eased);
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = value;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      fromRef.current = value;
    };
  }, [value, duration]);

  return <span className={className}>{display.toLocaleString()}</span>;
}

export function ScoreGauge({
  value,
  max,
  label,
  tone = "neutral",
  size = 148,
}: {
  value: number;
  max: number;
  label?: string;
  tone?: "pass" | "warn" | "neutral";
  size?: number;
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const dashOffset = circumference * (1 - pct);

  const strokeColor =
    tone === "pass"
      ? "var(--color-brand-600)"
      : tone === "warn"
        ? "#d97706"
        : "var(--color-brand-500)";

  const glowColor =
    tone === "pass"
      ? "rgba(53,142,26,0.3)"
      : tone === "warn"
        ? "rgba(217,119,6,0.3)"
        : "rgba(67,170,27,0.2)";

  return (
    <div
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${value} out of ${max}${label ? ` ${label}` : ""}`}
    >
      <svg viewBox="0 0 128 128" className="absolute inset-0 size-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="var(--color-brand-100)"
          strokeWidth="11"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
            filter: `drop-shadow(0 2px 8px ${glowColor})`,
          }}
        />
      </svg>
      <div className="relative text-center" aria-hidden="true">
        <div className="font-display text-4xl font-black tabular-nums leading-none text-ink">
          <CountUp value={value} />
        </div>
        {label ? (
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Result panel, stats, progress, badges, notes                        */
/* ------------------------------------------------------------------ */

export function ToolBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "pass" | "warn" | "neutral";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em]",
        tone === "pass" && "bg-brand-100 text-brand-800",
        tone === "warn" && "bg-amber-100 text-amber-800",
        tone === "neutral" && "bg-slate-100 text-slate-600",
      )}
    >
      {children}
    </span>
  );
}

export function ToolResult({
  tone,
  status,
  score,
  scoreLabel,
  children,
  className,
}: {
  tone: "pass" | "warn" | "neutral";
  status: ReactNode;
  /** Optional big score (e.g. "412") rendered next to the status pill. */
  score?: ReactNode;
  scoreLabel?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border-2 p-6 md:p-7",
        tone === "pass" && "border-brand-300/60 bg-gradient-to-br from-brand-50 via-white to-brand-50/70",
        tone === "warn" && "border-amber-300/60 bg-gradient-to-br from-amber-50 via-white to-amber-50/60",
        tone === "neutral" && "border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50/60",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 size-40 rounded-full bg-white/60 blur-2xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <ToolBadge tone={tone === "pass" ? "pass" : tone === "warn" ? "warn" : "neutral"}>
          {status}
        </ToolBadge>
        {score ? (
          <div className="text-right">
            <div className="font-display text-4xl font-black tabular-nums leading-none text-ink">
              {score}
            </div>
            {scoreLabel ? (
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                {scoreLabel}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {children ? <div className="relative mt-5">{children}</div> : null}
    </div>
  );
}

export function ToolStat({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5",
        accent
          ? "border-brand-200 bg-brand-50/70 shadow-sm shadow-brand-600/5"
          : "border-slate-100 bg-white shadow-sm",
      )}
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl font-extrabold tabular-nums text-ink">{value}</div>
      {hint ? <div className="mt-0.5 text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}

export function ProgressBar({ value, max, tone = "brand" }: { value: number; max: number; tone?: "brand" | "amber" }) {
  const pct = Math.min(Math.max(value / max, 0), 1) * 100;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-brand-100/70">
      <div
        className={cn(
          "h-full rounded-full transition-all duration-700 ease-out",
          tone === "brand"
            ? "bg-gradient-to-r from-brand-500 to-brand-600"
            : "bg-gradient-to-r from-amber-400 to-amber-500",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ToolNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-2xl border border-brand-100/80 bg-brand-50/50 px-4 py-3.5 text-xs leading-relaxed text-slate-500",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-500" />
      <div>{children}</div>
    </div>
  );
}
