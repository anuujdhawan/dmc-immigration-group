import type { ToolFamily } from "@/config/tools";
import { toolFeatureImage, toolFeatureMeta } from "./tool-media";

/**
 * Feature-image band shown directly under the botanical hero on the tools
 * pages. Carries the country photography that used to sit inside the old
 * per-tool hero, framed with the site's signature organic corner.
 */
export function ToolFeatureBand({ family, marketLabel }: { family: ToolFamily; marketLabel: string }) {
  const { alt, chip } = toolFeatureMeta(family);
  return (
    <section className="bg-white pt-12 md:pt-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <figure className="relative overflow-hidden rounded-[28px_96px_28px_28px] border border-brand-600/10 shadow-[0_24px_64px_rgba(16,41,10,0.09)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={toolFeatureImage(family)}
            alt={alt}
            decoding="async"
            loading="eager"
            className="aspect-[4/3] w-full object-cover sm:aspect-[16/7] md:aspect-[21/9]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#071d04]/75 via-[#071d04]/25 to-transparent px-6 pb-5 pt-20 md:px-8">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-white drop-shadow-sm">{chip}</span>
            <span className="text-xs font-medium text-white/85">{marketLabel} market</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
