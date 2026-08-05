import type { PageContent } from "@/content/pages/types";

export const UK_PAGES: PageContent[] = [
  {
    id: "visas/uk/skilled-worker",
    title: "UK Skilled Worker Visa",
    eyebrow: "UK work visas",
    seoTitle: "UK Skilled Worker Visa 2026 — Salary & Requirements | DMC Immigration Group",
    seoDescription:
      "The UK Skilled Worker visa — sponsor licence, certificate of sponsorship, the £41,700 salary threshold, going rates, new-entrant discounts and the route to settlement.",
    lede: "The UK's main work route for skilled professionals — a job offer from a licensed sponsor, a qualifying salary and the right occupation code are the foundations.",
    sections: [
      {
        kind: "overview",
        heading: "How the Skilled Worker visa works",
        paragraphs: [
          "The Skilled Worker visa lets employers in the UK sponsor skilled workers from abroad. It replaced Tier 2 (General) in 2020 and is the standard route for professionals taking up UK employment.",
          "The journey starts with the employer: they must hold a sponsor licence and issue a Certificate of Sponsorship (CoS) for the role. The applicant then applies for the visa, meeting salary, English and, where relevant, financial requirements.",
          "The visa is granted for up to five years (or the job contract length if shorter) and counts toward settlement (Indefinite Leave to Remain) after five qualifying years, subject to continuous residence and other rules.",
        ],
      },
      {
        kind: "requirements",
        heading: "Core requirements",
        items: [
          { title: "Licensed sponsor", body: "A job offer from an employer holding a valid sponsor licence." },
          { title: "Certificate of Sponsorship", body: "A CoS confirming the role, occupation code, salary and length of employment." },
          { title: "Eligible occupation", body: "The role must be at an eligible skill level — since July 2025 most new applications require graduate-level roles (RQF level 6 or higher)." },
          { title: "Salary", body: "Meet the general minimum, the occupation's going rate and the hourly minimum — the highest of these applies." },
          { title: "English", body: "An approved English test at the current required level (raised to B2 for new applications from 8 January 2026)." },
          { title: "Health and character", body: "Medical screening where applicable (e.g. tuberculosis tests from certain countries) and criminal-record checks." },
        ],
      },
      {
        kind: "panel",
        heading: "Salary thresholds (2026)",
        rows: [
          { label: "General minimum", value: "£41,700 per year" },
          { label: "Going rate", value: "The occupation-specific rate for your SOC code — the higher of the two applies" },
          { label: "New entrant", value: "£33,400 per year and 70% of the going rate (up to 4 years; under-26s, recent graduates, Student/Graduate switchers)" },
          { label: "Immigration Salary List role", value: "£33,400 per year (100% of the going rate still applies)" },
          { label: "Relevant PhD", value: "£37,500 and 90% of the going rate; STEM PhD: £33,400 and 80%" },
          { label: "Hourly floor", value: "A minimum hourly rate applies regardless of contract hours" },
        ],
        note: "Thresholds and going rates change periodically (most recently 22 July 2025). Only guaranteed basic salary counts — bonuses, overtime and allowances do not. The Health & Care Worker visa is a separate route with its own thresholds.",
      },
      {
        kind: "process",
        heading: "The sponsorship journey",
        steps: [
          { title: "Secure a job offer", body: "Find an employer with a sponsor licence that will assign a Certificate of Sponsorship." },
          { title: "Check salary and occupation", body: "Confirm the SOC code, the going rate and that the salary meets the applicable threshold." },
          { title: "Pass the English requirement", body: "Complete an approved English test at the current required level." },
          { title: "Apply online", body: "Submit the application, pay the visa fee and Immigration Health Surcharge, and provide biometrics." },
          { title: "Start work", body: "Receive the decision and begin work with the sponsoring employer — note that switching employers requires a new CoS." },
        ],
      },
      {
        kind: "faq",
        heading: "Skilled Worker, answered",
        items: [
          {
            question: "What salary do I need for the Skilled Worker visa?",
            answer: "The general minimum is £41,700 per year, but you must also meet the going rate for your occupation code — whichever is higher. Discounts apply for new entrants, Immigration Salary List roles and relevant PhDs.",
          },
          {
            question: "Can my family come with me?",
            answer: "Yes — a partner and dependent children can apply as dependents on the Skilled Worker visa, with no separate sponsor or English requirement.",
          },
          {
            question: "How long does the visa last?",
            answer: "Typically up to five years. Time on the visa counts toward settlement after five qualifying years, subject to continuous-residence and salary rules at extension.",
          },
          {
            question: "Can I change employers?",
            answer: "Yes, but each new role needs a new Certificate of Sponsorship, and the new salary and occupation must meet the requirements in force at that time.",
          },
          {
            question: "Is the Immigration Health Surcharge required?",
            answer: "Yes — the IHS is charged per applicant per year of the visa (currently over £1,000 per adult per year; the exact rate depends on your category and application date).",
          },
          {
            question: "Can I apply for the Skilled Worker visa {marketFrom}?",
            answer: "Yes — the route is open to applicants wherever they live. The key requirements are a licensed sponsor, a Certificate of Sponsorship, and meeting the salary, English and maintenance rules. {market} residents can prepare the evidence locally and apply from home.",
          },
        ],
      },
    ],
    relatedPages: ["visas/uk/skilled-worker-dependent", "visit-visas/uk", "study-abroad/uk-student-visas"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "GOV.UK — Skilled Worker visa", url: "https://www.gov.uk/skilled-worker-visa" },
      { label: "GOV.UK — Skilled Worker: when you can be paid less", url: "https://www.gov.uk/skilled-worker-visa/when-you-can-be-paid-less" },
    ],
  },
  {
    id: "visas/uk/skilled-worker-dependent",
    title: "Skilled Worker Dependent Visa",
    eyebrow: "UK work visas",
    seoTitle: "Skilled Worker Dependent Visa UK | DMC Immigration Group",
    seoDescription:
      "The dependent visa for partners and children of UK Skilled Worker visa holders — eligibility, work rights, IHS and how to apply.",
    lede: "Partners and dependent children of Skilled Worker visa holders can join the main applicant in the UK — with full work rights and a shared path toward settlement.",
    sections: [
      {
        kind: "overview",
        heading: "Who can apply as a dependent",
        paragraphs: [
          "The partner (spouse, civil partner or unmarried partner in a genuine, subsisting relationship) and dependent children under 18 of a Skilled Worker visa holder can apply for dependent visas.",
          "Dependents are granted permission for the same period as the main applicant's visa, and they can apply at the same time as the main application or later, while the main visa remains valid.",
          "Dependent partners can work in the UK for any employer without a separate sponsor, study, and — like the main applicant — their time in the UK counts toward settlement after five qualifying years.",
        ],
      },
      {
        kind: "eligibility",
        heading: "Eligibility essentials",
        items: [
          { title: "Relationship evidence", body: "Marriage or civil-partnership certificate, or proof of a genuine, subsisting unmarried partnership (usually two years' cohabitation)." },
          { title: "Main applicant's status", body: "The Skilled Worker visa must be valid, or the dependent must apply together with the main application." },
          { title: "Children", body: "Dependent children under 18 who are not leading an independent life; both parents normally need to come or already be in the UK." },
          { title: "No English test", body: "Dependents do not need an English test for this route." },
          { title: "Financial maintenance", body: "The main applicant must show maintenance funds (e.g. £285 for a partner) when required by the rules." },
        ],
      },
      {
        kind: "panel",
        heading: "Dependent visa at a glance",
        rows: [
          { label: "Work rights", value: "Unrestricted — any employer, any role" },
          { label: "Study rights", value: "Allowed at any level" },
          { label: "English test", value: "Not required" },
          { label: "Visa length", value: "Matches the main applicant's permission" },
          { label: "Fees", value: "Visa fee plus Immigration Health Surcharge per dependent (current published rates apply)" },
        ],
      },
      {
        kind: "process",
        heading: "The dependent application",
        steps: [
          { title: "Confirm eligibility", body: "Check your relationship evidence and the main applicant's current or pending status." },
          { title: "Apply online", body: "Submit the dependent application, pay the fee and IHS, and provide biometrics." },
          { title: "Attend appointment", body: "Complete the visa-application-centre appointment where required." },
          { title: "Receive the visa", body: "Dependents receive permission matching the main visa's expiry." },
          { title: "Settle together", body: "Both partners' time on the route counts toward Indefinite Leave to Remain." },
        ],
      },
      {
        kind: "faq",
        heading: "Dependent visas, answered",
        items: [
          {
            question: "Can dependents work in the UK?",
            answer: "Yes — dependent partners have unrestricted work rights in any role, with no separate sponsorship required.",
          },
          {
            question: "Can children study as dependents?",
            answer: "Yes — dependent children can attend school or study at any level under the dependent visa.",
          },
          {
            question: "What if I am unmarried?",
            answer: "Unmarried partners can apply if they can show a genuine, subsisting relationship, usually two years of cohabitation — evidence matters, so prepare documents early.",
          },
          {
            question: "Do dependents need their own English test?",
            answer: "No — the English requirement applies only to the main applicant on this route.",
          },
        ],
      },
    ],
    relatedPages: ["visas/uk/skilled-worker", "visit-visas/uk"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "GOV.UK — Skilled Worker visa: your partner and children", url: "https://www.gov.uk/skilled-worker-visa/your-partner-and-children" },
    ],
  },
];
