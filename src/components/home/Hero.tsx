"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import type { Market } from "@/config/markets";
import { marketHref } from "@/lib/routing/routes";
import { FloatingLeaves } from "@/components/ui/FloatingLeaves";

const COUNTRIES = [
  { name: "Canada", flag: "🇨🇦", route: "Express Entry · PNP · Study" },
  { name: "Australia", flag: "🇦🇺", route: "189 · 190 · 491 · Employer" },
  { name: "United Kingdom", flag: "🇬🇧", route: "Skilled Worker · Study" },
  { name: "United States", flag: "🇺🇸", route: "Visit · Study · Business" },
  { name: "New Zealand", flag: "🇳🇿", route: "Work · Study · Visit" },
  { name: "Germany", flag: "🇩🇪", route: "Skilled Work · Study" },
  { name: "United Arab Emirates", flag: "🇦🇪", route: "Golden Visa · Business" },
  { name: "China", flag: "🇨🇳", route: "Visit Visa" },
  { name: "Japan", flag: "🇯🇵", route: "Visit Visa" },
  { name: "Turkey", flag: "🇹🇷", route: "Visit Visa" },
  { name: "South Korea", flag: "🇰🇷", route: "Visit Visa" },
  { name: "Singapore", flag: "🇸🇬", route: "Visit · Business" },
  { name: "Saudi Arabia", flag: "🇸🇦", route: "Visit · Business" },
  { name: "Greece", flag: "🇬🇷", route: "Visit · Residency" },
  { name: "Thailand", flag: "🇹🇭", route: "Visit Visa" },
  { name: "South Africa", flag: "🇿🇦", route: "Visit Visa" },
  { name: "Cyprus", flag: "🇨🇾", route: "Visit · Residency" },
  { name: "Netherlands", flag: "🇳🇱", route: "Visit · Mobility" },
  { name: "St. Kitts & Nevis", flag: "🇰🇳", route: "Citizenship" },
  { name: "Vanuatu", flag: "🇻🇺", route: "Citizenship" },
];

// Orbital node positions and delays from the template
const NODES = [
  { index: 0, ring: "ring-1", left: "49.232%", top: "6.007%", delay: "0.16s" },
  { index: 1, ring: "ring-1", left: "83.917%", top: "21.970%", delay: "0.37s" },
  { index: 2, ring: "ring-1", left: "93.061%", top: "59.041%", delay: "0.58s" },
  { index: 3, ring: "ring-1", left: "69.780%", top: "89.303%", delay: "0.79s" },
  { index: 4, ring: "ring-1", left: "31.604%", top: "89.970%", delay: "1.00s" },
  { index: 5, ring: "ring-1", left: "7.281%", top: "60.538%", delay: "1.21s" },
  { index: 6, ring: "ring-1", left: "15.126%", top: "23.171%", delay: "1.42s" },
  { index: 7, ring: "ring-2", left: "63.016%", top: "20.767%", delay: "0.32s" },
  { index: 8, ring: "ring-2", left: "80.971%", top: "41.949%", delay: "0.53s" },
  { index: 9, ring: "ring-2", left: "75.604%", top: "69.194%", delay: "0.74s" },
  { index: 10, ring: "ring-2", left: "50.957%", top: "81.986%", delay: "0.95s" },
  { index: 11, ring: "ring-2", left: "25.589%", top: "70.691%", delay: "1.16s" },
  { index: 12, ring: "ring-2", left: "18.603%", top: "43.816%", delay: "1.37s" },
  { index: 13, ring: "ring-2", left: "35.259%", top: "21.597%", delay: "1.58s" },
  { index: 14, ring: "ring-3", left: "65.973%", top: "37.964%", delay: "0.48s" },
  { index: 15, ring: "ring-3", left: "68.410%", top: "57.815%", delay: "0.69s" },
  { index: 16, ring: "ring-3", left: "52.437%", top: "69.851%", delay: "0.90s" },
  { index: 17, ring: "ring-3", left: "34.027%", top: "62.036%", delay: "1.11s" },
  { index: 18, ring: "ring-3", left: "31.590%", top: "42.185%", delay: "1.32s" },
  { index: 19, ring: "ring-3", left: "47.563%", top: "30.149%", delay: "1.53s" },
];

