import type { Market } from "@/config/markets";
import { MARKET_LABELS } from "@/config/markets";
import { marketFrom } from "@/lib/i18n/market-copy";
import { RecognitionBandSection } from "@/components/home/RecognitionBandSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";
import { CountriesSection } from "@/components/home/CountriesSection";
import { CredentialsSection } from "@/components/home/CredentialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StoriesSection } from "@/components/home/StoriesSection";
import { StatsBandSection } from "@/components/home/StatsBandSection";
import { ToolsSection } from "@/components/home/ToolsSection";
import { VideoStoriesSection } from "@/components/home/VideoStoriesSection";
import { VisitVisasSection } from "@/components/home/VisitVisasSection";
import { WhyDmcSection } from "@/components/home/WhyDmcSection";

export function HomeSections({ market }: { market: Market }) {
  return (
    <>
      <Hero
        market={market}
        eyebrow={`${MARKET_LABELS[market]} market · Global opportunity network`}
        titlePrefix="Your journey towards a "
        titleSuffix={` ${marketFrom(market)} begins here.`}
        subtitle={`Premium, structured immigration support for professionals, families, students, employers and investors in the ${MARKET_LABELS[market]} market and across Canada, Australia, the United Kingdom and a complete international destination network.`}
      />
      <RecognitionBandSection market={market} />
      <ServicesSection market={market} />
      <CountriesSection market={market} />
      <WhyDmcSection market={market} />
      <CredentialsSection market={market} />
      <VisitVisasSection market={market} />
      <ToolsSection market={market} />
      <ProcessSection market={market} />
      <StatsBandSection market={market} />
      <StoriesSection market={market} />
      <VideoStoriesSection market={market} />
      <ResourcesSection market={market} />
      <FaqSection market={market} />
      <ContactCtaSection market={market} />
    </>
  );
}
