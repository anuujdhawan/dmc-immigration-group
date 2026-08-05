import { PlayCircle } from "lucide-react";

import type { Market } from "@/config/markets";
import { marketAudience } from "@/lib/i18n/market-copy";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function VideoStoriesSection({ market }: { market: Market }) {
  return (
    <section id="video-stories" className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          align="left"
          eyebrow="Watch & hear it from them"
          title="Success stories, in their own words"
          lede={`Short clips from clients on what the process actually felt like — before, during and after approval — including voices from ${marketAudience(market)}.`}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Video story — media pending client approval", flag: "🇨🇦", duration: "2:14" },
            { title: "Video story — media pending client approval", flag: "🇦🇺", duration: "1:48" },
            { title: "Video story — media pending client approval", flag: "🏢", duration: "3:02" },
          ].map((story, index) => (
            <article key={index} className="group cursor-pointer">
              <div
                className={`relative overflow-hidden rounded-2xl shadow-card ${
                  index === 0
                    ? "bg-gradient-to-br from-red-600 to-red-900"
                    : index === 1
                      ? "bg-gradient-to-br from-sky-600 to-blue-900"
                      : "bg-gradient-to-br from-brand-600 to-brand-900"
                }`}
              >
                <div className="aspect-video opacity-15">
                  <svg aria-hidden="true" className="h-full w-full" preserveAspectRatio="xMidYMax slice" viewBox="0 0 300 200">
                    {index === 0 ? (
                      <>
                        <rect fill="#fff" height="80" width="20" x="30" y="120" />
                        <rect fill="#fff" height="110" width="18" x="60" y="90" />
                        <polygon fill="#fff" points="98,50 112,100 84,100" />
                        <rect fill="#fff" height="90" width="16" x="140" y="110" />
                        <rect fill="#fff" height="130" width="16" x="180" y="70" />
                      </>
                    ) : index === 1 ? (
                      <>
                        <path d="M20 170 Q40 130 65 155 Q80 122 100 155 Q120 124 142 156 Q160 128 182 158 L182 200 L20 200 Z" fill="#fff" />
                        <rect fill="#fff" height="90" width="16" x="210" y="110" />
                      </>
                    ) : (
                      <>
                        <rect fill="none" height="100" stroke="#fff" strokeWidth="3" width="220" x="40" y="100" />
                        <rect fill="#fff" height="30" width="30" x="70" y="130" />
                        <rect fill="#fff" height="30" width="30" x="120" y="130" />
                        <rect fill="#fff" height="30" width="30" x="170" y="130" />
                      </>
                    )}
                  </svg>
                </div>
                <span className="absolute left-3 top-3 text-2xl">{story.flag}</span>
                <span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-semibold text-white">
                  {story.duration}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid size-14 place-items-center rounded-full bg-white/95 shadow-lg transition group-hover:scale-110">
                    <PlayCircle className="size-8 text-brand-700" />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">{story.title}</p>
              <p className="mt-1 text-xs text-slate-400">
                Media pending client approval
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Published only after client consent and PII review.
        </p>
      </div>
    </section>
  );
}
