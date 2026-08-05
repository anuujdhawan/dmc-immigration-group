import { MARKET_LABELS, type Market } from "@/config/markets";
import { getPageContent } from "@/content/pages";
import type { PageContent } from "@/content/pages/types";
import { marketHref } from "@/lib/routing/routes";
import { paragraphsForMarket } from "@/lib/i18n/market-copy";
import { pageMedia } from "@/config/page-media";
import { Hero } from "@/components/home/Hero";
import {
  BenefitsGrid,
  CriteriaGrid,
  DisclaimerBand,
  FaqSection,
  FinalCta,
  FeatureList,
  InternalAnchorNav,
  InternalBreadcrumbs,
  InternalFactsBar,
  InternalSection,
  LeadFormSection,
  MediaFrame,
  MediaGallerySection,
  ProcessSection,
  ProgramCards,
  RichCopy,
  SectionHeader,
  SplitContentSection,
  type FaqItem,
  type FeatureItem,
} from "@/components/pages/internal/InternalPageTemplate";

function requirePage(pageId: string): PageContent {
  const page = getPageContent(pageId);
  if (!page) {
    throw new Error(`Missing page content for ${pageId}`);
  }
  return page;
}

function OfficialSourcesSection({ sources }: { sources: PageContent["officialSources"] }) {
  return (
    <InternalSection tone="soft" labelledBy="ee-sources-title">
      <div className="ee-shell">
        <SectionHeader
          kicker="Official sources"
          title={
            <>
              Verified against current <span>government guidance.</span>
            </>
          }
          titleId="ee-sources-title"
          copy="Use the official program pages below to confirm current requirements, participating streams, and the latest government updates."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-[24px] border border-brand-600/10 bg-white/88 px-5 py-5 text-sm text-charcoal shadow-sm transition-colors hover:border-brand-600/30 hover:bg-brand-50/60"
            >
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">Official source</span>
              <strong className="mt-2 block font-display text-lg font-semibold text-charcoal">{source.label}</strong>
              <span className="mt-3 inline-flex text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
                Open source →
              </span>
            </a>
          ))}
        </div>
      </div>
    </InternalSection>
  );
}

function PnpAtAGlance({ rows, note }: { rows: Array<{ label: string; value: string }>; note?: string }) {
  return (
    <InternalSection id="streams">
      <div className="ee-shell">
        <SectionHeader
          kicker="Nomination at a glance"
          title={
            <>
              What a nomination can change <span>for the applicant.</span>
            </>
          }
          copy="Express Entry-aligned and base streams operate differently, but both require a province-specific strategy and a separate federal permanent-residence stage."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="rounded-[26px] border border-brand-600/10 bg-white/88 px-5 py-5 shadow-sm">
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">{row.label}</span>
              <strong className="mt-2 block font-display text-xl font-semibold tracking-tight text-charcoal">{row.value}</strong>
            </div>
          ))}
        </div>
        {note ? <p className="mt-5 max-w-4xl text-sm leading-7 text-muted">{note}</p> : null}
      </div>
    </InternalSection>
  );
}

