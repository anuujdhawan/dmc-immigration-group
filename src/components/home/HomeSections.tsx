import type { Market } from "@/config/markets";
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
      <Hero market={market} />
      <RecognitionBandSection />
      <ServicesSection market={market} />
      <CountriesSection />
      <WhyDmcSection market={market} />
      <CredentialsSection market={market} />
      <VisitVisasSection market={market} />
      <ToolsSection market={market} />
      <ProcessSection />
      <StatsBandSection />
      <StoriesSection />
      <VideoStoriesSection />
      <ResourcesSection market={market} />
      <FaqSection market={market} />
      <ContactCtaSection market={market} />
    </>
  );
}
