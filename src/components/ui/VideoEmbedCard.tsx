"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

import type { LandingVideo } from "@/content/landing";
import { cardShellClass } from "@/components/ui/MediaCard";

/**
 * Reusable click-to-play video card for landing/testimonial sections.
 *
 * Renders a local poster image with a play button in the template card language
 * (shared `cardShellClass` — organic asymmetric corners, soft brand border,
 * hover lift) and only swaps in the YouTube iframe after the visitor clicks — so
 * no external requests or cookies load until there is a real intent to watch.
 * The embed uses the privacy-enhanced `youtube-nocookie.com` domain.
 */
export function VideoEmbedCard({ video, index = 0 }: { video: LandingVideo; index?: number }) {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Keyboard users land focus on the play button; once it is replaced by the
  // iframe, move focus into the player so it isn't dropped to the document body.
  useEffect(() => {
    if (playing) iframeRef.current?.focus();
  }, [playing]);

  return (
    <li className={cardShellClass(index, { fill: true })}>
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {playing ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.poster}
              alt={`${video.title} — video testimonial`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            />
            <button
              type="button"
              aria-label={`Play video: ${video.title}`}
              onClick={() => setPlaying(true)}
              className="absolute inset-0 grid place-items-center bg-gradient-to-t from-brand-950/55 via-brand-950/10 to-transparent transition-colors hover:from-brand-950/65"
            >
              <span className="grid size-16 place-items-center rounded-full bg-brand-600 text-white shadow-[0_18px_44px_rgba(16,41,10,.4)] ring-4 ring-white/25 transition-transform duration-300 group-hover:scale-110">
                <Play aria-hidden="true" className="ml-1 size-7 fill-current" />
              </span>
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-600">
          {video.label}
        </span>
        <h3 className="font-display text-base font-bold leading-snug text-charcoal">{video.title}</h3>
      </div>
    </li>
  );
}