export function ProvincialNomineeProgramsPage({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/canada/provincial-nominee-programs");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/canada/provincial-nominee-programs");
  const overview = page.sections.find((section) => section.kind === "overview");
  const streams = page.sections.find((section) => section.kind === "programs");
  const panel = page.sections.find((section) => section.kind === "panel");
  const process = page.sections.find((section) => section.kind === "process");
  const faq = page.sections.find((section) => section.kind === "faq");

  if (!overview || overview.kind !== "overview" || !streams || streams.kind !== "programs" || !panel || panel.kind !== "panel" || !process || process.kind !== "process" || !faq || faq.kind !== "faq") {
    throw new Error("Provincial Nominee Programs page content is incomplete.");
  }

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="pnp-hero"
        eyebrow={`${marketLabel} market · Canada Provincial Nominee Programs`}
        titlePrefix="Your province-specific route towards"
        titleAccent="Canadian permanent residence"
        subtitle={`Provincial nomination guidance for professionals and families in the ${marketLabel} market. Explore Express Entry-aligned streams, base nominations and employer-led pathways across Canadian provinces.`}
        primaryAction={{
          label: "Discuss Nomination Options",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Provincial Route Assessment",
          href: `#services`,
        }}
        proofStats={[
          { value: "+600", label: "CRS points (EE-aligned)" },
          { value: "13", label: "Provinces & territories" },
          { value: "2", label: "Stream types" },
        ]}
        disclaimer="Provincial nomination does not guarantee permanent residence. The final immigration decision is always made by IRCC after the federal application stage."
        scrollTarget="#services"
        scrollLabel="Explore PNP options"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Canada", href: marketHref(market, "/visas/canada") },
          { label: "Provincial Nominee Programs" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Route type", value: "Province-led nomination pathway" },
          { label: "Main streams", value: "Express Entry-aligned · Base · Employer-led" },
          { label: "Nomination benefit", value: "+600 CRS points on aligned streams" },
          { label: "Final decision", value: "Permanent residence still decided by IRCC" },
        ]}
      />
      <InternalAnchorNav
        items={[
          { href: "#services", label: "Overview" },
          { href: "#programs", label: "Streams" },
          { href: "#streams", label: "Nomination impact" },
          { href: "#process", label: "Process" },
          { href: "#faq", label: "FAQs" },
        ]}
      />

      <SplitContentSection
        id="services"
        media={{
          alt: media.split?.alt ?? "Provincial nomination strategy for Canada",
          label: media.split?.label ?? "Province-specific immigration planning",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="Canada Provincial Nominee Programs"
        title={
          <>
            A province-led route towards <span>Canadian permanent residence.</span>
          </>
        }
        after={
          <BenefitsGrid
            items={[
              "Province-specific targeting based on labour-market needs",
              "Express Entry-aligned streams can add 600 CRS points",
              "Base streams remain available outside the federal pool",
              "Employer, graduate and entrepreneur categories vary by province",
            ]}
          />
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} DMC's ${marketLabel} market team can help you compare provincial criteria with the federal route before you commit to one nomination strategy.`,
            "The strongest provincial applications are usually targeted, not generic. Occupation lists, employer rules, graduate eligibility, settlement intent and intake windows vary by province and can change without much notice.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Discuss your nomination options"
        title={`Provincial nomination guidance for clients in ${marketLabel}.`}
        copy={[
          `If you are comparing Express Entry with province-specific routes, the DMC ${marketLabel} team can help you identify which provinces currently match your profile and where a nomination may realistically improve your path.`,
          "We review the program fit, supporting evidence, provincial intent-to-reside issues and the extra federal stage that still follows a successful nomination.",
        ]}
      />

      <InternalSection id="programs" tone="soft">
        <div className="ee-shell">
          <SectionHeader
            kicker={overview.heading}
            title={
              <>
                How provincial nomination <span>works in practice.</span>
              </>
            }
            copy="Provincial programs are driven by regional needs, not one national points grid. A successful nomination can support, but does not replace, the federal permanent-residence decision."
          />
          <RichCopy paragraphs={paragraphsForMarket(overview.paragraphs, market)} />
        </div>
      </InternalSection>

      <InternalSection tone="white">
        <div className="ee-shell">
          <SectionHeader
            kicker="Common nomination streams"
            title={
              <>
                Different provinces, different <span>stream structures.</span>
              </>
            }
            copy={streams.lede}
          />
          <ProgramCards
            items={streams.items.map((item, index) => ({
              code: item.code ?? `P${index + 1}`,
              num: String(index + 1).padStart(2, "0"),
              title: item.title,
              body: item.body,
              label: item.label ?? "Provincial nomination stream",
            }))}
          />
        </div>
      </InternalSection>

      <PnpAtAGlance rows={panel.rows} note={panel.note} />

      <ProcessSection
        id="process"
        kicker="Provincial nomination process"
        title={
          <>
            A targeted path from provincial fit to <span>federal application.</span>
          </>
        }
        copy="The practical sequence usually starts with identifying the right province, then building either a provincial registration or an Express Entry-aligned nomination case before the federal stage."
        image={{
          alt: media.process?.alt ?? "Provincial nomination process for Canadian immigration",
          src: media.process?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_7.jpg",
        }}
        steps={process.steps.map((step, index) => ({
          num: String(index + 1).padStart(2, "0"),
          title: step.title,
          body: step.body,
        }))}
      />

      <FaqSection
        id="faq"
        items={faq.items.map((item) => ({
          q: item.question,
          a: item.answer,
        }))}
      market={market}
      />

      <MediaGallerySection pageId="visas/canada/provincial-nominee-programs" tone="soft" market={market} />

      <OfficialSourcesSection sources={page.officialSources} />

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could a provincial nomination be the right <span>next step for you?</span>
          </>
        }
        copy="Speak with DMC about province targeting, nomination timing, CRS impact and the evidence needed before you enter a stream or accept a nomination."
      />
    </div>
  );
}

