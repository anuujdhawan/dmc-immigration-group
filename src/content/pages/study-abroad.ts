import type { PageContent } from "@/content/pages/types";

// TODO(client): confirm whether DMC offers in-house IELTS coaching before
// removing the noindex flag on the ielts-coaching page (see DECISIONS.md).

export const STUDY_ABROAD_PAGES: PageContent[] = [
  {
    id: "study-abroad/canada-student-visas",
    title: "Study in Canada — Student Visas",
    eyebrow: "Study abroad",
    seoTitle: "Study in Canada — Student Visa Guide | DMC Immigration Group",
    seoDescription:
      "Studying in Canada — designated learning institutions, the Provincial Attestation Letter, study-permit steps, work rules and the path after graduation, with official sources.",
    lede: "A practical guide for UAE, GCC and India students exploring Canadian study — from choosing a designated institution to applying for a study permit and planning what comes after graduation.",
    sections: [
      {
        kind: "overview",
        heading: "How Canadian student study works",
        paragraphs: [
          "International students study in Canada at designated learning institutions (DLIs). A study permit — not a study visa — is the document that authorises full-time study in Canada for the duration of a program.",
          "Most study-permit applicants now need a Provincial Attestation Letter (PAL) issued by the province or territory of their school, alongside a letter of acceptance from the DLI.",
          "The Student Direct Stream (SDS) ended on 8 November 2024. Applications are processed under the regular stream, and the requirements below apply to all applicants.",
        ],
      },
      {
        kind: "requirements",
        heading: "What you need for a Canadian study permit",
        items: [
          { title: "Letter of acceptance", body: "An acceptance letter from a designated learning institution." },
          { title: "Provincial Attestation Letter", body: "Required for most applicants; some categories are exempt (e.g. certain primary/secondary or graduate programs) — the official PAL page lists current exemptions." },
          { title: "Proof of funds", body: "Evidence covering tuition plus living costs — the published minimum was CAD 20,635 for 2024–2025 and is updated periodically — plus travel funds and, if applicable, fees for accompanying family members." },
          { title: "English or French ability", body: "Language results as required by the institution and, in some cases, IRCC (e.g. new language requirements for some post-graduation work-permit applications)." },
          { title: "Health and character", body: "Medical examination where required and police clearance where applicable." },
          { title: "Genuine intent", body: "Evidence that you will comply with the conditions of your permit and leave Canada at the end of your stay, unless you become eligible to remain." },
        ],
      },
      {
        kind: "panel",
        heading: "Working and staying after study",
        rows: [
          { label: "Off-campus work", value: "Up to 24 hours per week during regular academic sessions, full-time during scheduled breaks" },
          { label: "Co-op placements", value: "Work that is a required part of the program may not count against the off-campus limit" },
          { label: "PGWP", value: "Graduates of eligible programs may qualify for a Post-Graduation Work Permit; duration and eligibility follow the current rules, including language requirements for new applications" },
          { label: "Path to permanent residence", value: "Canadian study and work experience can support economic-immigration pathways (e.g. Express Entry categories)" },
        ],
        note: "Work rights are set out on the study permit. Rules change periodically — always confirm current details on IRCC before planning around them.",
      },
      {
        kind: "process",
        heading: "A typical study-route journey",
        steps: [
          { title: "Choose a DLI and apply", body: "Identify a designated learning institution and a program that fits your goals, and secure a letter of acceptance." },
          { title: "Obtain a PAL", body: "Use the provincial allocation process to receive a Provincial Attestation Letter from the province of your school." },
          { title: "Prepare funds and documents", body: "Assemble proof of funds, language results, identity documents and any medical or police evidence." },
          { title: "Apply for the study permit", body: "Submit the application with supporting documents and biometrics within the required timelines." },
          { title: "Plan study, work and post-graduation", body: "Understand work rights, co-op arrangements and the current post-graduation work-permit rules before you depart." },
        ],
      },
      {
        kind: "faq",
        heading: "Studying in Canada, answered",
        items: [
          {
            question: "Is SDS still available?",
            answer: "No. The Student Direct Stream ended on 8 November 2024. Applications are processed under the regular stream, and most applicants need a Provincial Attestation Letter.",
          },
          {
            question: "Can I work while studying in Canada?",
            answer: "Yes, with conditions: up to 24 hours per week off campus during regular academic sessions and full-time during scheduled breaks. Work rights are set out on the study permit.",
          },
          {
            question: "Can I work in Canada after graduating?",
            answer: "Graduates of eligible programs may qualify for a Post-Graduation Work Permit (PGWP). Duration and eligibility follow the current rules, including language requirements introduced for new applications — check IRCC before planning around it.",
          },
          {
            question: "How much money do I need to show?",
            answer: "Enough for tuition plus living costs — the published minimum was CAD 20,635 for 2024–2025 for a single applicant and is updated periodically — plus travel funds and family fees where applicable.",
          },
        ],
      },
    ],
    relatedPages: ["visas/canada/study-permits", "visit-visas/canada", "study-abroad/uk-usa-student-visas"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "IRCC — Study in Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html" },
      { label: "IRCC — Study permit: how to apply", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" },
    ],
  },
  {
    id: "study-abroad/australia-student-visas",
    title: "Study in Australia — Student Visas",
    eyebrow: "Study abroad",
    seoTitle: "Study in Australia — Student Visa (Subclass 500) Guide | DMC Immigration Group",
    seoDescription:
      "Studying in Australia — the Student visa (subclass 500), CRICOS courses, the Genuine Student requirement, English, funds, OSHC and post-study work, with official sources.",
    lede: "For students considering Australian universities — the Student visa (subclass 500), from enrolment at a CRICOS-registered provider to work rights and the post-study options that follow graduation.",
    sections: [
      {
        kind: "overview",
        heading: "How the Australian student route works",
        paragraphs: [
          "Australia's main student visa is the Student visa (subclass 500). It covers most international study, from English-language courses to higher-education degrees and postgraduate research, at providers registered on the Commonwealth Register of Institutions and Courses for Overseas Students (CRICOS).",
          "Applicants need a Confirmation of Enrolment (CoE) from their provider, prove genuine study intent through the Genuine Student (GS) requirement, and hold Overseas Student Health Cover (OSHC) for the full visa period.",
          "The GS requirement replaced the older Genuine Temporary Entrant (GTE) test in March 2024. It focuses on whether studying is your genuine reason for coming to Australia.",
        ],
      },
      {
        kind: "requirements",
        heading: "Core requirements for the 500",
        items: [
          { title: "Enrolment", body: "A Confirmation of Enrolment for a CRICOS-registered course, usually issued after an initial tuition deposit." },
          { title: "Genuine Student requirement", body: "Answers and evidence covering your course choice, career intentions and circumstances — this replaced the GTE test in March 2024." },
          { title: "Financial capacity", body: "Evidence covering tuition, living costs and travel — the published living-cost benchmark was around AUD 29,710 per year for a single applicant and is reviewed periodically — plus family amounts if dependents accompany you." },
          { title: "English language", body: "An accepted test at the level set for your course and provider (IELTS minimums commonly range from 5.5 to 7.0; some courses and providers require more)." },
          { title: "OSHC", body: "Overseas Student Health Cover from an approved provider for the entire visa period." },
          { title: "Health and character", body: "Health examination and character requirements apply, with police clearances where applicable." },
        ],
      },
      {
        kind: "panel",
        heading: "Work rights while studying",
        rows: [
          { label: "During term", value: "Up to 48 hours per fortnight while your course is in session" },
          { label: "Scheduled breaks", value: "No work limit during officially scheduled course breaks" },
          { label: "Research students", value: "Masters-by-research and PhD students generally have no work limit once their course starts" },
          { label: "Before course start", value: "No work until the course has commenced" },
        ],
        note: "Breaching the work limit is serious and can lead to visa cancellation. Course-related placements registered as part of your program may not count toward the cap.",
      },
      {
        kind: "process",
        heading: "The student-route journey",
        steps: [
          { title: "Choose a provider and course", body: "Apply to a CRICOS-registered provider and meet its entry and English requirements." },
          { title: "Accept and enrol", body: "Receive an offer, pay the deposit and obtain a Confirmation of Enrolment." },
          { title: "Prepare evidence", body: "Assemble financial documents, English results, OSHC cover and health/character records." },
          { title: "Apply for the visa", body: "Lodge the subclass 500 application and pay the visa application charge, providing biometrics where required." },
          { title: "Plan after study", body: "Understand the current Temporary Graduate (485) rules — eligibility and durations have been tightened in recent years, including the maximum age — and how Australian experience feeds skilled migration." },
        ],
      },
      {
        kind: "faq",
        heading: "Studying in Australia, answered",
        items: [
          {
            question: "How many hours can I work on a student visa?",
            answer: "Up to 48 hours per fortnight while your course is in session, and unlimited hours during scheduled course breaks. Research masters and PhD students generally have no cap.",
          },
          {
            question: "What English test score do I need?",
            answer: "It depends on your course and provider. IELTS minimums commonly range from 5.5 to 7.0 overall depending on the program — check both the Department of Home Affairs requirement and your university's requirement.",
          },
          {
            question: "What happens after I graduate?",
            answer: "Eligible graduates can apply for the Temporary Graduate visa (subclass 485) for post-study work. Eligibility and durations have been tightened in recent years — confirm the current rules before planning around them.",
          },
          {
            question: "Can my family come with me?",
            answer: "A partner and dependent children can accompany you, subject to their own requirements, including additional financial evidence and health insurance arrangements.",
          },
        ],
      },
    ],
    relatedPages: ["visas/australia/skilled-independent-189", "visas/australia/employer-sponsored-482", "study-abroad/uk-usa-student-visas"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Home Affairs — Student visa (subclass 500)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
      { label: "Study Australia — Student visa", url: "https://www.studyaustralia.gov.au/en/plan-your-move/your-guide-to-visas/student-visa-subclass-500" },
    ],
  },
  {
    id: "study-abroad/uk-usa-student-visas",
    title: "Study in the UK & USA — Student Visas",
    eyebrow: "Study abroad",
    seoTitle: "Study in the UK & USA — Student Visa Hub | DMC Immigration Group",
    seoDescription:
      "A combined guide to studying in the United Kingdom and the United States — the UK Student route and the US F-1 visa, with the key differences and links to full country guides.",
    lede: "Two of the world's most popular study destinations, two very different visa systems — the UK Student route and the US F-1 visa, compared and explained.",
    sections: [
      {
        kind: "overview",
        heading: "Two destinations, two systems",
        paragraphs: [
          "The United Kingdom and the United States each run a dedicated student visa system, and the preparation differs in meaningful ways: how you apply, when you apply, what you must prove and how you may work.",
          "In the UK, the Student route (formerly Tier 4) is built around a Certificate of Acceptance for Studies (CAS) from the university and proof of tuition plus maintenance funds. In the USA, the F-1 visa is built around an I-20 form from a SEVP-certified school and the SEVIS system.",
          "Both routes demand genuine study intent, sufficient funds and English ability — but the evidence, fees and work rules are different. Use the country guides below for the detail, and check the official sources before applying.",
        ],
      },
      {
        kind: "programs",
        heading: "The two routes at a glance",
        items: [
          {
            title: "UK Student route",
            body: "CAS from a licensed sponsor, maintenance funds held for 28 days, an approved English test, the Immigration Health Surcharge, and typically up to 20 hours of term-time work for degree-level students.",
            label: "GOV.UK application system",
          },
          {
            title: "US F-1 visa",
            body: "I-20 from a SEVP-certified school, SEVIS fee, DS-160 and consular interview, mostly on-campus work during term, and optional practical training (OPT) after study.",
            label: "US State Department application system",
          },
        ],
      },
      {
        kind: "links",
        heading: "Country guides",
        lede: "Full details, requirements and application steps for each destination, plus the Canada and Australia guides.",
        items: [
          { title: "UK student visas", path: "/study-abroad/uk-student-visas", description: "The UK Student route — CAS, maintenance funds, English and the Graduate route." },
          { title: "USA student visas", path: "/study-abroad/usa-student-visas", description: "The F-1 visa — I-20, SEVIS, the interview and OPT after study." },
          { title: "Canada student visas", path: "/study-abroad/canada-student-visas", description: "DLIs, the Provincial Attestation Letter and the study permit." },
          { title: "Australia student visas", path: "/study-abroad/australia-student-visas", description: "The subclass 500, the Genuine Student requirement and work rights." },
        ],
      },
      {
        kind: "faq",
        heading: "UK vs USA study, answered",
        items: [
          {
            question: "Which is easier to get — a UK student visa or a US F-1?",
            answer: "Both are achievable with a genuine offer and solid evidence, but they differ: the UK is a largely document-based application, while the USA requires a consular interview and assesses non-immigrant intent. Neither should be assumed 'easier'.",
          },
          {
            question: "Can I work while studying in the UK or USA?",
            answer: "In the UK, most degree-level students can work up to 20 hours per week in term time. In the USA, F-1 students are mostly limited to on-campus work during the academic year, with off-campus options only through authorised practical training.",
          },
          {
            question: "Which country lets me stay longer after study?",
            answer: "The UK offers a Graduate route (currently two years, three for PhD). The USA offers Optional Practical Training (typically 12 months, extendable for STEM). Both are subject to current rules — check official sources.",
          },
        ],
      },
    ],
    relatedPages: ["study-abroad/uk-student-visas", "study-abroad/usa-student-visas", "study-abroad/canada-student-visas", "study-abroad/australia-student-visas"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "GOV.UK — Student visa", url: "https://www.gov.uk/student-visa" },
      { label: "US State Department — Student visas", url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html" },
    ],
  },
  {
    id: "study-abroad/uk-student-visas",
    title: "Study in the UK — Student Visa",
    eyebrow: "Study abroad",
    seoTitle: "UK Student Visa 2026 — Requirements & Costs | DMC Immigration Group",
    seoDescription:
      "The UK Student route (formerly Tier 4) — CAS, maintenance funds, the £1,529 London / £1,171 outside London living-cost rates, English, work rules and the Graduate route.",
    lede: "The UK Student route for degree and below-degree study — how the CAS, funds and English requirements fit together, and what you can do during and after your course.",
    sections: [
      {
        kind: "overview",
        heading: "How the UK Student route works",
        paragraphs: [
          "The UK Student visa (formerly Tier 4) lets you study full-time at a licensed sponsor — typically a university, college or independent school. Your sponsor issues a Certificate of Acceptance for Studies (CAS), which records your course, fees and the maintenance amount that applies to you.",
          "The application scores 70 points: 50 for the CAS, 10 for financial evidence and 10 for English language. You apply online, pay the visa fee and Immigration Health Surcharge (IHS), and attend a biometric appointment.",
          "You can apply up to six months before your course starts, and decisions typically take around three weeks for applications from abroad.",
        ],
      },
      {
        kind: "requirements",
        heading: "Core requirements",
        items: [
          { title: "Offer and CAS", body: "An unconditional offer from a licensed student sponsor and a CAS confirming course details and fees." },
          { title: "Maintenance funds", body: "First-year tuition (or the outstanding balance) plus living costs held for 28 consecutive days — the closing balance must be dated no more than 31 days before you apply." },
          { title: "Living-cost rates", body: "From November 2025 the published rates are £1,529 per month for study in London and £1,171 per month outside London, for up to 9 months — the Home Office revises these periodically." },
          { title: "English language", body: "An approved English test at the level for your course — B2 for most degree-level courses, B1 for below-degree level (some institutions require higher)." },
          { title: "Health and character", body: "Immigration Health Surcharge (currently £776 per year for students) plus tuberculosis screening where applicable." },
          { title: "ATAS where required", body: "An Academic Technology Approval Scheme certificate for certain sensitive subject areas, mostly STEM." },
        ],
      },
      {
        kind: "panel",
        heading: "Working and staying after study",
        rows: [
          { label: "Term-time work", value: "Typically up to 20 hours per week for degree-level students, full-time during official holidays" },
          { label: "Below-degree courses", value: "Reduced work rights apply for below-degree level study" },
          { label: "Graduate route", value: "After an eligible degree: currently 2 years (3 for a PhD) of open work rights in the UK" },
          { label: "Settlement path", value: "Skilled Worker sponsorship after study is the main route to longer-term stay" },
        ],
        note: "Graduate-route rules are reviewed by the Home Office and have changed in the past — confirm current policy before planning around them.",
      },
      {
        kind: "process",
        heading: "The UK student application journey",
        steps: [
          { title: "Secure an offer", body: "Apply to a licensed sponsor and receive an unconditional offer." },
          { title: "Receive your CAS", body: "Accept the place; the university issues a CAS with course and fee details." },
          { title: "Prepare evidence", body: "Hold maintenance funds for 28 days, take an approved English test and gather documents." },
          { title: "Apply online", body: "Submit the application, pay the fee and IHS, and provide biometrics." },
          { title: "Travel and study", body: "Arrive (up to one month before the course starts for courses over six months) and begin your studies." },
        ],
      },
      {
        kind: "faq",
        heading: "Studying in the UK, answered",
        items: [
          {
            question: "How much money do I need to show?",
            answer: "First-year tuition (or the outstanding balance) plus living costs — £1,529 per month for London or £1,171 per month outside London (rates from November 2025), for up to 9 months. The money must be held for 28 consecutive days.",
          },
          {
            question: "Can I work while studying in the UK?",
            answer: "Most degree-level students can work up to 20 hours per week during term time and full-time during official holidays. Work rights for below-degree courses are more restricted.",
          },
          {
            question: "Can I stay in the UK after graduating?",
            answer: "Yes — the Graduate route currently offers two years of open work rights (three years for PhD graduates), and skilled sponsorship is the main route beyond that.",
          },
          {
            question: "How long does the visa application take?",
            answer: "Decisions typically take around three weeks for applications from abroad. Apply up to six months before your course starts.",
          },
        ],
      },
    ],
    relatedPages: ["visas/uk/skilled-worker", "study-abroad/uk-usa-student-visas", "visit-visas/uk"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "GOV.UK — Student visa", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK — Student visa: money you need", url: "https://www.gov.uk/student-visa/money" },
    ],
  },
  {
    id: "study-abroad/usa-student-visas",
    title: "Study in the USA — Student Visa (F-1)",
    eyebrow: "Study abroad",
    seoTitle: "USA Student Visa (F-1) 2026 — Requirements & Steps | DMC Immigration Group",
    seoDescription:
      "The US F-1 student visa — the I-20, SEVIS fee, DS-160 and interview, on-campus work rules, OPT and STEM extension, and F-2 dependents, with official sources.",
    lede: "For students planning to study in the United States — the F-1 visa process from I-20 and SEVIS to the consular interview, plus the work rules that apply during and after study.",
    sections: [
      {
        kind: "overview",
        heading: "How the F-1 system works",
        paragraphs: [
          "The F-1 visa is the standard route for international study in the USA at schools certified under the Student and Exchange Visitor Program (SEVP). Your school issues an I-20 form confirming your program and estimated costs — it is the foundation of the entire application.",
          "You then register in the SEVIS system (paying the I-901 fee), complete the DS-160 application, pay the visa fee and attend a consular interview. Being issued the visa does not guarantee entry — admission decisions remain with US Customs and Border Protection at the port of entry.",
          "F-1 status is tied to your school and program: you must maintain a full course load and report changes through the school's Designated School Official.",
        ],
      },
      {
        kind: "requirements",
        heading: "Core requirements",
        items: [
          { title: "I-20 form", body: "Issued by a SEVP-certified school after admission; records your program, start date and cost estimates." },
          { title: "SEVIS fee", body: "The I-901 fee (currently USD 350 for F-1 students under the published schedule) paid before the interview." },
          { title: "DS-160 and visa fee", body: "The online non-immigrant visa application plus the current visa application fee, with an appointment at a US embassy or consulate." },
          { title: "Non-immigrant intent", body: "Evidence of ties to your home country — the interview assesses whether you intend to return after study." },
          { title: "Financial evidence", body: "Proof you can cover tuition, living costs and travel for the duration of the program, as estimated on the I-20." },
          { title: "English ability", body: "The school sets its English requirements; the consular officer may assess ability during the interview." },
        ],
      },
      {
        kind: "panel",
        heading: "Work rights and post-study options",
        rows: [
          { label: "On-campus work", value: "Typically up to 20 hours per week during the academic year, full-time during breaks" },
          { label: "Off-campus work", value: "Not generally permitted except through authorised practical training (CPT/OPT)" },
          { label: "OPT", value: "Optional Practical Training after study — typically 12 months, extendable by 24 months for eligible STEM degrees" },
          { label: "F-2 dependents", value: "Spouses and children can accompany you, but may not work in the USA" },
        ],
        note: "Any work without authorisation is a serious violation of F-1 status and can lead to termination of the record.",
      },
      {
        kind: "process",
        heading: "The F-1 application journey",
        steps: [
          { title: "Get admitted", body: "Apply to SEVP-certified schools and accept an offer; the school issues your I-20." },
          { title: "Pay SEVIS and apply", body: "Pay the I-901 fee and complete the DS-160, uploading the required photo." },
          { title: "Attend the interview", body: "Book a consular appointment, pay the visa fee and attend with your I-20, financial evidence and ties documentation." },
          { title: "Arrive and check in", body: "Arrive no more than 30 days before your start date and check in with your Designated School Official." },
          { title: "Maintain status", body: "Keep a full course load, report address changes and plan practical training authorisation early." },
        ],
      },
      {
        kind: "faq",
        heading: "Studying in the USA, answered",
        items: [
          {
            question: "Can I work while studying on an F-1 visa?",
            answer: "F-1 students may generally work on campus up to 20 hours per week during the academic year. Off-campus work is only permitted through authorised practical training (CPT or OPT).",
          },
          {
            question: "Can I stay in the USA after graduating?",
            answer: "Optional Practical Training (OPT) typically allows 12 months of work after study, extendable by 24 months for eligible STEM degrees. H-1B sponsorship is the main route beyond that, subject to annual visa limits.",
          },
          {
            question: "Can my family come with me?",
            answer: "A spouse and unmarried children under 21 can accompany you on F-2 dependents visas. They may study, but cannot work in the USA.",
          },
          {
            question: "When can I enter the USA before classes?",
            answer: "F-1 students may enter up to 30 days before the program start date printed on the I-20.",
          },
        ],
      },
    ],
    relatedPages: ["study-abroad/uk-usa-student-visas", "visit-visas/usa"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "US State Department — Student visas", url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html" },
      { label: "USCIS — Students and exchange visitors (F-1)", url: "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors" },
    ],
  },
  {
    id: "study-abroad/ielts-coaching",
    title: "IELTS Coaching & Preparation",
    eyebrow: "Study abroad",
    seoTitle: "IELTS Preparation Support | DMC Immigration Group",
    seoDescription:
      "What IELTS is, the band scores commonly required for study and work routes, and how DMC can help you understand which test and score your target route needs.",
    lede: "IELTS is the most widely accepted English test for study and skilled migration. This page explains how it is used and how to plan your score — and what DMC can help with.",
    noindex: true,
    sections: [
      {
        kind: "status",
        label: "Status note",
        tone: "info",
        body: "DMC is confirming the current status of its in-house IELTS coaching offer with the client. Until confirmed, this page describes the test itself and DMC's application-support services only.",
      },
      {
        kind: "overview",
        heading: "What IELTS is and how it is used",
        paragraphs: [
          "IELTS (the International English Language Testing System) measures reading, writing, listening and speaking on a 1–9 band scale. Scores are valid for two years and are accepted by universities, employers and immigration authorities worldwide, including Canada, Australia and the UK.",
          "There are two formats: IELTS Academic, for study at degree level and above, and IELTS General Training, mainly for work and migration routes. The UK also accepts IELTS UKVI (IELTS for UK Visas and Immigration) where a Secure English Language Test is required.",
          "The band you need depends on your target route — most universities require 6.0–7.5 overall, while skilled-migration routes set their own minimums (for example, Canadian Express Entry rewards higher band scores under the language factor).",
        ],
      },
      {
        kind: "panel",
        heading: "Typical band requirements",
        rows: [
          { label: "Australian student visa", value: "Course-dependent; IELTS minimums commonly 5.5–7.0 overall" },
          { label: "UK Student route", value: "B2 (about IELTS 6.0+) for most degree-level courses" },
          { label: "Canadian Express Entry", value: "CLB 7+ equivalent; higher scores earn more CRS points" },
          { label: "UK Skilled Worker", value: "B2 level required for new applications from 8 January 2026" },
        ],
        note: "Always confirm the exact band requirement on the official page of your target institution or visa route — requirements change and vary by course.",
      },
      {
        kind: "help",
        heading: "How DMC can help with IELTS planning",
        paragraphs: [
          "DMC's consultants regularly guide clients through the language-testing part of their application: which test format to take, which band your target route requires, and how your score fits your overall eligibility.",
          "Coaching-class availability for IELTS preparation is being confirmed with the client; application support and score-planning advice are available now.",
        ],
        bullets: [
          "Test-format guidance — Academic vs General Training vs UKVI",
          "Band-score planning against your target visa or university requirement",
          "Documentation and timing guidance so results stay valid at application",
        ],
      },
      {
        kind: "faq",
        heading: "IELTS, answered",
        items: [
          {
            question: "How long is an IELTS score valid?",
            answer: "Two years from the test date. Most visa routes and universities require results to be valid at the time of application, so timing matters.",
          },
          {
            question: "Which IELTS format do I need?",
            answer: "IELTS Academic for most degree-level study, IELTS General Training for many work and migration routes, and IELTS UKVI where a Secure English Language Test is required. Check your target route first.",
          },
          {
            question: "Does a higher score help my application?",
            answer: "For Canadian Express Entry, yes — language is one of the largest CRS factors, so higher bands materially raise your score. For other routes, meeting the minimum is what matters most.",
          },
        ],
      },
    ],
    relatedPages: ["study-abroad/canada-student-visas", "study-abroad/australia-student-visas", "study-abroad/uk-student-visas"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "IELTS — Test types", url: "https://www.ielts.org/" },
      { label: "GOV.UK — Approved Secure English Language Tests", url: "https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt" },
    ],
  },
];
