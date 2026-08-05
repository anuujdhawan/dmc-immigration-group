import { MARKET_LABELS, type Market } from "@/config/markets";
import { getPageContent } from "@/content/pages";
import type { PageContent } from "@/content/pages/types";
import { marketHref } from "@/lib/routing/routes";
import { paragraphsForMarket } from "@/lib/i18n/market-copy";
import { pageMedia } from "@/config/page-media";
import { Hero } from "@/components/home/Hero";
import {
  CriteriaGrid,
  DisclaimerBand,
  FaqSection,
  FinalCta,
  InternalAnchorNav,
  InternalBreadcrumbs,
  InternalFactsBar,
  InternalSection,
  LeadFormSection,
  MediaGallerySection,
  ProcessSection,
  RichCopy,
  SectionHeader,
  SplitContentSection,
} from "@/components/pages/internal/InternalPageTemplate";

function requirePage(pageId: string): PageContent {
  const page = getPageContent(pageId);
  if (!page) {
    throw new Error(`Missing page content for ${pageId}`);
  }
  return page;
}

function OfficialSourcesSection({ sources }: { sources: PageContent["officialSources"] }) {
  if (!sources || sources.length === 0) return null;
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
          copy="Use the official government pages below to confirm current requirements and the latest updates."
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

export function SkilledWorkerPage({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/uk/skilled-worker");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/uk/skilled-worker");
  const overview = page.sections.find((section) => section.kind === "overview");
  const requirements = page.sections.find((section) => section.kind === "requirements");
  const panel = page.sections.find((section) => section.kind === "panel");
  const process = page.sections.find((section) => section.kind === "process");
  const faq = page.sections.find((section) => section.kind === "faq");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="uk-sw-hero"
        eyebrow={`${marketLabel} market · UK Skilled Worker Visa`}
        titlePrefix="Skilled employment in the"
        titleAccent="United Kingdom"
        subtitle={`UK Skilled Worker visa guidance for professionals and employers in the ${marketLabel} market — sponsor licence, CoS, salary thresholds and the route to settlement.`}
        primaryAction={{
          label: "Discuss UK Skilled Worker Route",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Salary Thresholds",
          href: `#eligibility`,
        }}
        proofStats={[
          { value: "£41.7k", label: "General minimum salary" },
          { value: "5yr", label: "Visa duration" },
          { value: "ILR", label: "Settlement route" },
        ]}
        disclaimer="The Skilled Worker visa requires a licensed sponsor and meeting salary, English and occupation requirements. Rules and thresholds change periodically."
        scrollTarget="#services"
        scrollLabel="Explore Skilled Worker"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "UK", href: marketHref(market, "/visas/uk") },
          { label: "Skilled Worker" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Route type", value: "Employer-sponsored work visa" },
          { label: "Salary minimum", value: "£41,700 or going rate" },
          { label: "Settlement", value: "ILR after 5 years" },
          { label: "Dependents", value: "Partner and children eligible" },
        ]}
      />
      <InternalAnchorNav
        items={[
          { href: "#services", label: "Overview" },
          { href: "#eligibility", label: "Requirements" },
          { href: "#process", label: "Process" },
          { href: "#faq", label: "FAQs" },
        ]}
      />

      <SplitContentSection
        id="services"
        media={{
          alt: media.split?.alt ?? "UK Skilled Worker visa",
          label: media.split?.label ?? "Skilled Worker pathway",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="UK Skilled Worker Visa"
        title={
          <>
            A sponsored route to <span>UK employment and settlement.</span>
          </>
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For professionals in ${marketLabel} with a UK job offer from a licensed sponsor, the Skilled Worker visa provides a structured route to work and eventually settle in the UK.`,
            "The journey starts with the employer holding a sponsor licence and issuing a Certificate of Sponsorship. The applicant then meets salary, English and occupation requirements before applying for the visa.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Explore UK Skilled Worker route"
        title={`UK visa guidance for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help you understand the Skilled Worker visa requirements, including sponsor licence needs, salary thresholds and the route to settlement.`,
          "We review occupation codes, salary levels, English test requirements and the application process with the licensed employer.",
        ]}
      />

      {overview && overview.kind === "overview" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={overview.heading}
              title={
                <>
                  How the Skilled Worker visa <span>works in practice.</span>
                </>
              }
            />
            <RichCopy paragraphs={paragraphsForMarket(overview.paragraphs, market)} />
          </div>
        </InternalSection>
      ) : null}

      {requirements && requirements.kind === "requirements" ? (
        <InternalSection id="eligibility">
          <div className="ee-shell">
            <SectionHeader
              kicker={requirements.heading}
              title={
                <>
                  What the visa <span>requires.</span>
                </>
              }
              copy="A successful Skilled Worker application depends on meeting all requirements simultaneously."
            />
            <CriteriaGrid
              items={requirements.items.map((item, index) => ({
                num: `${String(index + 1).padStart(2, "0")} · ${item.title}`,
                body: item.body,
              }))}
            />
          </div>
        </InternalSection>
      ) : null}

      {panel && panel.kind === "panel" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={panel.heading}
              title={
                <>
                  Salary thresholds and <span>key figures.</span>
                </>
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              {panel.rows.map((row) => (
                <div key={row.label} className="rounded-[26px] border border-brand-600/10 bg-white/88 px-5 py-5 shadow-sm">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">{row.label}</span>
                  <strong className="mt-2 block font-display text-xl font-semibold tracking-tight text-charcoal">{row.value}</strong>
                </div>
              ))}
            </div>
            {panel.note ? <p className="mt-5 max-w-4xl text-sm leading-7 text-muted">{panel.note}</p> : null}
          </div>
        </InternalSection>
      ) : null}

      {process && process.kind === "process" ? (
        <ProcessSection
          id="process"
          kicker="Sponsorship journey"
          title={
            <>
              From job offer to <span>UK work visa.</span>
            </>
          }
          copy="The Skilled Worker process involves employer sponsorship, salary verification, English testing and the visa application."
          image={{
            alt: media.process?.alt ?? "UK Skilled Worker visa process",
            src: media.process?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_7.jpg",
          }}
          steps={process.steps.map((step, index) => ({
            num: String(index + 1).padStart(2, "0"),
            title: step.title,
            body: step.body,
          }))}
        />
      ) : null}

      {faq && faq.kind === "faq" ? (
        <FaqSection
          id="faq"
          items={faq.items.map((item) => ({
            q: item.question,
            a: item.answer,
          }))}
        market={market}
        />
      ) : null}

      <MediaGallerySection pageId={page.id} tone="soft" market={market} />

      <OfficialSourcesSection sources={page.officialSources} />

      <DisclaimerBand>
        <strong>Important:</strong> The Skilled Worker visa requires employer sponsorship and meeting current salary, English and occupation requirements. Rules and thresholds change periodically. Immigration decisions are made by the UK Government.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could the Skilled Worker route suit your <span>UK career plans?</span>
          </>
        }
        copy="Speak with DMC about sponsor eligibility, salary thresholds, English requirements and the route to UK settlement."
      />
    </div>
  );
}

export function SkilledWorkerDependentPage({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/uk/skilled-worker-dependent");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/uk/skilled-worker-dependent");
  const overview = page.sections.find((section) => section.kind === "overview");
  const eligibility = page.sections.find((section) => section.kind === "eligibility");
  const panel = page.sections.find((section) => section.kind === "panel");
  const process = page.sections.find((section) => section.kind === "process");
  const faq = page.sections.find((section) => section.kind === "faq");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="uk-sw-dep-hero"
        eyebrow={`${marketLabel} market · Skilled Worker Dependent Visa`}
        titlePrefix="Bring your family to the"
        titleAccent="United Kingdom"
        subtitle={`Dependent visa guidance for partners and children of UK Skilled Worker visa holders in the ${marketLabel} market — work rights, study rights and the shared path to settlement.`}
        primaryAction={{
          label: "Discuss Dependent Visa Options",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Eligibility Criteria",
          href: `#eligibility`,
        }}
        proofStats={[
          { value: "Work", label: "Unrestricted rights" },
          { value: "Study", label: "Any level permitted" },
          { value: "ILR", label: "Shared settlement path" },
        ]}
        disclaimer="Dependent visas are linked to the main applicant's Skilled Worker visa. The main applicant's visa must be valid or applied for at the same time."
        scrollTarget="#services"
        scrollLabel="Explore dependent visa"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "UK", href: marketHref(market, "/visas/uk") },
          { label: "Skilled Worker Dependent" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Visa type", value: "Dependent on main applicant" },
          { label: "Work rights", value: "Unrestricted — any employer" },
          { label: "English test", value: "Not required" },
          { label: "Settlement", value: "ILR after 5 years" },
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
          alt: media.split?.alt ?? "UK Skilled Worker dependent visa",
          label: media.split?.label ?? "Family settlement in the UK",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/PR_in_Canada_2.jpg",
        }}
        kicker="Skilled Worker Dependent Visa"
        title={
          <>
            Join your family member in the <span>United Kingdom.</span>
          </>
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For families of Skilled Worker visa holders in ${marketLabel}, the dependent visa provides a route to join the main applicant in the UK with full work and study rights.`,
            "Dependent partners can work in any role without separate sponsorship, study at any level, and their time in the UK counts toward settlement after five qualifying years.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Explore dependent visa options"
        title={`Dependent visa guidance for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help you understand the dependent visa requirements, relationship evidence and the application process.`,
          "We review relationship documentation, main applicant status and the dependent application requirements.",
        ]}
      />

      {overview && overview.kind === "overview" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={overview.heading}
              title={
                <>
                  Who can apply as a <span>dependent.</span>
                </>
              }
            />
            <RichCopy paragraphs={paragraphsForMarket(overview.paragraphs, market)} />
          </div>
        </InternalSection>
      ) : null}

      {eligibility && eligibility.kind === "eligibility" ? (
        <InternalSection id="eligibility">
          <div className="ee-shell">
            <SectionHeader
              kicker={eligibility.heading}
              title={
                <>
                  What the dependent visa <span>requires.</span>
                </>
              }
              copy="The dependent application must meet relationship, status and maintenance requirements."
            />
            <CriteriaGrid
              items={eligibility.items.map((item, index) => ({
                num: `${String(index + 1).padStart(2, "0")} · ${item.title}`,
                body: item.body,
              }))}
            />
          </div>
        </InternalSection>
      ) : null}

      {panel && panel.kind === "panel" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={panel.heading}
              title={
                <>
                  Dependent visa at a <span>glance.</span>
                </>
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              {panel.rows.map((row) => (
                <div key={row.label} className="rounded-[26px] border border-brand-600/10 bg-white/88 px-5 py-5 shadow-sm">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">{row.label}</span>
                  <strong className="mt-2 block font-display text-xl font-semibold tracking-tight text-charcoal">{row.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </InternalSection>
      ) : null}

      {process && process.kind === "process" ? (
        <ProcessSection
          id="process"
          kicker="Dependent application"
          title={
            <>
              From eligibility to <span>UK dependent visa.</span>
            </>
          }
          copy="The dependent application process is linked to the main applicant's status and requires relationship evidence."
          image={{
            alt: media.process?.alt ?? "UK dependent visa process",
            src: media.process?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_7.jpg",
          }}
          steps={process.steps.map((step, index) => ({
            num: String(index + 1).padStart(2, "0"),
            title: step.title,
            body: step.body,
          }))}
        />
      ) : null}

      {faq && faq.kind === "faq" ? (
        <FaqSection
          id="faq"
          items={faq.items.map((item) => ({
            q: item.question,
            a: item.answer,
          }))}
        market={market}
        />
      ) : null}

      <MediaGallerySection pageId={page.id} tone="soft" market={market} />

      <OfficialSourcesSection sources={page.officialSources} />

      <DisclaimerBand>
        <strong>Important:</strong> Dependent visas are linked to the main applicant&apos;s Skilled Worker visa. The main applicant&apos;s visa must remain valid. Immigration decisions are made by the UK Government.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could the dependent visa help your family <span>join you in the UK?</span>
          </>
        }
        copy="Speak with DMC about dependent visa eligibility, relationship evidence, work rights and the route to UK settlement."
      />
    </div>
  );
}
