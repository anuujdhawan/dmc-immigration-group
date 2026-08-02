import { ArrowRight } from "lucide-react";

import type { Market } from "@/config/markets";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { marketHref } from "@/lib/routing/routes";

const COUNTRIES = [
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇳🇿", name: "New Zealand" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇦🇪", name: "United Arab Emirates" },
  { flag: "🇨🇳", name: "China" },
  { flag: "🇯🇵", name: "Japan" },
  { flag: "🇹🇷", name: "Turkey" },
  { flag: "🇰🇷", name: "South Korea" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇸🇦", name: "Saudi Arabia" },
  { flag: "🇬🇷", name: "Greece" },
  { flag: "🇹🇭", name: "Thailand" },
  { flag: "🇿🇦", name: "South Africa" },
  { flag: "🇨🇾", name: "Cyprus" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇰🇳", name: "St. Kitts & Nevis" },
  { flag: "🇻🇺", name: "Vanuatu" },
];

const STATS = [
  { value: "15+", label: "Years of consulting experience" },
  { value: "20", label: "Countries represented" },
  { value: "50+", label: "Immigration pathways" },
  { value: "3", label: "Regulated practices" },
];

export function Hero({ market }: { market: Market }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-aurora-bg text-aurora-text"
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 80% -10%, rgba(69,179,24,0.28), transparent 60%), radial-gradient(900px 500px at 10% 110%, rgba(45,126,24,0.35), transparent 55%)",
      }}
    >
      <Container className="py-16 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-aurora-border bg-aurora-panel px-3.5 py-1.5 text-xs font-semibold tracking-mega text-aurora-text">
              RCIC · MARA · CICC REGULATED
            </span>
            <span className="rounded-full border border-aurora-border bg-aurora-panel px-3.5 py-1.5 text-xs font-medium text-aurora-muted">
              Global opportunity network
            </span>
          </div>

          <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] text-white md:text-5xl lg:text-6xl">
            Your journey towards a better future begins here.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-aurora-muted md:text-lg">
            Premium, structured immigration support for professionals, families, students,
            employers and investors across Canada, Australia, the United Kingdom and a complete
            international destination network.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={marketHref(market, "/contact")} size="lg">
              Book Consultation
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button
              href={marketHref(market, "/tools/eligibility-checker")}
              size="lg"
              variant="white"
            >
              Free Eligibility Assessment
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-bold text-leaf-soft">{stat.value}</dd>
                <p className="mt-1 text-xs leading-snug text-aurora-muted">{stat.label}</p>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-2xl text-xs leading-relaxed text-aurora-muted/80">
            Government authorities make all final visa and immigration decisions. Previous
            outcomes do not guarantee future approval.
          </p>
        </div>
      </Container>

      <div className="border-t border-aurora-border bg-aurora-bg-2/80 py-5">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul
            aria-label="Destinations we represent"
            className="flex min-w-max animate-[marquee_45s_linear_infinite] gap-10 pr-10"
          >
            {[...COUNTRIES, ...COUNTRIES].map((country, index) => (
              <li
                key={`${country.name}-${index}`}
                className="flex items-center gap-2 text-sm font-medium text-aurora-muted"
              >
                <span aria-hidden="true">{country.flag}</span>
                {country.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
