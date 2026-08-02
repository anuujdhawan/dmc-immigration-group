import { PlayCircle } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/home/SectionShell";

export function VideoStoriesSection() {
  return (
    <SectionShell id="video-stories" tone="slate">
      <Container>
        <SectionHeading
          eyebrow="Watch & hear it from them"
          title="Success stories, in their own words"
          lede="Short clips from clients on what the process actually felt like — before, during and after approval."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              aria-hidden="true"
              className="flex aspect-video flex-col items-center justify-center gap-3 rounded-card bg-gradient-to-br from-brand-900 to-brand-950 text-center"
            >
              <PlayCircle className="size-12 text-leaf-soft" />
              <p className="px-6 text-sm text-aurora-muted">
                Video story — media pending client approval
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Published only after client consent and PII review.
        </p>
      </Container>
    </SectionShell>
  );
}
