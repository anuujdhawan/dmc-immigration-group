import type { PageContent } from "@/content/pages/types";

export const RESOURCE_PAGES: PageContent[] = [
  {
    id: "faqs",
    title: "Frequently Asked Questions",
    eyebrow: "Resources",
    seoTitle: "Immigration FAQs — Canada, Australia, UK & More | DMC Immigration Group",
    seoDescription:
      "Honest answers to the questions DMC clients ask most — eligibility, processing times, fees, dependents, refusals and how to get started across all five markets.",
    lede: "Straight answers to the questions we hear most often across our five offices — and the honest caveats that matter before you plan around a single answer.",
    sections: [
      {
        kind: "overview",
        heading: "How to use these answers",
        paragraphs: [
          "Every answer below reflects current policy at the time of writing, but immigration rules change often and every case differs. Use these answers to orient yourself, then confirm the details on the official sources linked from each program page.",
          "Where an answer depends on personal circumstances, DMC's consultants provide structured assessments — contact the office nearest to you to begin.",
        ],
      },
      {
        kind: "faq",
        heading: "General questions",
        items: [
          {
            question: "Which countries does DMC work with?",
            answer: "DMC guides clients to Canada, Australia, the UK, the USA and other destinations across skilled, study, family, business and investment pathways, from five offices in Dubai, Abu Dhabi, Qatar, Kuwait and India.",
          },
          {
            question: "Can you guarantee a visa approval?",
            answer: "No. No consultant can guarantee an immigration outcome. DMC's commitment is accurate, honest, complete applications and clear communication about each pathway's real requirements.",
          },
          {
            question: "How long does an application take?",
            answer: "It depends entirely on the route, the office processing it and the quality of the evidence. Program pages link to the official processing-time sources, and DMC gives route-specific expectations at consultation.",
          },
          {
            question: "What are your fees?",
            answer: "Fees depend on the pathway, the family size and the work involved. DMC provides a clear fee structure at consultation — beware of any adviser who quotes a flat price for every case.",
          },
          {
            question: "What happens if my application is refused?",
            answer: "A refusal is not always the end of a route. DMC reviews the reasons, explains the options — including reconsideration, appeal and reapplication — and is honest about when a different pathway is the better answer.",
          },
          {
            question: "How do I know DMC is regulated?",
            answer: "DMC's Canadian and Australian consultants are regulated professionals — RCIC and MARA registered practitioners where those credentials apply. Regulator confirmation is in progress and will be published on the credentials page.",
          },
        ],
      },
      {
        kind: "faq",
        heading: "Pathway-specific questions",
        items: [
          {
            question: "What is the minimum CRS score for Express Entry?",
            answer: "There is no permanent minimum — cut-off scores change with every round of invitations. General rounds, program-specific rounds and category-based draws all have different cut-offs. See the Express Entry page for how ranking works.",
          },
          {
            question: "Does Australia's 191 visa have an income requirement?",
            answer: "No — the minimum-income requirement was removed in June 2023. You still need the applicable skilled visa held for three years and proof of income for three of the five years, per the current rules.",
          },
          {
            question: "What salary do I need for a UK Skilled Worker visa?",
            answer: "The general minimum is £41,700 per year, and you must also meet the going rate for your occupation code — whichever is higher. New entrants, Immigration Salary List roles and PhD discounts can lower the threshold.",
          },
          {
            question: "Is SDS still available for Canada study permits?",
            answer: "No — the Student Direct Stream ended on 8 November 2024. Most applicants now need a Provincial Attestation Letter under the regular stream.",
          },
        ],
      },
      {
        kind: "links",
        heading: "Go deeper",
        lede: "Program pages, guides and checklists to continue your research.",
        items: [
          { title: "Guides and checklists", path: "/guides", description: "Document checklists and preparation guides." },
          { title: "Express Entry", path: "/visas/canada/express-entry", description: "Canada's federal skilled route, step by step." },
          { title: "Why DMC", path: "/why-dmc", description: "The practice, the process and what clients can expect." },
          { title: "Visit visa destinations", path: "/visit-visas", description: "Destination guides for short-stay travel." },
        ],
      },
    ],
    relatedPages: ["guides", "why-dmc"],
    lastVerified: "2026-08-03",
    officialSources: [],
  },
  {
    id: "guides",
    title: "Guides & Checklists",
    eyebrow: "Resources",
    seoTitle: "Immigration Guides & Document Checklists | DMC Immigration Group",
    seoDescription:
      "Document checklists and preparation guides for every program DMC handles — Express Entry, Australian skilled visas, UK Skilled Worker, study permits and visit visas.",
    lede: "Preparation guides and document checklists for the pathways DMC handles — so nothing is left to the last week before an application.",
    sections: [
      {
        kind: "overview",
        heading: "Start with the documents",
        paragraphs: [
          "Most immigration delays trace back to documents: missing evidence, inconsistent dates or records that do not match the application form. The checklists below break down what each route needs.",
          "Every checklist links to the program page for the full requirements, and every program page lists its official sources so you can verify the current rules directly.",
        ],
      },
      {
        kind: "links",
        heading: "Available guides",
        items: [
          { title: "Document checklists", path: "/guides/document-checklists", description: "Checklist sets for Express Entry, Australia skilled, UK Skilled Worker, study permits and visit visas." },
          { title: "FAQs", path: "/faqs", description: "Straight answers to the most common questions across our five markets." },
          { title: "Why DMC", path: "/why-dmc", description: "The practice, the process and what clients can expect." },
        ],
      },
      {
        kind: "faq",
        heading: "About the guides",
        items: [
          {
            question: "Are the checklists complete for every case?",
            answer: "They cover the standard evidence for each route. Individual cases — different family compositions, work histories or countries of residence — can add requirements, which is why DMC audits documents before applications.",
          },
          {
            question: "Where does the blog content fit?",
            answer: "The blog (immigration news and deeper articles) is being migrated from the previous site and will be published under Resources when ready.",
          },
        ],
      },
    ],
    relatedPages: ["guides/document-checklists", "faqs", "why-dmc"],
    lastVerified: "2026-08-03",
    officialSources: [],
  },
  {
    id: "guides/document-checklists",
    title: "Document Checklists",
    eyebrow: "Guides",
    seoTitle: "Immigration Document Checklists by Program | DMC Immigration Group",
    seoDescription:
      "Program-by-program document checklists — Express Entry, Australian skilled visas, UK Skilled Worker, study permits and visit visas — with the consistency rules that prevent delays.",
    lede: "The standard evidence each major route requires, in one place — plus the consistency discipline that keeps applications moving.",
    sections: [
      {
        kind: "overview",
        heading: "How to use these checklists",
        paragraphs: [
          "Each program has its own evidence set, but the discipline is the same: dates, job titles, duties and personal details must match across every document, from the passport to the reference letters.",
          "Checklists are a starting point — confirm the current official requirements for your route and circumstances, and prepare originals and certified copies as the route requires.",
        ],
      },
      {
        kind: "documents",
        heading: "Express Entry (Canada)",
        items: [
          "Passport and travel documents",
          "Approved language-test results",
          "Education records and ECA, where required",
          "Employment reference letters",
          "Provincial nomination, if claimed",
          "Police clearance certificates",
          "Immigration medical examination",
          "Proof of funds, where required",
          "Civil-status and family documents",
          "Payment and application records",
        ],
        note: "Marriage, divorce, adoption, dependent-child, name-change, trade-certification and other supporting records may also be required.",
      },
      {
        kind: "documents",
        heading: "Australian skilled visas (189 / 190 / 491 / 482)",
        items: [
          "Passport and travel documents",
          "Skill assessment from the relevant assessing authority",
          "English test results at the required band",
          "Employment evidence, including payslips and contracts",
          "State or territory nomination documents, where applicable",
          "Sponsor and nomination documents, for employer routes",
          "Police clearance certificates",
          "Health examinations",
          "Proof of funds or assets, where required",
          "Family and relationship documents",
        ],
        note: "Employment evidence must span the claimed periods — assessment letters alone rarely suffice.",
      },
      {
        kind: "documents",
        heading: "UK Skilled Worker",
        items: [
          "Passport and travel documents",
          "Certificate of Sponsorship (CoS) reference number",
          "English test results at the current required level",
          "Evidence of salary meeting the applicable threshold",
          "Degree or qualification documents, where claimed",
          "Tuberculosis screening, where applicable",
          "Partner and children's documents, for dependents",
          "Maintenance funds evidence, where required",
        ],
        note: "The salary threshold uses guaranteed basic pay only — bonuses, overtime and allowances do not count.",
      },
      {
        kind: "documents",
        heading: "Study permits and student visas",
        items: [
          "Passport and travel documents",
          "Letter of acceptance (Canada) or Confirmation of Enrolment (Australia)",
          "Provincial Attestation Letter, where applicable (Canada)",
          "Proof of funds covering tuition and living costs",
          "English test results",
          "Health insurance: OSHC (Australia) or equivalent",
          "Study-plan and ties evidence for interview routes",
          "Biometrics and photographs",
        ],
        note: "Funds must be genuinely available and, for the UK Student route, held for 28 consecutive days before applying.",
      },
      {
        kind: "documents",
        heading: "Visit visas",
        items: [
          "Passport valid beyond the stay",
          "Application forms and photographs",
          "Travel history and previous visa evidence",
          "Bank statements and income evidence",
          "Employment or business documents",
          "Accommodation and itinerary details",
          "Invitation letters, where applicable",
          "Return-travel evidence",
        ],
        note: "The decisive evidence is usually the combination of purpose, funds and ties — not any single document.",
      },
      {
        kind: "faq",
        heading: "Checklists, answered",
        items: [
          {
            question: "Are these lists complete?",
            answer: "They cover standard evidence for each route. Individual circumstances can add requirements — DMC's document audit covers the full, case-specific picture before any application.",
          },
          {
            question: "Do I need certified copies?",
            answer: "It depends on the route and the office — some accept scans, others require certified copies or originals at interview. Check the official instructions for your application centre.",
          },
          {
            question: "Why does consistency matter so much?",
            answer: "Authorities cross-check every document against every other one — and against your forms. A single mismatch can trigger a request for information, delay processing, or in serious cases, a misrepresentation finding.",
          },
        ],
      },
    ],
    relatedPages: ["guides", "visas/canada/express-entry", "visas/australia/skilled-independent-189"],
    lastVerified: "2026-08-03",
    officialSources: [],
  },
];