export function AtlanticImmigrationProgramPage({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/canada/atlantic-immigration-program");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/canada/atlantic-immigration-program");
  const overview = page.sections.find((section) => section.kind === "overview");
  const eligibility = page.sections.find((section) => section.kind === "eligibility");
  const process = page.sections.find((section) => section.kind === "process");
  const faq = page.sections.find((section) => section.kind === "faq");

  if (!overview || overview.kind !== "overview" || !eligibility || eligibility.kind !== "eligibility" || !process || process.kind !== "process" || !faq || faq.kind !== "faq") {
    throw new Error("Atlantic Immigration Program page content is incomplete.");
  }

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="aip-hero"
        eyebrow={`${marketLabel} market · Atlantic Immigration Program`}
        titlePrefix="An employer-led route into"
        titleAccent="Atlantic Canada"
        subtitle={`Atlantic immigration guidance for professionals and families in the ${marketLabel} market. Explore the designated employer pathway for New Brunswick, Nova Scotia, PEI and Newfoundland & Labrador.`}
        primaryAction={{
          label: "Review the Atlantic Route",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Employer Fit Assessment",
          href: `#eligibility`,
        }}
        proofStats={[
          { value: "4", label: "Atlantic provinces" },
          { value: "0", label: "CRS competition" },
          { value: "1", label: "Employer offer needed" },
        ]}
        disclaimer="The Atlantic program requires a designated employer job offer and provincial endorsement before the federal permanent-residence application."
        scrollTarget="#services"
        scrollLabel="Explore Atlantic route"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Canada", href: marketHref(market, "/visas/canada") },
          { label: "Atlantic Immigration Program" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Pathway type", value: "Employer-driven permanent residence route" },
          { label: "Provinces", value: "NB · NS · PEI · NL" },
          { label: "Core requirement", value: "Designated employer job offer" },
          { label: "Key stage", value: "Provincial endorsement before IRCC filing" },
        ]}
      />
      <InternalAnchorNav
        items={[
          { href: "#services", label: "Overview" },
          { href: "#eligibility", label: "Eligibility" },
          { href: "#process", label: "Process" },
          { href: "#faq", label: "FAQs" },
        ]}
      />

      <SplitContentSection
        id="services"
        media={{
          alt: media.split?.alt ?? "Atlantic Canada immigration route",
          label: media.split?.label ?? "Atlantic Canada employer pathway",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/PR_in_Canada_2.jpg",
        }}
        kicker="Atlantic Immigration Program"
        title={
          <>
            An employer-led route into <span>Atlantic Canada.</span>
          </>
        }
        after={
          <BenefitsGrid
            items={[
              "Permanent-residence route built around a designated employer offer",
              "No CRS competition or federal ranking pool required",
              "Settlement planning is part of the endorsement process",
              "Eligible accompanying family members can be included",
            ]}
          />
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For suitable applicants in ${marketLabel}, the Atlantic route can be worth considering when an employer offer is realistic and a province-specific labour need exists.`,
            "This is not a generic points-based pathway. The job offer, employer designation, provincial endorsement and settlement plan all matter before the federal permanent-residence application can be filed.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Review the Atlantic route"
        title={`Atlantic program guidance for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help you understand whether the Atlantic route is realistic for your profile, especially if you are exploring employer-led migration instead of a pool-based selection model.`,
          "We review the employer-designation requirement, the endorsement step, the settlement-plan expectations and the supporting evidence needed for the federal application.",
        ]}
      />

      <InternalSection tone="soft">
        <div className="ee-shell">
          <SectionHeader
            kicker={overview.heading}
            title={
              <>
                A permanent-residence route built around <span>employer endorsement.</span>
              </>
            }
            copy="The Atlantic program works differently from points-ranked systems because the designated employer and the province are central to the process before IRCC receives the permanent-residence application."
          />
          <RichCopy paragraphs={paragraphsForMarket(overview.paragraphs, market)} />
        </div>
      </InternalSection>

      <InternalSection id="eligibility">
        <div className="ee-shell ee-eligibility-grid">
          <div>
            <SectionHeader
              kicker={eligibility.heading}
              title={
                <>
                  What the Atlantic route expects from the <span>applicant and employer.</span>
                </>
              }
              copy={eligibility.lede ?? "The Atlantic program relies on a genuine designated-employer job offer plus core language, education, settlement and work-history requirements."}
            />
            <CriteriaGrid
              items={eligibility.items.map((item, index) => ({
                num: `${String(index + 1).padStart(2, "0")} · ${item.title}`,
                body: item.body,
              }))}
            />
          </div>
          <div className="rounded-[30px] border border-brand-600/10 bg-brand-50/70 p-6 shadow-sm">
            <span className="ee-kicker">Atlantic route focus</span>
            <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-charcoal">
              Endorsement matters as much as <span className="text-brand-700">eligibility.</span>
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted">
              A full-time, non-seasonal job offer from a designated employer is not just supporting evidence here. It is
              the foundation of the route, and the province must endorse the application before the permanent-residence
              file goes to IRCC.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-brand-600/10 bg-white/85 px-4 py-4 text-sm text-muted">Designated employer participation is mandatory.</div>
              <div className="rounded-2xl border border-brand-600/10 bg-white/85 px-4 py-4 text-sm text-muted">Settlement funds still matter when income is insufficient.</div>
              <div className="rounded-2xl border border-brand-600/10 bg-white/85 px-4 py-4 text-sm text-muted">The federal decision is still made only after the endorsed file is submitted to IRCC.</div>
            </div>
          </div>
        </div>
      </InternalSection>

      <ProcessSection
        id="process"
        kicker="Employer endorsement process"
        title={
          <>
            From designated employer offer to <span>permanent-residence filing.</span>
          </>
        }
        copy="The Atlantic pathway becomes real only when the employer, province and applicant documents all line up in the right sequence."
        image={{
          alt: media.process?.alt ?? "Atlantic Immigration Program process",
          src: media.process?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_7.jpg",
        }}
        steps={process.steps.map((step, index) => ({
          num: String(index + 1).padStart(2, "0"),
          title: step.title,
          body: step.body,
        }))}
      />

      <FaqSection
        id="faq"
        items={faq.items.map((item) => ({
          q: item.question,
          a: item.answer,
        }))}
      market={market}
      />

      <MediaGallerySection pageId="visas/canada/atlantic-immigration-program" tone="soft" market={market} />

      <OfficialSourcesSection sources={page.officialSources} />

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could the Atlantic route suit your <span>employer-led plans?</span>
          </>
        }
        copy="Speak with DMC about Atlantic employer fit, endorsement readiness, and whether this route is more realistic than a points-based option for your situation."
      />
    </div>
  );
}

export function RuralAndNorthernImmigrationPilotPage({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/canada/rural-and-northern-immigration-pilot");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/canada/rural-and-northern-immigration-pilot");
  const overview = page.sections.find((section) => section.kind === "overview");
  const faq = page.sections.find((section) => section.kind === "faq");

  if (!overview || overview.kind !== "overview" || !faq || faq.kind !== "faq") {
    throw new Error("RNIP page content is incomplete.");
  }

  const statusSection = page.sections.find((section) => section.kind === "status");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="rnip-hero"
        eyebrow={`${marketLabel} market · Rural & Northern Immigration Pilot`}
        titlePrefix="Rural community immigration"
        titleAccent="status and successor"
        subtitle={`Current status of the Rural and Northern Immigration Pilot and the Rural Community Immigration Pilot (RCIP) for clients in the ${marketLabel} market.`}
        primaryAction={{
          label: "Explore the RCIP Successor",
          href: `#services`,
        }}
        secondaryAction={{
          label: "Contact DMC",
          href: `#contact`,
        }}
        proofStats={[
          { value: "RCIP", label: "Current successor program" },
          { value: "2024", label: "RNIP concluded" },
          { value: "Employer", label: "Driven model" },
        ]}
        disclaimer="The Rural and Northern Immigration Pilot has concluded. The Rural Community Immigration Pilot (RCIP) is the current successor program."
        scrollTarget="#services"
        scrollLabel="Learn about RCIP"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Canada", href: marketHref(market, "/visas/canada") },
          { label: "Rural & Northern Immigration Pilot" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "RNIP status", value: "Concluded 31 August 2024" },
          { label: "Successor", value: "Rural Community Immigration Pilot (RCIP)" },
          { label: "RCIP model", value: "Employer-driven, community-recommended" },
          { label: "Key difference", value: "No CRS competition; employer offer is central" },
        ]}
      />
      <InternalAnchorNav
        items={[
          { href: "#services", label: "Overview" },
          { href: "#successor", label: "RCIP Successor" },
          { href: "#faq", label: "FAQs" },
        ]}
      />

      {statusSection && statusSection.kind === "status" ? (
        <InternalSection>
          <div className="ee-shell">
            <div className="rounded-[24px] border border-amber-300/40 bg-amber-50/80 px-6 py-5">
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700">{statusSection.label}</span>
              <p className="mt-2 text-sm leading-7 text-charcoal">{statusSection.body}</p>
            </div>
          </div>
        </InternalSection>
      ) : null}

      <SplitContentSection
        id="services"
        media={{
          alt: media.split?.alt ?? "Rural Canada immigration communities",
          label: media.split?.label ?? "Rural community settlement",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="What the RNIP was"
        title={
          <>
            A concluded pilot replaced by <span>the Rural Community Immigration Pilot.</span>
          </>
        }
      >
        <RichCopy paragraphs={paragraphsForMarket(overview.paragraphs, market)} />
      </SplitContentSection>

      <InternalSection id="successor" tone="soft">
        <div className="ee-shell">
          <SectionHeader
            kicker="The Rural Community Immigration Pilot (successor)"
            title={
              <>
                RCIP is the current <span>rural community route.</span>
              </>
            }
            copy="RCIP is a community-driven, employer-based permanent-residence program that replaced the RNIP."
          />
          <RichCopy
            paragraphs={[
              "A candidate needs a genuine, full-time job offer from an employer in a participating rural community, and the community recommends the candidate for the federal application.",
              "Participating communities publish their own criteria, application windows and occupation priorities, and they manage intake differently from one another, so the starting point is always the community's own website.",
            ]}
          />
        </div>
      </InternalSection>

      <FaqSection
        id="faq"
        items={faq.items.map((item) => ({
          q: item.question,
          a: item.answer,
        }))}
      market={market}
      />

      <MediaGallerySection pageId="visas/canada/rural-and-northern-immigration-pilot" tone="soft" market={market} />

      <DisclaimerBand>
        <strong>Important:</strong> The Rural and Northern Immigration Pilot has concluded. The Rural Community Immigration Pilot (RCIP) is the current successor. Immigration decisions are made by the relevant government authority.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could the Rural Community Immigration Pilot <span>suit your profile?</span>
          </>
        }
        copy="Speak with DMC about RCIP community availability, employer fit and the rural-route process."
      />
    </div>
  );
}

