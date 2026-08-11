/**
 * Image selection for the tools pages (hubs + individual tools).
 *
 * The tools pages now use the same botanical `<Hero>` as the homepage, so the
 * country photography that previously sat inside the per-tool hero lives in a
 * dedicated feature band under the hero and on the tool-hub cards — keeping the
 * pages image-rich without fighting the hero artwork.
 */

import type { ToolFamily } from "@/config/tools";

/** Full-width feature image shown in the band directly under the hero. */
const FEATURE_BY_FAMILY: Record<ToolFamily, string> = {
  // Toronto skyline — the image that previously sat inside the tool-page hero.
  canada: "/media/pages/canada/express-entry.webp",
  australia: "/media/pages/australia/sydney-harbour.webp",
  general: "/media/pages/common/consultation.webp",
};

const FEATURE_META: Record<ToolFamily, { alt: string; chip: string }> = {
  canada: { alt: "Toronto skyline, Canada", chip: "Canada" },
  australia: { alt: "Sydney Harbour, Australia", chip: "Australia" },
  general: { alt: "Immigration consultation", chip: "Free assessment" },
};

/** Images cycled across the tool-hub cards (one per card, by family). */
const CARDS_BY_FAMILY: Record<ToolFamily, string[]> = {
  canada: [
    "/media/pages/canada/express-entry.webp",
    "/media/pages/canada/vancouver.webp",
    "/media/pages/canada/montreal.webp",
    "/media/pages/canada/niagara.webp",
    "/media/pages/canada/flag.webp",
    "/media/pages/canada/moraine-lake.webp",
    "/media/pages/canada/banff.webp",
    "/media/pages/canada/cn-tower.webp",
    "/media/pages/canada/calgary.webp",
    "/media/pages/canada/victoria.webp",
    "/media/pages/canada/winnipeg.webp",
    "/media/pages/canada/ottawa.webp",
  ],
  australia: [
    "/media/pages/australia/sydney-harbour.webp",
    "/media/pages/australia/sydney-opera.webp",
    "/media/pages/australia/harbour-bridge.webp",
    "/media/pages/australia/melbourne.webp",
    "/media/pages/australia/gold-coast.webp",
    "/media/pages/australia/great-barrier-reef.webp",
    "/media/pages/australia/uluru.webp",
    "/media/pages/australia/perth.webp",
    "/media/pages/australia/brisbane.webp",
    "/media/pages/australia/tasmania.webp",
    "/media/pages/australia/kangaroo.webp",
    "/media/pages/australia/koala.webp",
  ],
  general: ["/media/pages/common/consultation.webp"],
};

/** The country photography shown in the feature band under the hero. */
export function toolFeatureImage(family: ToolFamily): string {
  return FEATURE_BY_FAMILY[family];
}

/** Alt text + caption chip for the feature band image. */
export function toolFeatureMeta(family: ToolFamily): { alt: string; chip: string } {
  return FEATURE_META[family];
}

/** Card image for a tool-hub grid position (cycled across the family's pool). */
export function toolCardImage(family: ToolFamily, index: number): string {
  const pool = CARDS_BY_FAMILY[family];
  return pool[index % pool.length];
}
