import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { MARKET_LIST, isMarket, type Market } from "@/config/markets";
import { env } from "@/config/env/server";
import { TOOL_PATHS, toolByPath } from "@/config/tools";
import { getPageContent } from "@/content/pages";
import { canonicalUrl, marketHref } from "@/lib/routing/routes";
import { ProgramPage } from "@/components/pages/ProgramPage";
import { ToolRoute } from "@/components/pages/tool-route";
import { resolveToolComponent } from "@/components/pages/tool-resolver";

/** Content hub pages living under /tools that are not in the tool registry. */
const TOOL_HUB_PATHS = ["canada", "australia"];

export function generateStaticParams() {
  const routes = [...TOOL_PATHS, ...TOOL_HUB_PATHS];
  return MARKET_LIST.flatMap((market) =>
    routes.map((path) => ({ market, slug: path.split("/") })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[market]/tools/[...slug]">): Promise<Metadata> {
  const { market, slug } = await params;
  if (!isMarket(market)) return {};
  const toolPath = slug.join("/");

  const tool = toolByPath(toolPath);
  if (tool) {
    return {
      title: tool.seoTitle,
      description: tool.seoDescription,
      alternates: {
        canonical: canonicalUrl(market as Market, `/tools/${tool.path}`, env.SITE_URL).toString(),
      },
    };
  }

  const page = getPageContent(`tools/${toolPath}`);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: canonicalUrl(market as Market, `/${page.id}`, env.SITE_URL).toString(),
    },
  };
}

export default async function ToolsPage({ params }: PageProps<"/[market]/tools/[...slug]">) {
  const { market, slug } = await params;
  if (!isMarket(market)) notFound();
  const toolPath = slug.join("/");

  const tool = toolByPath(toolPath);
  if (tool) {
    return (
      <ToolRoute
        params={params}
        page={{
          market,
          eyebrow: tool.eyebrow,
          title: tool.title,
          lede: tool.lede,
          sources: tool.sources,
          lastVerified: tool.lastVerified,
          children: resolveToolComponent(tool.component, market),
        }}
      />
    );
  }

  const page = getPageContent(`tools/${toolPath}`);
  if (!page) redirect(marketHref(market, "/tools"));
  return <ProgramPage page={page} market={market} />;
}