export function StudyPermitsPage({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/canada/study-permits");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/canada/study-permits");
  const overview = page.sections.find((section) => section.kind === "overview");
  const faq = page.sections.find((section) => section.kind === "faq");

  if (!overview || overview.kind !== "overview" || !faq || faq.kind !== "faq") {
    throw new Error("Study Permits page content is incomplete.");
  }

  const statusSection = page.sections.find((section) => section.kind === "status");
  const requirementsSection = page.sections.find((section) => section.kind === "requirements");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="study-permits-hero"
        eyebrow={`${marketLabel} market · Canada Study Permits`}
        titlePrefix="Study in Canada with"
        titleAccent="the right permit"
        subtitle={`Current study-permit guidance for students and families in the ${marketLabel} market — from DLI acceptance to Provincial Attestation Letters and post-study work options.`}
        primaryAction={{
          label: "Start Your Study Assessment",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Permit Requirements",
          href: `#requirements`,
        }}
        proofStats={[
          { value: "DLI", label: "Required acceptance" },
          { value: "PAL", label: "Provincial attestation" },
          { value: "24h", label: "Off-campus work limit" },
        ]}
        disclaimer="Study permits are not visas. Entry to Canada also requires an entry document (visa or eTA). SDS has been terminated; regular processing with PAL applies."
        scrollTarget="#services"
        scrollLabel="Explore study permits"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Canada", href: marketHref(market, "/visas/canada") },
          { label: "Study Permits" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "SDS status", value: "Terminated 8 Nov 2024" },
          { label: "Current stream", value: "Regular processing with PAL" },
          { label: "Work rights", value: "24h/week term; full-time breaks" },
          { label: "Funds benchmark", value: "CAD 20,635 (2024–25)" },
        ]}
      />
      <InternalAnchorNav
        items={[
          { href: "#services", label: "Overview" },
          { href: "#requirements", label: "Requirements" },
          { href: "#faq", label: "FAQs" },
        ]}
      />

      {statusSection && statusSection.kind === "status" ? (
        <InternalSection>
          <div className="ee-shell">
            <div className="rounded-[24px] border border-amber-300/40 bg-amber-50/80 px-6 py-5">
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700">{statusSection.label}</span>
              <p className="mt-2 text-sm leading-7 text-charcoal">{statusSection.body}</p>
            </div>
          </div>
        </InternalSection>
      ) : null}

      <SplitContentSection
        id="services"
        media={{
          alt: media.split?.alt ?? "Canada study permit guidance",
          label: media.split?.label ?? "Study in Canada",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="How a study permit works"
        title={
          <>
            A structured route from DLI acceptance to <span>a complete study-permit application.</span>
          </>
        }
      >
        <RichCopy paragraphs={paragraphsForMarket(overview.paragraphs, market)} />
      </SplitContentSection>

      {requirementsSection && requirementsSection.kind === "requirements" ? (
        <InternalSection id="requirements" tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker="Core requirements"
              title={
                <>
                  What IRCC expects from <span>study-permit applicants.</span>
                </>
              }
              copy="A study permit application must demonstrate acceptance, funding, study intent and compliance with current rules."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {requirementsSection.items.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-brand-600/10 bg-white/88 px-5 py-5 shadow-sm">
                  <strong className="block font-display text-lg font-semibold text-charcoal">{item.title}</strong>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </InternalSection>
      ) : null}

      <FaqSection
        id="faq"
        items={faq.items.map((item) => ({
          q: item.question,
          a: item.answer,
        }))}
      market={market}
      />

      <MediaGallerySection pageId="visas/canada/study-permits" tone="soft" market={market} />

      <DisclaimerBand>
        <strong>Important:</strong> The Student Direct Stream (SDS) has been terminated. Study-permit applications are now processed under the regular stream. Immigration decisions are made by IRCC.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Ready to explore <span>study permits in Canada?</span>
          </>
        }
        copy="Speak with DMC about DLI selection, PAL requirements, proof of funds and the study-permit application process."
      />
    </div>
  );
}

