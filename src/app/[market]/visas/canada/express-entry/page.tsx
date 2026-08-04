import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isMarket, type Market } from "@/config/markets";
import { env } from "@/config/env/server";
import { getPageContent } from "@/content/pages";
import { canonicalUrl } from "@/lib/routing/routes";
import { ExpressEntryPage } from "@/components/pages/ExpressEntryPage";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which Country Is Best To Migrate From Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you want to migrate from Dubai, Canada is a great option. It has friendly immigration laws and is an ideal country to live in with your family. Obtaining permanent residency (PR) in Canada grants you access to many benefits the Canadian Government provides, including excellent job opportunities, higher wages, quality of life, unrestricted mobility, and access to advanced education and healthcare.",
      },
    },
    {
      "@type": "Question",
      name: "Can we apply for Canada PR from Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Residents of the UAE have an advantageous position to qualify for Canada's migration programs due to their English ability, education system, and work experience in a competitive atmosphere. If this is your first time considering living in Canada, the FSWP could be your most suitable option.",
      },
    },
    {
      "@type": "Question",
      name: "What Is The Fastest Way To Get Canadian Permanent Residence?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "One option for eligible entrepreneurs is the Canada Start-Up Visa. However, for most skilled workers looking for permanent residency status in Canada, the Express Entry system is the fastest route for Canadian immigration.",
      },
    },
    {
      "@type": "Question",
      name: "How Long Does It Take To Get Canada PR From Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Express Entry Canada manages applications electronically to speed up the process. IRCC, formerly CIC, processes applications on priority and takes around six months to decide. After you get ITA, the processing time starts from the application submission date for a permanent residence visa.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum score for Express Entry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum score required to enter the Express Entry Pool is 67 points. It would help if you obtained as many Comprehensive Ranking System (CRS) points as possible to improve your chances of ranking higher. Invitation rounds are conducted regularly, and CRS cut-off scores vary by round.",
      },
    },
    {
      "@type": "Question",
      name: "What IELTS Score Is Good For Express Entry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum criteria for Canada Express Entry is the Canadian Language Benchmark (CLB 7), which means an IELTS band score of 6 for all 4 factors: reading, writing, speaking, and listening. Higher bands get more points and improve eligibility scores.",
      },
    },
    {
      "@type": "Question",
      name: "How Much Does Canada PR Cost From Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To apply for immigration to Canada through the Express Entry program, a single applicant must pay a fee of CAD 1,365 and an additional CAD 1,365 if they include a spouse. The total cost, including additional expenses, is approximately CAD 2,300 for a single applicant.",
      },
    },
    {
      "@type": "Question",
      name: "How do I qualify for Express Entry to Canada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UAE residents can qualify for Canada PR under Express Entry if they score 67 CRS points in the Pool. The CRS score is calculated based on various factors like age, English ability, employment offers, education, and work experience in an eligible occupation.",
      },
    },
    {
      "@type": "Question",
      name: "What Is The Express Entry Pool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eligible candidates for at least one of the popular programs in Canada need to create a profile to enter the Express Entry pool. These programs are: Federal Skilled Worker programs, Federal Skilled Trades program, Canadian Experience Class, and some PNP Programs.",
      },
    },
  ],
};

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <ExpressEntryPage market={market as Market} />
    </>
  );
}
