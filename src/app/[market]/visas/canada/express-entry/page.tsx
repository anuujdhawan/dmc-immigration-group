import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isMarket, MARKET_LABELS, type Market } from "@/config/markets";
import { env } from "@/config/env/server";
import { getOffice } from "@/config/offices";
import { getPageContent } from "@/content/pages";
import { canonicalUrl } from "@/lib/routing/routes";
import { ExpressEntryPage } from "@/components/pages/ExpressEntryPage";

function faqSchemaForMarket(marketLabel: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Which country is best to migrate to from ${marketLabel}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `If you want to migrate from ${marketLabel}, Canada is a strong option to explore. It has structured immigration pathways and is widely considered by professionals and families looking for long-term settlement, career, education and healthcare access.`,
        },
      },
      {
        "@type": "Question",
        name: `Can residents served by DMC ${marketLabel} apply for Canada PR?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Eligible clients served by our ${marketLabel} office can prepare an Express Entry profile and apply online if they meet the relevant federal or provincial criteria.`,
        },
      },
      {
        "@type": "Question",
        name: "What is the fastest way to get Canadian permanent residence?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For many skilled workers seeking Canadian permanent residence, the Express Entry system is a structured electronic route. Invitation rounds, eligibility and processing remain subject to IRCC rules.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum score for Express Entry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Federal Skilled Worker eligibility uses a 67-point selection grid, while eligible Express Entry profiles are ranked separately through the Comprehensive Ranking System. CRS cut-off scores vary by invitation round.",
        },
      },
    ],
  };
}

export function generateStaticParams() {
  return ["dubai", "abu-dhabi", "qatar", "kuwait", "india"].map((market) => ({
    market,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[market]/visas/canada/express-entry">): Promise<Metadata> {
  const { market } = await params;
  const page = getPageContent("visas/canada/express-entry");
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: canonicalUrl(market as Market, "/visas/canada/express-entry", env.SITE_URL).toString(),
    },
  };
}

export default async function ExpressEntryRoute({
  params,
}: PageProps<"/[market]/visas/canada/express-entry">) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  const office = getOffice(market);
  const marketLabel = MARKET_LABELS[market];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaForMarket(marketLabel)) }}
      />
      <ExpressEntryPage
        market={market as Market}
        phoneHref={`tel:${office.phoneE164}`}
        phoneLabel={office.phoneDisplay}
      />
    </>
  );
}
