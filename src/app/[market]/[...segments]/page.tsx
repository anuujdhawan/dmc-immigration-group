import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MARKET_LABELS, MARKET_LIST, isMarket, type Market } from "@/config/markets";
import { PAGE_IDS, breadcrumbsFor, getPageContent } from "@/content/pages";
import { TOOL_PATHS, toolByPath } from "@/config/tools";
import { breadcrumbJsonLd, marketSeo, toolJsonLd } from "@/lib/seo/market-seo";
import { resolveToolComponent } from "@/components/pages/tool-resolver";
import { ToolPage } from "@/components/pages/ToolPage";
import { ProgramPage } from "@/components/pages/ProgramPage";
import {
  TOOL_HUB_CONFIG,
  TOOL_HUB_PATHS,
  ToolHubPage,
  toolHubByPath,
} from "@/components/pages/ToolHubPage";

export function generateStaticParams() {
  const contentParams = PAGE_IDS.map((id) => ({ segments: id.split("/") }));
  // Tools hub landing pages (/tools/canada, /tools/australia).
  const hubParams = TOOL_HUB_PATHS.map((path) => ({ segments: path.split("/") }));
  // Tool URLs live under /tools/… so their segments carry the "tools" prefix.
  const toolParams = TOOL_PATHS.map((path) => ({ segments: ["tools", ...path.split("/")] }));
  return MARKET_LIST.flatMap((market) =>
    [...contentParams, ...hubParams, ...toolParams].map((p) => ({ market, ...p })),
  );
}

function toolPathFromSegments(segments: string[]): string | null {
  const path = segments.join("/");
  // Tool registry paths are relative to /tools (e.g. "canada/crs-calculator").
  return path.startsWith("tools/") ? path.slice("tools/".length) : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/[market]/[...segments]">): Promise<Metadata> {
  const { market, segments } = await params;
  const path = segments.join("/");
  const toolPath = toolPathFromSegments(segments);
  const hub = toolPath ? toolHubByPath(`tools/${toolPath}`) : undefined;
  if (hub && isMarket(market)) {
    const config = TOOL_HUB_CONFIG[hub];
    return marketSeo({
      title: `${config.title} | DMC Immigration ${MARKET_LABELS[market]}`,
      description: config.lede,
      market: market as Market,
      path: `/${hub}`,
    });
  }
  const tool = toolPath ? toolByPath(toolPath) : undefined;
  if (tool && isMarket(market)) {
    return marketSeo({
      title: tool.seoTitle,
      description: tool.seoDescription,
      market: market as Market,
      path: `/tools/${tool.path}`,
    });
  }
  const page = isMarket(market) ? getPageContent(path) : null;
  if (!page) return {};
  return marketSeo({
    title: page.seoTitle,
    description: page.seoDescription,
    market: market as Market,
    path: `/${page.id}`,
    noindex: page.noindex,
  });
}

export default async function ContentPage({ params }: PageProps<"/[market]/[...segments]">) {
  // ===========================================================================
  // ROUTE DISABLED — page rendering commented out per request: only the 4
  // landing pages and 4 thank-you pages are live. This route intentionally
  // returns 404 (notFound) instead of rendering.
  // ===========================================================================
  // const { market, segments } = await params;
  // if (!isMarket(market)) notFound();
  // const path = segments.join("/");
  //
  // // Tools hubs (/tools/canada, /tools/australia) + interactive tool routes.
  // const registryPath = toolPathFromSegments(segments);
  // const hub = registryPath ? toolHubByPath(`tools/${registryPath}`) : undefined;
  // if (hub && isMarket(market)) {
  //   return <ToolHubPage market={market} hub={hub} />;
  // }
  // const tool = registryPath ? toolByPath(registryPath) : undefined;
  // if (tool) {
  //   const toolUrl = `/tools/${tool.path}`;
  //   return (
  //     <>
  //       <script
  //         type="application/ld+json"
  //         dangerouslySetInnerHTML={{
  //           __html: JSON.stringify([
  //             breadcrumbJsonLd([{ label: "Tools", path: "/tools" }], market, undefined, toolUrl),
  //             toolJsonLd(tool.title, market, undefined, toolUrl),
  //           ]),
  //         }}
  //       />
  //       <ToolPage
  //         market={market}
  //         family={tool.family}
  //         eyebrow={tool.eyebrow}
  //         title={tool.title}
  //         lede={tool.lede}
  //         sources={tool.sources}
  //         lastVerified={tool.lastVerified}
  //       >
  //         {resolveToolComponent(tool.component, market)}
  //       </ToolPage>
  //     </>
  //   );
  // }
  //
  // const page = getPageContent(path);
  // if (!page) notFound();
  // return <ProgramPage page={page} market={market} />;
  // ===========================================================================
  notFound();
}
