import type { Market } from "@/config/markets";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";
import { CountriesSection } from "@/components/home/CountriesSection";
import { CredentialsSection } from "@/components/home/CredentialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StoriesSection } from "@/components/home/StoriesSection";
import { ToolsSection } from "@/components/home/ToolsSection";
import { VideoStoriesSection } from "@/components/home/VideoStoriesSection";
import { VisitVisasSection } from "@/components/home/VisitVisasSection";
import { WhyDmcSection } from "@/components/home/WhyDmcSection";

export function HomeSections({ market }: { market: Market }) {
  return (
    <>
      <Hero market={market} />
      <ServicesSection market={market} />
      <CountriesSection market={market} />
      <WhyDmcSection market={market} />
      <CredentialsSection market={market} />
      <VisitVisasSection market={market} />
      <ToolsSection market={market} />
      <ProcessSection />
      <StoriesSection />
      <VideoStoriesSection />
      <ResourcesSection market={market} />
      <FaqSection />
      <ContactCtaSection market={market} />
    </>
  );
}
