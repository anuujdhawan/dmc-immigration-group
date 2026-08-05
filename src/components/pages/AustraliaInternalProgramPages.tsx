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
  FeatureList,
  InternalAnchorNav,
  InternalBreadcrumbs,
  InternalFactsBar,
  InternalSection,
  LeadFormSection,
  MediaGallerySection,
  ProcessSection,
  ProgramCards,
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
          copy="Use the official program pages below to confirm current requirements and the latest government updates."
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

export function SkilledIndependent189Page({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/australia/skilled-independent-189");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/australia/skilled-independent-189");
  const overview = page.sections.find((section) => section.kind === "overview");
  const eligibility = page.sections.find((section) => section.kind === "eligibility");
  const process = page.sections.find((section) => section.kind === "process");
  const faq = page.sections.find((section) => section.kind === "faq");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="au-189-hero"
        eyebrow={`${marketLabel} market · Skilled Independent Visa (189)`}
        titlePrefix="Australia's independent"
        titleAccent="points-tested route"
        subtitle={`Skilled Independent visa guidance for professionals in the ${marketLabel} market — points, occupation list, skills assessment and invitation rounds.`}
        primaryAction={{
          label: "Start Your Points Assessment",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Eligibility Criteria",
          href: `#eligibility`,
        }}
        proofStats={[
          { value: "65", label: "Minimum points" },
          { value: "189", label: "Subclass" },
          { value: "Direct", label: "Permanent residence" },
        ]}
        disclaimer="The Skilled Independent visa is points-tested and subject to invitation rounds. There is no guaranteed invitation score."
        scrollTarget="#services"
        scrollLabel="Explore 189 visa"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Australia", href: marketHref(market, "/visas/australia") },
          { label: "Skilled Independent (189)" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Visa type", value: "Permanent residence" },
          { label: "Points test", value: "Minimum 65 points" },
          { label: "Nomination", value: "Not required" },
          { label: "Processing", value: "Points-ranked invitations" },
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
          alt: media.split?.alt ?? "Skilled Independent visa Australia",
          label: media.split?.label ?? "189 visa pathway",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="Skilled Independent Visa (189)"
        title={
          <>
            A points-tested route to <span>Australian permanent residence.</span>
          </>
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For eligible professionals in ${marketLabel}, the 189 visa provides a direct permanent-residence pathway without requiring state or employer nomination.`,
            "Applicants must score at least 65 points on the points test, have a suitable skills assessment for an eligible occupation, and receive an invitation to apply through the SkillSelect system.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Assess your 189 eligibility"
        title={`189 visa guidance for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help you understand whether the 189 visa fits your profile, including points calculation, skills assessment requirements and invitation-round strategy.`,
          "We review occupation eligibility, language results, work experience and education credentials against the current points grid.",
        ]}
      />

      {overview && overview.kind === "overview" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={overview.heading}
              title={
                <>
                  How the 189 visa <span>works in practice.</span>
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
                  What shapes your <span>189 eligibility.</span>
                </>
              }
              copy={eligibility.lede}
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

      {process && process.kind === "process" ? (
        <ProcessSection
          id="process"
          kicker="Application process"
          title={
            <>
              From skills assessment to <span>permanent residence.</span>
            </>
          }
          copy="The 189 process involves skills assessment, EOI submission, invitation rounds and the permanent-residence application."
          image={{
            alt: media.process?.alt ?? "189 visa process",
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
        <strong>Important:</strong> The 189 visa is points-tested and subject to invitation rounds. There is no guaranteed invitation score. Immigration decisions are made by the Australian Government.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could the 189 visa be the right <span>route for you?</span>
          </>
        }
        copy="Speak with DMC about points calculation, skills assessment, occupation eligibility and the invitation-round strategy."
      />
    </div>
  );
}

export function SkilledNominated190Page({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/australia/skilled-nominated-190");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/australia/skilled-nominated-190");
  const overview = page.sections.find((section) => section.kind === "overview");
  const eligibility = page.sections.find((section) => section.kind === "eligibility");
  const process = page.sections.find((section) => section.kind === "process");
  const faq = page.sections.find((section) => section.kind === "faq");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="au-190-hero"
        eyebrow={`${marketLabel} market · Skilled Nominated Visa (190)`}
        titlePrefix="State-nominated"
        titleAccent="permanent residence"
        subtitle={`Skilled Nominated visa guidance for professionals in the ${marketLabel} market — state and territory nomination, 5 extra points and direct PR.`}
        primaryAction={{
          label: "Check Nomination Eligibility",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Nomination Criteria",
          href: `#eligibility`,
        }}
        proofStats={[
          { value: "+5", label: "Nomination points" },
          { value: "190", label: "Subclass" },
          { value: "State", label: "Nomination required" },
        ]}
        disclaimer="The 190 visa requires state or territory nomination. Nomination criteria and occupation lists vary by jurisdiction."
        scrollTarget="#services"
        scrollLabel="Explore 190 visa"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Australia", href: marketHref(market, "/visas/australia") },
          { label: "Skilled Nominated (190)" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Visa type", value: "Permanent residence" },
          { label: "Nomination", value: "State or territory required" },
          { label: "Points bonus", value: "+5 points for nomination" },
          { label: "Pathway", value: "Direct to PR" },
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
          alt: media.split?.alt ?? "Skilled Nominated visa Australia",
          label: media.split?.label ?? "190 visa pathway",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="Skilled Nominated Visa (190)"
        title={
          <>
            State-nominated route to <span>Australian permanent residence.</span>
          </>
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For professionals in ${marketLabel} who can secure state or territory nomination, the 190 visa provides a direct permanent-residence pathway with 5 additional points.`,
            "Each state and territory publishes its own nomination criteria, occupation lists and application windows, making the nomination strategy occupation- and jurisdiction-specific.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Explore 190 nomination"
        title={`190 visa guidance for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help you compare state nomination criteria, understand occupation lists and develop a nomination strategy.`,
          "We review your profile against multiple state and territory programs to identify the most realistic nomination pathway.",
        ]}
      />

      {overview && overview.kind === "overview" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={overview.heading}
              title={
                <>
                  How state nomination <span>works for the 190.</span>
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
                  What each state <span>looks for.</span>
                </>
              }
              copy={eligibility.lede}
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

      {process && process.kind === "process" ? (
        <ProcessSection
          id="process"
          kicker="Nomination and application process"
          title={
            <>
              From state nomination to <span>permanent residence.</span>
            </>
          }
          copy="The 190 process involves skills assessment, state nomination application, invitation and the federal PR application."
          image={{
            alt: media.process?.alt ?? "190 visa process",
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
        <strong>Important:</strong> The 190 visa requires state or territory nomination. Nomination criteria and occupation lists vary by jurisdiction and can change. Immigration decisions are made by the Australian Government.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could state nomination strengthen your <span>Australian migration path?</span>
          </>
        }
        copy="Speak with DMC about state nomination criteria, occupation eligibility and the 190 application process."
      />
    </div>
  );
}

export function SkilledWorkRegional491Page({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/australia/skilled-work-regional-491");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/australia/skilled-work-regional-491");
  const overview = page.sections.find((section) => section.kind === "overview");
  const eligibility = page.sections.find((section) => section.kind === "eligibility");
  const process = page.sections.find((section) => section.kind === "process");
  const faq = page.sections.find((section) => section.kind === "faq");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="au-491-hero"
        eyebrow={`${marketLabel} market · Skilled Work Regional Visa (491)`}
        titlePrefix="Regional provisional"
        titleAccent="pathway to PR"
        subtitle={`Skilled Work Regional visa guidance for professionals in the ${marketLabel} market — 15 extra points, regional settlement and the pathway to permanent residence.`}
        primaryAction={{
          label: "Explore Regional Options",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Regional Pathway Details",
          href: `#services`,
        }}
        proofStats={[
          { value: "+15", label: "Regional points" },
          { value: "491", label: "Subclass" },
          { value: "5yr", label: "Provisional visa" },
        ]}
        disclaimer="The 491 visa is a provisional visa requiring regional living and working. It provides a pathway to permanent residence through the 191 visa."
        scrollTarget="#services"
        scrollLabel="Explore 491 visa"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Australia", href: marketHref(market, "/visas/australia") },
          { label: "Skilled Work Regional (491)" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Visa type", value: "Provisional (5 years)" },
          { label: "Points bonus", value: "+15 for regional" },
          { label: "PR pathway", value: "Through the 191 visa" },
          { label: "Living requirement", value: "Regional Australia" },
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
          alt: media.split?.alt ?? "Regional Australia immigration",
          label: media.split?.label ?? "491 regional pathway",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="Skilled Work Regional Visa (491)"
        title={
          <>
            A regional route to <span>Australian permanent residence.</span>
          </>
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For professionals in ${marketLabel} willing to live and work in regional Australia, the 491 visa provides a provisional pathway with 15 additional points and a route to permanent residence.`,
            "Regional living and working conditions apply for the duration of the provisional visa, and the 191 visa provides the permanent-residence step after the required period.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Explore 491 regional route"
        title={`491 visa guidance for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help you understand the regional living requirements, points advantages and the pathway from 491 to permanent residence.`,
          "We review occupation eligibility, regional area requirements and the 191 transition criteria.",
        ]}
      />

      {overview && overview.kind === "overview" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={overview.heading}
              title={
                <>
                  How the 491 regional <span>visa works.</span>
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
                  Regional living and <span>working requirements.</span>
                </>
              }
              copy={eligibility.lede}
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

      {process && process.kind === "process" ? (
        <ProcessSection
          id="process"
          kicker="491 to 191 pathway"
          title={
            <>
              From provisional visa to <span>permanent residence.</span>
            </>
          }
          copy="The 491 visa is a stepping stone to permanent residence through the 191 visa after meeting regional living and working requirements."
          image={{
            alt: media.process?.alt ?? "491 to 191 pathway",
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
        <strong>Important:</strong> The 491 visa requires regional living and working. The 191 visa provides the permanent-residence pathway after meeting the required conditions. Immigration decisions are made by the Australian Government.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could the regional pathway suit your <span>Australian migration plans?</span>
          </>
        }
        copy="Speak with DMC about regional eligibility, the 491 to 191 pathway and the living and working requirements."
      />
    </div>
  );
}

export function PermanentResidence191Page({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/australia/permanent-residence-skilled-regional-191");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/australia/permanent-residence-skilled-regional-191");
  const overview = page.sections.find((section) => section.kind === "overview");
  const eligibility = page.sections.find((section) => section.kind === "eligibility");
  const faq = page.sections.find((section) => section.kind === "faq");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="au-191-hero"
        eyebrow={`${marketLabel} market · Permanent Residence (191)`}
        titlePrefix="From provisional to"
        titleAccent="permanent residence"
        subtitle={`Permanent Residence Skilled Regional visa guidance for 491 and 494 holders in the ${marketLabel} market.`}
        primaryAction={{
          label: "Check 191 Eligibility",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Transition Requirements",
          href: `#eligibility`,
        }}
        proofStats={[
          { value: "191", label: "Subclass" },
          { value: "491/494", label: "Prerequisite visas" },
          { value: "PR", label: "Permanent residence" },
        ]}
        disclaimer="The 191 visa is the permanent-residence step for 491 and 494 visa holders. Specific living and working conditions must be met."
        scrollTarget="#services"
        scrollLabel="Explore 191 visa"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Australia", href: marketHref(market, "/visas/australia") },
          { label: "Permanent Residence (191)" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Visa type", value: "Permanent residence" },
          { label: "Prerequisite", value: "491 or 494 provisional visa" },
          { label: "Income requirement", value: "ATO notices (3 of 5 years)" },
          { label: "Outcome", value: "Permanent residence" },
        ]}
      />
      <InternalAnchorNav
        items={[
          { href: "#services", label: "Overview" },
          { href: "#eligibility", label: "Eligibility" },
          { href: "#faq", label: "FAQs" },
        ]}
      />

      <SplitContentSection
        id="services"
        media={{
          alt: media.split?.alt ?? "Permanent residence through 191 visa",
          label: media.split?.label ?? "191 PR pathway",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/PR_in_Canada_2.jpg",
        }}
        kicker="Permanent Residence (191)"
        title={
          <>
            The permanent-residence step for <span>regional provisional visa holders.</span>
          </>
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For 491 and 494 visa holders in ${marketLabel} who have met the regional living and working requirements, the 191 visa provides the permanent-residence outcome.`,
            "The income requirement was removed in June 2023, and applicants now need to demonstrate ATO notices of assessment for three of the five years on their provisional visa.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="191 transition guidance"
        title={`191 visa support for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help you understand the 191 transition requirements, including the ATO notice requirements and the application process.`,
          "We review your provisional visa history, income documentation and the 191 application requirements.",
        ]}
      />

      {overview && overview.kind === "overview" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={overview.heading}
              title={
                <>
                  How the 191 visa <span>transition works.</span>
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
                  What the 191 visa <span>requires.</span>
                </>
              }
              copy={eligibility.lede}
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
        <strong>Important:</strong> The 191 visa requires meeting specific conditions on a 491 or 494 provisional visa. Immigration decisions are made by the Australian Government.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Ready to transition from provisional to <span>permanent residence?</span>
          </>
        }
        copy="Speak with DMC about the 191 transition requirements, ATO documentation and the permanent-residence application."
      />
    </div>
  );
}

export function EmployerSponsored482Page({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/australia/employer-sponsored-482");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/australia/employer-sponsored-482");
  const overview = page.sections.find((section) => section.kind === "overview");
  const eligibility = page.sections.find((section) => section.kind === "eligibility");
  const process = page.sections.find((section) => section.kind === "process");
  const faq = page.sections.find((section) => section.kind === "faq");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="au-482-hero"
        eyebrow={`${marketLabel} market · Skills in Demand Visa (482)`}
        titlePrefix="Employer-sponsored"
        titleAccent="skilled migration"
        subtitle={`Skills in Demand visa guidance for professionals and employers in the ${marketLabel} market — Core, Specialist and Essential streams.`}
        primaryAction={{
          label: "Discuss Employer Sponsorship",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Stream Requirements",
          href: `#eligibility`,
        }}
        proofStats={[
          { value: "482", label: "Subclass" },
          { value: "3", label: "Streams" },
          { value: "PR", label: "Pathway available" },
        ]}
        disclaimer="The 482 visa requires employer sponsorship. Different streams have different salary thresholds and occupation requirements."
        scrollTarget="#services"
        scrollLabel="Explore 482 visa"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Australia", href: marketHref(market, "/visas/australia") },
          { label: "Employer Sponsored (482)" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Visa type", value: "Temporary (provisional)" },
          { label: "Streams", value: "Core · Specialist · Essential" },
          { label: "PR pathway", value: "Through 186 or 187" },
          { label: "Sponsorship", value: "Employer required" },
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
          alt: media.split?.alt ?? "Employer sponsored visa Australia",
          label: media.split?.label ?? "482 visa pathway",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="Skills in Demand Visa (482)"
        title={
          <>
            Employer-sponsored route to <span>Australian skilled migration.</span>
          </>
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For employers and skilled workers in ${marketLabel}, the 482 visa provides a temporary pathway with a route to permanent residence through the 186 or 187 visas.`,
            "The Skills in Demand visa replaced the Temporary Skill Shortage (TSS) 482 in December 2024, with three streams: Core, Specialist and Essential, each with different salary thresholds and requirements.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Explore employer sponsorship"
        title={`482 visa guidance for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help employers and workers understand the 482 visa streams, salary thresholds and the pathway to permanent residence.`,
          "We review occupation eligibility, salary requirements, employer obligations and the transition to permanent residence.",
        ]}
      />

      {overview && overview.kind === "overview" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={overview.heading}
              title={
                <>
                  How the 482 Skills in Demand <span>visa works.</span>
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
                  Stream-specific <span>requirements.</span>
                </>
              }
              copy={eligibility.lede}
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

      {process && process.kind === "process" ? (
        <ProcessSection
          id="process"
          kicker="Employer sponsorship process"
          title={
            <>
              From nomination to <span>visa grant.</span>
            </>
          }
          copy="The 482 process involves employer nomination, skills assessment where required, and the visa application."
          image={{
            alt: media.process?.alt ?? "482 visa process",
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
        <strong>Important:</strong> The 482 visa requires employer sponsorship. Different streams have different requirements. Immigration decisions are made by the Australian Government.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could employer sponsorship be the right <span>pathway for you?</span>
          </>
        }
        copy="Speak with DMC about 482 streams, salary thresholds, employer obligations and the pathway to permanent residence."
      />
    </div>
  );
}

export function EmployerNomination186Page({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/australia/employer-nomination-scheme-186");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/australia/employer-nomination-scheme-186");
  const overview = page.sections.find((section) => section.kind === "overview");
  const eligibility = page.sections.find((section) => section.kind === "eligibility");
  const process = page.sections.find((section) => section.kind === "process");
  const faq = page.sections.find((section) => section.kind === "faq");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="au-186-hero"
        eyebrow={`${marketLabel} market · Employer Nomination Scheme (186)`}
        titlePrefix="Direct employer-sponsored"
        titleAccent="permanent residence"
        subtitle={`Employer Nomination Scheme guidance for professionals and employers in the ${marketLabel} market — direct entry, TRT and labour agreement streams.`}
        primaryAction={{
          label: "Discuss 186 Eligibility",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Stream Options",
          href: `#eligibility`,
        }}
        proofStats={[
          { value: "186", label: "Subclass" },
          { value: "3", label: "Streams" },
          { value: "PR", label: "Direct permanent residence" },
        ]}
        disclaimer="The 186 visa requires employer nomination. Different streams have different eligibility criteria and pathways."
        scrollTarget="#services"
        scrollLabel="Explore 186 visa"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Australia", href: marketHref(market, "/visas/australia") },
          { label: "Employer Nomination (186)" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Visa type", value: "Permanent residence" },
          { label: "Streams", value: "Direct Entry · TRT · Labour" },
          { label: "Nomination", value: "Employer required" },
          { label: "Outcome", value: "Direct to PR" },
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
          alt: media.split?.alt ?? "Employer Nomination Scheme Australia",
          label: media.split?.label ?? "186 visa pathway",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="Employer Nomination Scheme (186)"
        title={
          <>
            Direct employer-sponsored <span>permanent residence.</span>
          </>
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For employers and skilled workers in ${marketLabel}, the 186 visa provides a direct permanent-residence pathway through employer nomination.`,
            "The three streams — Direct Entry, Temporary Residence Transition and Labour Agreement — offer different routes depending on the applicant's circumstances and the employer's situation.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Explore 186 nomination"
        title={`186 visa guidance for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help employers and workers understand the 186 visa streams, nomination requirements and the permanent-residence application process.`,
          "We review occupation eligibility, skills assessment requirements, employer obligations and the different stream options.",
        ]}
      />

      {overview && overview.kind === "overview" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={overview.heading}
              title={
                <>
                  How the 186 employer <span>nomination works.</span>
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
                  Stream-specific <span>eligibility.</span>
                </>
              }
              copy={eligibility.lede}
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

      {process && process.kind === "process" ? (
        <ProcessSection
          id="process"
          kicker="186 application process"
          title={
            <>
              From employer nomination to <span>permanent residence.</span>
            </>
          }
          copy="The 186 process involves employer nomination, skills assessment where required and the permanent-residence application."
          image={{
            alt: media.process?.alt ?? "186 visa process",
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
        <strong>Important:</strong> The 186 visa requires employer nomination. Different streams have different eligibility criteria. Immigration decisions are made by the Australian Government.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could the 186 scheme be the right <span>employer-sponsored route?</span>
          </>
        }
        copy="Speak with DMC about 186 streams, nomination requirements and the direct permanent-residence pathway."
      />
    </div>
  );
}

export function NationalInnovationVisa858Page({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/australia/national-innovation-visa-858");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/australia/national-innovation-visa-858");
  const overview = page.sections.find((section) => section.kind === "overview");
  const eligibility = page.sections.find((section) => section.kind === "eligibility");
  const faq = page.sections.find((section) => section.kind === "faq");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="au-858-hero"
        eyebrow={`${marketLabel} market · National Innovation Visa (858)`}
        titlePrefix="Internationally recognised"
        titleAccent="talent and innovation"
        subtitle={`National Innovation visa guidance for internationally recognised talent in the ${marketLabel} market — invitation-only permanent residence.`}
        primaryAction={{
          label: "Discuss 858 Eligibility",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Talent Criteria",
          href: `#eligibility`,
        }}
        proofStats={[
          { value: "858", label: "Subclass" },
          { value: "Invite", label: "Only" },
          { value: "PR", label: "Permanent residence" },
        ]}
        disclaimer="The 858 visa is invitation-only for internationally recognised talent. A nominator in the same field is required."
        scrollTarget="#services"
        scrollLabel="Explore 858 visa"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Australia", href: marketHref(market, "/visas/australia") },
          { label: "National Innovation Visa (858)" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Visa type", value: "Permanent residence" },
          { label: "Selection", value: "Invitation only" },
          { label: "Nominator", value: "Required in same field" },
          { label: "Outcome", value: "Direct to PR" },
        ]}
      />
      <InternalAnchorNav
        items={[
          { href: "#services", label: "Overview" },
          { href: "#eligibility", label: "Eligibility" },
          { href: "#faq", label: "FAQs" },
        ]}
      />

      <SplitContentSection
        id="services"
        media={{
          alt: media.split?.alt ?? "National Innovation Visa Australia",
          label: media.split?.label ?? "858 visa pathway",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="National Innovation Visa (858)"
        title={
          <>
            Invitation-only route for <span>internationally recognised talent.</span>
          </>
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For internationally recognised talent in ${marketLabel}, the 858 visa provides an invitation-only permanent-residence pathway for outstanding achievements in their field.`,
            "A nominator who is an established expert in the same field is required, and applicants must demonstrate they are among the top-tier in their profession internationally.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Explore 858 talent pathway"
        title={`858 visa guidance for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help you understand the 858 visa eligibility criteria, nominator requirements and the invitation process.`,
          "We review your achievements, field of expertise and the nominator requirements for the National Innovation visa.",
        ]}
      />

      {overview && overview.kind === "overview" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={overview.heading}
              title={
                <>
                  How the 858 talent <span>visa works.</span>
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
                  What makes a <strong>candidate eligible.</strong>
                </>
              }
              copy={eligibility.lede}
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
        <strong>Important:</strong> The 858 visa is invitation-only for internationally recognised talent. A nominator is required. Immigration decisions are made by the Australian Government.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could the National Innovation Visa suit your <span>international profile?</span>
          </>
        }
        copy="Speak with DMC about 858 eligibility, nominator requirements and the invitation process."
      />
    </div>
  );
}

export function StateTerritoryNominationsPage({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const page = requirePage("visas/australia/state-territory-nominations");
  const marketLabel = MARKET_LABELS[market];
  const media = pageMedia("visas/australia/state-territory-nominations");
  const overview = page.sections.find((section) => section.kind === "overview");
  const eligibility = page.sections.find((section) => section.kind === "eligibility");
  const faq = page.sections.find((section) => section.kind === "faq");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="au-stn-hero"
        eyebrow={`${marketLabel} market · State & Territory Nominations`}
        titlePrefix="State and territory"
        titleAccent="nomination programs"
        subtitle={`State and territory nomination guidance for professionals in the ${marketLabel} market — 190 and 491 nomination pathways across Australian jurisdictions.`}
        primaryAction={{
          label: "Explore State Nomination",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Nomination Criteria",
          href: `#eligibility`,
        }}
        proofStats={[
          { value: "8", label: "States & territories" },
          { value: "190/491", label: "Nomination pathways" },
          { value: "Varies", label: "By jurisdiction" },
        ]}
        disclaimer="State and territory nomination criteria, occupation lists and application windows vary by jurisdiction and can change."
        scrollTarget="#services"
        scrollLabel="Explore nominations"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Australia", href: marketHref(market, "/visas/australia") },
          { label: "State & Territory Nominations" },
        ]}
      />
      <InternalFactsBar
        items={[
          { label: "Nomination types", value: "190 (PR) · 491 (provisional)" },
          { label: "Jurisdictions", value: "All states and territories" },
          { label: "Criteria", value: "Set per jurisdiction" },
          { label: "Occupation lists", value: "Vary by state/territory" },
        ]}
      />
      <InternalAnchorNav
        items={[
          { href: "#services", label: "Overview" },
          { href: "#eligibility", label: "How nomination works" },
          { href: "#faq", label: "FAQs" },
        ]}
      />

      <SplitContentSection
        id="services"
        media={{
          alt: media.split?.alt ?? "State and territory nominations Australia",
          label: media.split?.label ?? "Nomination pathways",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        kicker="State & Territory Nominations"
        title={
          <>
            How Australian jurisdictions <span>nominate skilled workers.</span>
          </>
        }
      >
        <RichCopy
          paragraphs={[
            `${page.lede} For professionals in ${marketLabel} seeking state or territory nomination, each Australian jurisdiction publishes its own criteria, occupation lists and application windows.`,
            "Nomination through the 190 visa provides direct permanent residence with 5 additional points, while the 491 visa provides a provisional pathway with 15 additional points and a route to permanent residence through the 191.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Explore nomination options"
        title={`Nomination guidance for clients in ${marketLabel}.`}
        copy={[
          `The DMC ${marketLabel} team can help you compare state and territory nomination criteria, identify the most realistic pathway and develop a nomination strategy.`,
          "We review your profile against multiple jurisdictions to find the best fit for your occupation, experience and settlement goals.",
        ]}
      />

      {overview && overview.kind === "overview" ? (
        <InternalSection tone="soft">
          <div className="ee-shell">
            <SectionHeader
              kicker={overview.heading}
              title={
                <>
                  How nomination works <span>across jurisdictions.</span>
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
                  What each jurisdiction <span>considers.</span>
                </>
              }
              copy={eligibility.lede}
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
        <strong>Important:</strong> State and territory nomination criteria, occupation lists and application windows vary by jurisdiction and can change without notice. Immigration decisions are made by the Australian Government.
      </DisclaimerBand>

      <FinalCta
        market={market}
        phoneHref={phoneHref}
        phoneLabel={phoneLabel}
        title={
          <>
            Could state or territory nomination strengthen your <span>Australian application?</span>
          </>
        }
        copy="Speak with DMC about nomination criteria, occupation eligibility and the 190/491 application process."
      />
    </div>
  );
}
