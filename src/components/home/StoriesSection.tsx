import { Quote } from "lucide-react";

import { approvedTestimonials } from "@/config/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function StoriesSection() {
  const testimonials = approvedTestimonials(3);

  return (
    <section id="stories" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          align="left"
          eyebrow="Client perspective"
          title="Trust is created in the small details"
          lede="Clients remember whether expectations were clear and every stage felt organised."
        />
        {testimonials.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.id}
                className="flex flex-col rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-7"
              >
                <Quote aria-hidden="true" className="mb-4 size-7 text-slate-300" />
                <blockquote className="flex-1 text-pretty text-base leading-relaxed text-slate-500">
                  Client story — being verified with the client before publication.
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-200 pt-4">
                  <p className="font-display font-bold text-slate-400">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">
                    {testimonial.program} · {testimonial.market}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {["Canada", "Australia", "Canada"].map((market, index) => (
              <figure
                key={`${market}-${index}`}
                className="flex flex-col rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-7"
              >
                <Quote aria-hidden="true" className="mb-4 size-7 text-slate-300" />
                <blockquote className="flex-1 text-pretty text-base leading-relaxed text-slate-500">
                  Client story — being verified with the client before publication.
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-200 pt-4">
                  <p className="font-display font-bold text-slate-400">Client · {market}</p>
                  <p className="text-sm text-slate-400">Skilled pathway</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
