import type { PageContent } from "@/content/pages/types";

export const SERVICE_PAGES: PageContent[] = [
  {
    id: "services/resume-marketing",
    title: "Resume Marketing Services",
    eyebrow: "More services",
    seoTitle: "Resume Marketing & CV Services | DMC Immigration Group",
    seoDescription:
      "Resume marketing services for immigration applicants — presenting your career consistently across CVs, reference letters and occupation assessments so your application tells one clear story.",
    lede: "A well-presented career story matters at every stage of an immigration application — from employer-sponsored roles to skilled-migration points. DMC's team helps clients present their professional history clearly and consistently.",
    sections: [
      {
        kind: "overview",
        heading: "Why your career presentation matters",
        paragraphs: [
          "Immigration authorities and employers assess your career from documents: the CV you submit, the reference letters your employers sign, and the occupation evidence that supports your skill assessment or points claim.",
          "Inconsistencies across these documents are one of the most common reasons for requests for further information, delays and refusals. A resume-marketing service aligns how your experience is described everywhere it appears.",
          "DMC's team reviews your professional history and helps you present it accurately and consistently across your CV, LinkedIn profile, reference letters and application forms — without ever fabricating roles, duties or dates.",
        ],
      },
      {
        kind: "benefits",
        heading: "What the service helps you achieve",
        items: [
          "A consistent, professional presentation of your experience across documents",
          "CV wording aligned with how immigration authorities and employers read job titles",
          "Reference-letter drafts that match the duties and periods declared in your application",
          "Clearer presentation of achievements, skills and career progression",
          "Support preparing for interviews and employer discussions when a job offer is the route",
        ],
      },
      {
        kind: "requirements",
        heading: "What the process looks like",
        items: [
          { title: "Career review", body: "A structured review of your professional history, qualifications and goals." },
          { title: "Document audit", body: "A check of how your experience is currently described across CV, LinkedIn and employment documents." },
          { title: "Consistency plan", body: "Alignment of titles, duties, periods and dates across every document that will reach an authority or employer." },
          { title: "Final review", body: "A final pass with you before documents are used in an application." },
        ],
      },
      {
        kind: "help",
        heading: "Who this supports",
        paragraphs: [
          "The service is most useful for skilled workers preparing Express Entry or Australia skilled applications, professionals pursuing employer-sponsored routes, and students entering the job market after study.",
          "DMC never guarantees outcomes or job offers — the goal is an honest, consistent presentation of your genuine experience.",
        ],
      },
      {
        kind: "faq",
        heading: "Resume marketing, answered",
        items: [
          {
            question: "Is this the same as a regular CV-writing service?",
            answer: "Not quite — the focus is consistency across the documents an immigration application depends on, not just a well-designed CV. That alignment is what reduces avoidable questions and delays.",
          },
          {
            question: "Will you fabricate experience to make my profile stronger?",
            answer: "No. Every document must reflect your genuine experience, duties and dates — fabricating career history is one of the fastest routes to a misrepresentation finding.",
          },
          {
            question: "Do you guarantee interviews or job offers?",
            answer: "No — no consultant can promise employment outcomes. The service improves how your genuine experience is presented.",
          },
        ],
      },
    ],
    relatedPages: ["why-dmc", "visas/canada/express-entry", "visas/australia/skilled-independent-189"],
    lastVerified: "2026-08-03",
    officialSources: [],
  },
  {
    id: "why-dmc",
    title: "Why DMC Immigration Group",
    eyebrow: "About us",
    seoTitle: "Why DMC Immigration Group | Regulated Consultants in UAE, Qatar, Kuwait & India",
    seoDescription:
      "Why applicants choose DMC — regulated practices, licensed consultants, 15+ years in immigration, offices across five markets and a clear, honest five-step process.",
    lede: "DMC Immigration Group guides families and professionals across five markets with regulated consultants and a process built on accuracy, honesty and clear communication.",
    sections: [
      {
        kind: "overview",
        heading: "Who DMC is",
        paragraphs: [
          "DMC Immigration Group helps individuals and families with Canadian, Australian, UK and other immigration pathways from offices in Dubai, Abu Dhabi, Qatar, Kuwait and India.",
          "With 15+ years of collective practice, consultants licensed in Canada and Australia, and clients from more than 20 countries, DMC covers 50+ immigration pathways through one coordinated team.",
          "The practice is built on regulated work: Canadian consultants are licensed through the College of Immigration and Citizenship Consultants, and Australian consultants hold registration with the Office of the Migration Agents Registration Authority.",
        ],
      },
      {
        kind: "benefits",
        heading: "What clients can expect from DMC",
        items: [
          "Regulated consultants — RCIC and MARA registered practitioners where those credentials apply",
          "Five offices across the UAE, Qatar, Kuwait and India, so clients are supported in their own market",
          "One coordinated team across immigration, study, business and investment pathways",
          "Honest assessments — DMC does not promise outcomes it cannot deliver",
          "Documentation discipline that reduces avoidable delays and questions",
          "Clear communication at every stage, in your language and your time zone",
        ],
      },
      {
        kind: "process",
        anchor: "process",
        heading: "Our process",
        steps: [
          { title: "Consultation", body: "A structured discussion of your goals, eligibility and options across relevant pathways." },
          { title: "Assessment", body: "A documented review of your profile against current program requirements." },
          { title: "Preparation", body: "Documentation planning and, where needed, language or credential steps." },
          { title: "Application", body: "Complete, consistent submissions built from verified evidence." },
          { title: "Support through the journey", body: "Guidance through processing, and the steps after a decision — including the honest handling of refusals and alternatives." },
        ],
      },
      {
        kind: "faq",
        heading: "About DMC, answered",
        items: [
          {
            question: "Is DMC a licensed immigration practice?",
            answer: "DMC's Canadian and Australian consultants are regulated professionals — RCIC registration in Canada and MARA registration in Australia apply to the consultants licensed for those jurisdictions. Consultant credentials are being confirmed with the regulators before publication.",
          },
          {
            question: "Which countries does DMC handle?",
            answer: "DMC covers immigration, study, business and investment pathways primarily to Canada, Australia, the UK, the USA and other destinations, from five offices across the UAE, Qatar, Kuwait and India.",
          },
          {
            question: "Does DMC guarantee visa approvals?",
            answer: "No. No consultant can guarantee an approval. DMC's commitment is to accurate, honest, complete applications and clear communication about the real chances of each pathway.",
          },
          {
            question: "How do I get started?",
            answer: "Contact the office nearest to you — the footer and contact pages list phone and email for each of the five markets.",
          },
        ],
      },
      {
        kind: "links",
        heading: "Explore the practice",
        items: [
          { title: "Skilled migration", path: "/visas/canada/express-entry", description: "Canada's Express Entry — the federal skilled route." },
          { title: "Study abroad", path: "/study-abroad/canada-student-visas", description: "Student routes to Canada, Australia, the UK and the USA." },
          { title: "Resume marketing", path: "/services/resume-marketing", description: "Presenting your professional history consistently." },
          { title: "Guides and checklists", path: "/guides", description: "Document checklists and preparation guides." },
        ],
      },
    ],
    relatedPages: ["services/resume-marketing", "guides", "faqs"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "College of Immigration and Citizenship Consultants (CICC)", url: "https://college-ic.ca/" },
      { label: "Office of the Migration Agents Registration Authority (MARA)", url: "https://www.mara.gov.au/" },
    ],
  },
];