export function FamilySponsorshipPage({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/canada/family-sponsorship-parent-grandparent-program");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/canada/family-sponsorship-parent-grandparent-program");
  const overview = page.sections.find((section) => section.kind === "overview");
  const faq = page.sections.find((section) => section.kind === "faq");

  if (!overview || overview.kind !== "overview" || !faq || faq.kind !== "faq") {
    throw new Error("Family Sponsorship page content is incomplete.");
  }

  const requirementsSection = page.sections.find((section) => section.kind === "requirements");
  const panelSection = page.sections.find((section) => section.kind === "panel");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="pgp-hero"
        eyebrow={`${marketLabel} market · Parent & Grandparent Sponsorship`}
        titlePrefix="Bring your parents or grandparents to"
        titleAccent="Canada permanently"
        subtitle={`Family sponsorship guidance for Canadian citizens and permanent residents in the ${marketLabel} market — including the PGP interest-to-sponsor process and the Super Visa alternative.`}
        primaryAction={{
          label: "Discuss Family Sponsorship",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Super Visa Alternative",
          href: `#super-visa`,
        }}
        proofStats={[
          { value: "PGP", label: "Permanent residence route" },
          { value: "Super", label: "Visa alternative" },
          { value: "20yr", label: "Sponsor undertaking" },
        ]}
        disclaimer="The PGP uses an interest-to-sponsor lottery system. Selection is not guaranteed in any given year. The Super Visa provides an alternative while awaiting PGP selection."
        scrollTarget="#services"
        scrollLabel="Explore family sponsorship"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Canada", href: marketHref(market, "/visas/canada") },
          { label: "Parent & Grandparent Sponsorship" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "PGP type", value: "Permanent residence sponsorship" },
          { label: "Selection", value: "Interest-to-sponsor lottery" },
          { label: "Income requirement", value: "MNI for 3 years of tax returns" },
          { label: "Alternative", value: "Super Visa (long-duration visitor)" },
        ]}
      />
      <InternalAnchorNav
        items={[
          { href: "#services", label: "Overview" },
          { href: "#requirements", label: "Requirements" },
          { href: "#super-visa", label: "Super Visa" },
          { href: "#faq", label: "FAQs" },
        ]}
      />

      <SplitContentSection
        id="services"
        media={{
          alt: media.split?.alt ?? "Family sponsorship for Canada immigration",
          label: media.split?.label ?? "Bring family to Canada",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/PR_in_Canada_2.jpg",
        }}
        kicker="Parents and Grandparents Program"
        title={
          <>
            A permanent-residence route for <span>parents and grandparents.</span>
          </>
        }
      >
        <RichCopy paragraphs={paragraphsForMarket(overview.paragraphs, market)} />
      </SplitContentSection>

      {requirementsSection && requirementsSection.kind === "requirements" ? (
        <InternalSection id="requirements" tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker="Sponsor requirements"
              title={
                <>
                  What the sponsor needs to <span>bring parents or grandparents.</span>
                </>
              }
              copy="The PGP requires the sponsor to meet income, status and undertaking requirements before the sponsored family can apply."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {requirementsSection.items.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-brand-600/10 bg-white/88 px-5 py-5 shadow-sm">
                  <strong className="block font-display text-lg font-semibold text-charcoal">{item.title}</strong>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </InternalSection>
      ) : null}

      {panelSection && panelSection.kind === "panel" ? (
        <InternalSection id="super-visa">
          <div className="ee-shell">
            <SectionHeader
              kicker="Super Visa — the flexible alternative"
              title={
                <>
                  Extended visits while <span>awaiting PGP selection.</span>
                </>
              }
              copy="The Super Visa allows parents and grandparents to visit Canada for extended periods while a PGP application is pending or as a standalone option."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {panelSection.rows.map((row) => (
                <div key={row.label} className="rounded-[26px] border border-brand-600/10 bg-white/88 px-5 py-5 shadow-sm">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">{row.label}</span>
                  <strong className="mt-2 block font-display text-xl font-semibold tracking-tight text-charcoal">{row.value}</strong>
                </div>
              ))}
            </div>
            {panelSection.note ? <p className="mt-5 max-w-4xl text-sm leading-7 text-muted">{panelSection.note}</p> : null}
          </div>
        </InternalSection>
      ) : null}

      <FaqSection
        id="faq"
        items={faq.items.map((item) => ({
          q: item.question,
          a: item.answer,
        }))}
      market={market}
      />

      <MediaGallerySection pageId="visas/canada/family-sponsorship-parent-grandparent-program" tone="soft" market={market} />

      <DisclaimerBand>
        <strong>Important:</strong> The PGP uses an interest-to-sponsor lottery. Selection is not guaranteed. The Super Visa is an alternative. Immigration decisions are made by IRCC.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could family sponsorship be the right <span>next step?</span>
          </>
        }
        copy="Speak with DMC about PGP eligibility, income requirements, the Super Visa alternative and the best timing for your family situation."
      />
    </div>
  );
}
