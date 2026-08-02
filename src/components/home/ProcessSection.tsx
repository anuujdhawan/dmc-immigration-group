import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/home/SectionShell";

const STEPS = [
  {
    number: "01",
    title: "Private consultation",
    text: "We understand your profile, priorities and preferred destinations.",
  },
  {
    number: "02",
    title: "Eligibility review",
    text: "Qualifications, experience, language and finances are evaluated.",
  },
  {
    number: "03",
    title: "Pathway strategy",
    text: "A route, document plan and milestones are set.",
  },
  {
    number: "04",
    title: "Case preparation",
    text: "Documents are organised, checked and submitted.",
  },
  {
    number: "05",
    title: "Ongoing guidance",
    text: "Support through updates, requests and decisions.",
  },
];

export function ProcessSection() {
  return (
    <SectionShell id="process" tone="slate">
      <Container>
        <SectionHeading
          eyebrow="The immigration process"
          title="From uncertainty to a clear direction"
          lede="Each stage is reviewed before the next begins, giving you visibility over strategy, responsibilities and progress."
        />
        <ol className="grid gap-5 md:grid-cols-3 xl:grid-cols-5">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="relative flex flex-col rounded-card border border-dmc-card-border bg-white p-6 shadow-sm"
            >
              <span className="mb-4 font-display text-4xl font-bold text-brand-100">
                {step.number}
              </span>
              <h3 className="font-display text-lg font-bold text-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </SectionShell>
  );
}