interface HeroAction {
  label: string;
  href: string;
}

interface HeroProofStat {
  value: string;
  label: string;
}

export interface HeroProps {
  market: Market;
  sectionId?: string;
  eyebrow?: string;
  titlePrefix?: string;
  titleAccent?: string;
  titleSuffix?: string;
  subtitle?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  proofStats?: HeroProofStat[];
  disclaimer?: string;
  scrollTarget?: string;
  scrollLabel?: string;
}

const DEFAULT_PRIMARY_ACTION = (market: Market): HeroAction => ({
  label: "Book Consultation",
  href: marketHref(market, "/contact"),
});

const DEFAULT_SECONDARY_ACTION = (market: Market): HeroAction => ({
  label: "Free Eligibility Assessment",
  href: marketHref(market, "/tools/eligibility-checker"),
});

const DEFAULT_PROOF_STATS: HeroProofStat[] = [
  { value: "15+", label: "Years" },
  { value: "12,000+", label: "Clients guided" },
  { value: "20", label: "Countries represented" },
];

export function Hero({
  market,
  sectionId = "home",
  eyebrow = "Global opportunity network",
  titlePrefix = "Your journey towards a",
  titleAccent = "better future",
  titleSuffix = " begins here.",
  subtitle = "Premium, structured immigration support for professionals, families, students, employers and investors across Canada, Australia, the United Kingdom and a complete international destination network.",
  primaryAction,
  secondaryAction,
  proofStats = DEFAULT_PROOF_STATS,
  disclaimer = "Government authorities make all final visa and immigration decisions. Previous outcomes do not guarantee future approval.",
  scrollTarget = "#services",
  scrollLabel = "Explore the journey",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const primary = primaryAction ?? DEFAULT_PRIMARY_ACTION(market);
  const secondary = secondaryAction ?? DEFAULT_SECONDARY_ACTION(market);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;

    const root = document.documentElement;
    const nameEl = document.getElementById("auroraActiveCountry");
    const flagEl = document.getElementById("auroraActiveFlag");
    const routeEl = document.getElementById("auroraActiveRoute");
    const tickerEl = document.getElementById("auroraTickerText");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-country-index]"));
    const magnetic = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const fadeUps = Array.from(document.querySelectorAll<HTMLElement>(".fade-up"));

    // Country cycling
    let activeIndex = 0;
    const setCountry = (index: number) => {
      const country = COUNTRIES[index % COUNTRIES.length];
      if (!country || !nameEl) return;
      if (nameEl) nameEl.textContent = country.name;
      if (flagEl) flagEl.textContent = country.flag;
      if (routeEl) routeEl.textContent = country.route;
      if (tickerEl) tickerEl.textContent = `${country.name} pathway active`;
      nodes.forEach((node, i) => node.classList.toggle("is-active", i === index));
    };
    setCountry(0);
    const interval = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % COUNTRIES.length;
      setCountry(activeIndex);
    }, 1900);

    // Node hover/focus/click
    nodes.forEach((node, index) => {
      node.addEventListener("mouseenter", () => setCountry(index));
      node.addEventListener("focus", () => setCountry(index));
      node.addEventListener("click", () => setCountry(index));
    });

    // Fade-up reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    fadeUps.forEach((el) => io.observe(el));

    // Scroll parallax effects
    let ticking = false;
    const updateScrollEffects = () => {
      const scrollY = window.scrollY;
      const heroHeight = Math.max(hero.offsetHeight, 1);
      const progress = Math.min(Math.max(scrollY / (heroHeight * 0.86), 0), 1);
      root.style.setProperty("--scroll-progress", progress.toFixed(3));
      root.style.setProperty("--hero-copy-y", `${progress * -35}px`);
      root.style.setProperty("--bridge-y", `${progress * -56}px`);
      root.style.setProperty("--bridge-scale", (1 + progress * 0.09).toFixed(3));
      root.style.setProperty("--hero-opacity", Math.max(1 - progress * 0.83, 0.17).toFixed(3));
      ticking = false;
    };
    const requestUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    // Mouse parallax on hero + magnetic buttons
    if (window.matchMedia("(pointer:fine)").matches) {
      hero.addEventListener(
        "pointermove",
        (event) => {
          const rect = hero.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          root.style.setProperty("--mouse-x", x.toFixed(3));
          root.style.setProperty("--mouse-y", y.toFixed(3));
        },
        { passive: true },
      );
      hero.addEventListener("pointerleave", () => {
        root.style.setProperty("--mouse-x", "0");
        root.style.setProperty("--mouse-y", "0");
      });
      magnetic.forEach((element) => {
        element.addEventListener("pointermove", (event) => {
          const rect = element.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;
          element.style.transform = `translate(${x * 0.07}px, ${y * 0.07}px) translateY(-2px)`;
        });
        element.addEventListener("pointerleave", () => (element.style.transform = ""));
      });
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateScrollEffects();

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      io.disconnect();
      nodes.forEach((node) => {
        node.removeEventListener("mouseenter", () => setCountry(0));
        node.removeEventListener("focus", () => setCountry(0));
        node.removeEventListener("click", () => setCountry(0));
      });
      magnetic.forEach((element) => {
        element.removeEventListener("pointermove", () => {});
        element.removeEventListener("pointerleave", () => {});
      });
      hero.removeEventListener("pointermove", () => {});
      hero.removeEventListener("pointerleave", () => {});
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id={sectionId}
      className="hero aurora-hero botanical-hero editorial-hero alternative-hero"
      data-observe-section=""
    >
      <div aria-hidden="true" className="botanical-hero-bg" />
      <div aria-hidden="true" className="botanical-sun-rays" />
      <div aria-hidden="true" className="botanical-map-grid" />
      <FloatingLeaves />

      <div className="botanical-hero-shell">
        <div className="botanical-hero-copy fade-up">
          <div className="botanical-license-pill">
            <span /> RCIC · MARA · ICCRC regulated guidance
          </div>
          <p className="botanical-overline">{eyebrow}</p>
          <h1 className="botanical-hero-title">
            {titlePrefix}
            {titleAccent ? <span>{titleAccent}</span> : null}
            {titleSuffix}
          </h1>
          <p className="botanical-hero-subtitle">{subtitle}</p>
          <div className="botanical-hero-actions">
            <a href={primary.href} className="botanical-primary-btn magnetic">
              {primary.label} <i className="fa-solid fa-arrow-right" />
            </a>
            <a href={secondary.href} className="botanical-secondary-btn magnetic">
              <i className="fa-solid fa-shield-halved" /> {secondary.label}
            </a>
          </div>
          <div className="botanical-proof-row">
            {proofStats.map((stat) => (
              <span key={`${stat.value}-${stat.label}`}>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </span>
            ))}
          </div>
          <p className="botanical-disclaimer">{disclaimer}</p>
        </div>

        <div
          ref={stageRef}
          aria-label="Animated DMC global immigration destination map"
          className="global-orbit-stage botanical-network-stage"
          id="globalOrbitStage"
        >
          <div aria-hidden="true" className="botanical-world-halo" />
          <div aria-hidden="true" className="orbit-ring orbit-ring-outer" />
          <div aria-hidden="true" className="orbit-ring orbit-ring-middle" />
          <div aria-hidden="true" className="orbit-ring orbit-ring-inner" />
          <svg aria-hidden="true" className="orbit-route-svg botanical-route-svg" viewBox="0 0 620 620">
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="dmcBotanicalRoute" x1="75" x2="555" y1="90" y2="540">
                <stop stopColor="#D8F5C6" stopOpacity=".25" />
                <stop offset=".48" stopColor="#45B318" />
                <stop offset="1" stopColor="#358E1A" stopOpacity=".35" />
              </linearGradient>
              <radialGradient id="dmcMapGlow">
                <stop stopColor="#45B318" stopOpacity=".16" />
                <stop offset="1" stopColor="#45B318" stopOpacity="0" />
              </radialGradient>
              <path d="M71 372C151 128 303 91 447 181C548 244 542 405 451 482C350 568 178 535 108 431" id="botanicalFlightPath" />
            </defs>
            <circle cx="310" cy="310" fill="url(#dmcMapGlow)" r="250" />
            <g className="botanical-map-lines" fill="none" stroke="#358E1A" strokeOpacity=".14" strokeWidth="1">
              <path d="M112 229C154 190 199 200 234 223C270 247 307 248 343 224C379 200 422 193 468 221" />
              <path d="M101 311C158 272 210 288 252 319C294 350 344 347 389 315C431 286 475 279 521 315" />
              <path d="M128 403C182 365 229 376 269 407C311 440 359 438 401 405C442 373 478 373 507 395" />
            </g>
            <path
              className="aurora-dash-route"
              d="M71 372C151 128 303 91 447 181C548 244 542 405 451 482C350 568 178 535 108 431"
              fill="none"
              stroke="url(#dmcBotanicalRoute)"
              strokeDasharray="8 13"
              strokeWidth="1.5"
            />
            <path
              className="aurora-dash-route route-reverse"
              d="M101 209C207 302 293 213 376 288C450 354 501 320 548 252"
              fill="none"
              stroke="#358E1A"
              strokeDasharray="4 11"
              strokeOpacity=".26"
              strokeWidth="1.1"
            />
            <g className="aurora-plane">
              <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
                <mpath href="#botanicalFlightPath" />
              </animateMotion>
              <path d="M0 0L18 4L8 9L4 17L0 0Z" fill="#173D0D" stroke="#45B318" strokeWidth=".8" />
            </g>
          </svg>

          {NODES.map((node) => {
            const country = COUNTRIES[node.index];
            return (
              <button
                key={node.index}
                aria-label={`${country.name}: ${country.route}`}
                className={`country-orbit-node ${node.ring}`}
                data-country-index={node.index}
                style={
                  {
                    "--node-left": node.left,
                    "--node-top": node.top,
                    "--node-delay": node.delay,
                  } as CSSProperties
                }
                type="button"
              >
                <span className="country-orbit-flag">{country.flag}</span>
                <span className="country-orbit-label">{country.name}</span>
              </button>
            );
          })}

          <div className="aurora-core-card botanical-core-card">
          <div className="aurora-core-logo botanical-core-logo">
              <span
                aria-label="DMC Immigration"
                className="brand-logo brand-logo-aurora"
                role="img"
              />
          </div>
            <span className="aurora-live-label botanical-live-label">
              <i /> Live destination network
            </span>
            <div className="aurora-active-country botanical-active-country">
              <span id="auroraActiveFlag">🇨🇦</span>
              <div>
                <strong id="auroraActiveCountry">Canada</strong>
                <small id="auroraActiveRoute">Express Entry · PNP · Study</small>
              </div>
            </div>
            <div className="aurora-network-meter botanical-network-meter">
              <span />
            </div>
            <div className="aurora-core-stats botanical-core-stats">
              <span>
                <strong>20</strong> countries
              </span>
              <span>
                <strong>50+</strong> pathways
              </span>
              <span>
                <strong>1</strong> strategy
              </span>
            </div>
          </div>

          <div className="aurora-float-card botanical-float-card approval-card">
            <span>Profile assessment</span>
            <strong>Strategy mapped</strong>
            <small>
              <i /> Consultant reviewed
            </small>
          </div>
          <div className="aurora-float-card botanical-float-card rate-card">
            <span>Case preparation</span>
            <strong>End-to-end</strong>
            <div className="aurora-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="aurora-float-card botanical-float-card alert-card">
            <i className="fa-solid fa-location-dot" />
            <span id="auroraTickerText">Canada pathway active</span>
          </div>
        </div>
      </div>

      <a className="botanical-scroll-cue" href={scrollTarget}>
        <span>{scrollLabel}</span>
        <i />
      </a>
    </section>
  );
}
