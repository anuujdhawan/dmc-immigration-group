import type { PageContent } from "@/content/pages/types";

export const CANADA_PAGES: PageContent[] = [
  {
    id: "visas/canada/express-entry",
    title: "Canada Express Entry",
    heroTitle: "Your Canada Express Entry journey starts with clarity.",
    heroSubtitle:
      "Structured guidance for UAE professionals and families exploring Canadian permanent residence through Express Entry, from initial profile assessment to a prepared application after invitation.",
    eyebrow: "Canada skilled immigration",
    seoTitle: "Canada Express Entry Visa Guide | DMC Immigration Group",
    seoDescription:
      "Express Entry for the Federal Skilled Worker Program, Canadian Experience Class and Federal Skilled Trades Program — eligibility, CRS factors, documents and process, explained with official sources.",
    lede: "Structured guidance for UAE, GCC and India professionals exploring Canadian permanent residence through Express Entry — from initial profile assessment to a prepared application after invitation.",
    sectionNav: [
      { label: "Overview", anchor: "services" },
      { label: "Programs", anchor: "programs" },
      { label: "Eligibility", anchor: "eligibility" },
      { label: "Points & CRS", anchor: "tools" },
      { label: "Documents", anchor: "documents" },
      { label: "Process", anchor: "process" },
      { label: "FAQs", anchor: "faq" },
      { label: "News", anchor: "resources" },
      { label: "Success Stories", anchor: "stories" },
    ],
    facts: [
      { label: "System", value: "Online profile management" },
      { label: "Programs", value: "FSWP · FSTP · CEC · PNP" },
      { label: "Selection", value: "CRS-ranked invitation rounds" },
      { label: "After an ITA", value: "60 days to submit" },
    ],
    sections: [
      {
        kind: "split",
        anchor: "services",
        eyebrow: "Benefits of Express Entry Canada",
        heading: "A structured route towards Canadian permanent residence.",
        lede:
          "Express Entry is Canada’s electronic system for managing skilled-immigration applications under three federal economic programs. Eligible candidates create a profile, enter the pool and are ranked through the Comprehensive Ranking System.",
        media: {
          src: "/media/pages/canada/express-entry.jpg",
          alt: "Toronto skyline at dusk, Canada",
          caption: "Canada permanent residence",
        },
        paragraphs: [
          "For professionals and families, the pathway can provide an organised route to permanent residence, access to opportunities across Canada and the ability to include eligible accompanying family members.",
        ],
        bullets: [
          "Electronic profile and application management",
          "Routes for skilled professionals and tradespeople",
          "Potential provincial nomination opportunities",
          "Eligible family members can be included",
          "Access to career, education and settlement opportunities",
          "A pathway that may lead to citizenship eligibility later",
        ],
      },
      {
        kind: "lead",
        eyebrow: "Get in touch with DMC",
        heading: "Canada Express Entry consultants in Dubai.",
        paragraphs: [
          "Express Entry is the online system IRCC uses to invite eligible candidates and manage permanent-residence applications under selected economic immigration programs.",
          "Applicants may need support to assess program fit, create an accurate profile, understand CRS ranking and coordinate their evidence. DMC supports prospective applicants {marketIn} and across the wider region through these preparation stages without guaranteeing an invitation or approval.",
        ],
        fields: [
          { label: "Full name", placeholder: "Full name" },
          { label: "Phone number", placeholder: "Phone number", type: "tel" },
          { label: "Email address", placeholder: "Email address", type: "email" },
          {
            label: "Country of interest",
            placeholder: "Migrate, visit or work country",
            type: "select",
            options: ["Canada", "Australia", "New Zealand", "Europe", "United Kingdom", "United States", "Germany"],
          },
          { label: "Age range", placeholder: "Age range", type: "select", options: ["18–45 years", "45+ years"] },
          {
            label: "Highest education",
            placeholder: "Highest education",
            type: "select",
            options: ["3-year diploma", "Bachelor’s degree", "Master’s degree", "Doctorate"],
          },
          {
            label: "Immigration type",
            placeholder: "Immigration type",
            type: "select",
            options: ["General migration", "Student visa", "Business migration", "Visit visa", "High-value migration"],
          },
          { label: "Preferred DMC location", placeholder: "Preferred DMC location", type: "select", options: ["Dubai", "Abu Dhabi", "Sharjah"] },
        ],
        consent: "I accept the Terms & Conditions and consent to being contacted about my enquiry.",
        primaryCta: { label: "Book Your Free Assessment", href: "/contact" },
        secondaryCta: { label: "Call +971 4 344 7757", href: "tel:+97143447757" },
      },
      {
        kind: "programs",
        anchor: "programs",
        eyebrow: "Programs under Express Entry",
        heading: "Federal programs and an aligned provincial route",
        lede: "Express Entry manages applications under three federal economic immigration programs, while aligned Provincial Nominee Programs can create an additional route for eligible candidates.",
        items: [
          {
            code: "FSW",
            title: "Federal Skilled Worker Program",
            body: "For skilled professionals with eligible foreign or Canadian work experience who meet the program's language, education, work-experience and 67-point selection-factor requirements.",
            label: "International professional route",
          },
          {
            code: "FST",
            title: "Federal Skilled Trades Program",
            body: "For experienced workers in eligible skilled trades who meet the applicable trade-experience, language and job-offer or Canadian certificate-of-qualification conditions.",
            label: "Skilled trades route",
          },
          {
            code: "CEC",
            title: "Canadian Experience Class",
            body: "For skilled workers with eligible Canadian work experience acquired in the required period before applying. Education is not a minimum CEC requirement, although it can influence CRS ranking.",
            label: "Canadian experience route",
          },
          {
            code: "PNP",
            title: "Provincial Nominee Program",
            body: "Provinces and territories can nominate candidates who meet their labour-market requirements. Express Entry-aligned nominations use a separate provincial process before the federal permanent-residence stage.",
            label: "Express Entry-aligned provincial route",
          },
        ],
      },
      {
        kind: "split",
        anchor: "overview",
        reverse: true,
        eyebrow: "Overview and features",
        heading: "How the Express Entry system works.",
        media: {
          src: "/media/pages/canada/montreal.jpg",
          alt: "Montreal cityscape, Canada",
          caption: "Explore opportunities across Canada",
        },
        paragraphs: [
          "Immigration, Refugees and Citizenship Canada uses Express Entry to manage eligible candidates for the Canadian Experience Class, Federal Skilled Worker Program and Federal Skilled Trades Program, along with Express Entry-aligned provincial nominations.",
          "Candidates first complete prerequisites such as an approved language test and, where required, an Educational Credential Assessment. An eligible profile enters the pool, receives a CRS score and can remain active for up to 12 months.",
          "Invitation rounds can be general, program-specific or category-based. An Invitation to Apply allows the candidate to submit a complete permanent-residence application; it is not an approval by itself.",
        ],
        cards: [
          { title: "Career and economic opportunity", body: "Permanent residents can work for eligible employers across Canada, subject to the conditions that apply to them." },
          { title: "Education and family settlement", body: "Families can explore Canadian education and settlement services after becoming permanent residents." },
          { title: "Public services and community life", body: "Eligibility for public services depends on the province, residence status and applicable waiting periods." },
          { title: "Long-term pathway", body: "Permanent residence can create a future path towards citizenship when statutory residence and other requirements are met." },
        ],
      },
      {
        kind: "eligibility",
        anchor: "eligibility",
        eyebrow: "Eligibility criteria",
        heading: "What shapes your Express Entry eligibility?",
        lede: "Each federal program has different minimum requirements. A proper assessment considers how the applicant's credentials work together rather than relying on a single number.",
        items: [
          { title: "Age", body: "Age affects FSW selection and CRS ranking; Express Entry does not use one universal maximum age." },
          { title: "Language", body: "Approved English or French results are required in reading, writing, speaking and listening." },
          { title: "Work history", body: "Eligible skilled experience must align with the correct NOC occupation and TEER category." },
          { title: "Education", body: "Canadian credentials or an Educational Credential Assessment may be required or may add points." },
          { title: "Settlement funds", body: "Applicants must show the required funds when the applicable program and circumstances require them." },
          { title: "Admissibility", body: "Medical, criminality, security, identity and background requirements apply to the family application." },
        ],
      },
      {
        kind: "panel",
        anchor: "tools",
        eyebrow: "Federal Skilled Worker grid",
        heading: "Federal Skilled Worker 67-point selection grid",
        rows: [
          { label: "Official-language skills", value: "Up to 28 points" },
          { label: "Education", value: "Up to 25 points" },
          { label: "Skilled work experience", value: "Up to 15 points" },
          { label: "Age", value: "Up to 12 points" },
          { label: "Arranged employment", value: "Up to 10 points" },
          { label: "Adaptability", value: "Up to 10 points" },
          { label: "Pass mark", value: "67 of 100" },
        ],
        note: "The 67-point grid assesses Federal Skilled Worker eligibility. It is different from the Comprehensive Ranking System score that ranks eligible profiles in the pool.",
      },
      {
        kind: "panel",
        anchor: "points-crs",
        eyebrow: "CRS points calculator",
        heading: "CRS — how profiles are ranked",
        rows: [
          { label: "Core human-capital factors", value: "Up to 500 (or 460 without a spouse or partner)" },
          { label: "Spouse or partner factors", value: "Up to 40" },
          { label: "Skill-transferability factors", value: "Up to 100" },
          { label: "Additional factors (incl. nomination)", value: "Up to 600" },
          { label: "Maximum CRS score", value: "1,200" },
        ],
        note: "A provincial nomination through an Express Entry-aligned stream adds 600 CRS points and generally leads to an invitation in a subsequent round. Invitation criteria and cut-off scores vary between rounds; there is no permanent cut-off.",
      },
      {
        kind: "process",
        anchor: "process",
        eyebrow: "Application roadmap",
        heading: "Immigration roadmap.",
        steps: [
          { title: "Register online", body: "Share your initial details and begin the assessment of the skilled-immigration pathway that may suit your Canadian goals." },
          { title: "Immediate response", body: "After receiving the required enquiry details, the DMC team contacts you to understand your requirements." },
          { title: "Know the process", body: "A consultant explains the Express Entry journey from Dubai, the relevant stages and the responsibilities involved." },
          { title: "Join us", body: "When you decide to proceed, the sign-up process, service scope, responsibilities and next milestones are explained." },
          { title: "Documentation", body: "A dedicated case team supports document gathering, ECA preparation, language-test planning and other formalities." },
          { title: "Submission", body: "After the relevant evaluation, invitation or nomination, the applicable immigration application is prepared for submission." },
          { title: "Post-landing services", body: "After approval, practical settlement guidance can cover accommodation planning and required initial registrations." },
          { title: "Get ready to fly", body: "Complete final travel and landing preparations after receiving the necessary approval and documents." },
        ],
      },
      {
        kind: "split",
        anchor: "documents",
        eyebrow: "Documents required to apply",
        heading: "Prepare the evidence behind your Express Entry profile.",
        lede:
          "A complete file depends on consistent, verifiable records. Begin with the core documents that support your profile and, after an invitation, your permanent-residence application.",
        media: {
          src: "/media/pages/canada/montreal.jpg",
          alt: "Montreal cityscape, Canada",
          caption: "Canada Express Entry preparation",
        },
        paragraphs: [
          "The checklist below highlights the key evidence categories that support a decision-ready file.",
        ],
        bullets: [
          "Passport and travel documents",
          "Birth and identity documents",
          "Approved language-test results",
          "Education and ECA evidence",
          "Employment reference letters",
          "Provincial nomination, if applicable",
          "Police clearance certificates",
          "Immigration medical examination",
          "Proof of funds, where required",
          "Civil-status and family documents",
          "Job-offer evidence, if claimed",
          "Payment and application records",
        ],
      },
      {
        kind: "cards",
        anchor: "evidence",
        eyebrow: "Detailed document evidence",
        heading: "Supporting evidence for a decision-ready application.",
        items: [
          {
            title: "Passport and travel documents",
            label: "Document 01",
            body: "Copies of the original passport, identity pages and relevant travel or invitation records.",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202016.726.png",
              alt: "Passport and travel documents icon",
            },
          },
          {
            title: "Birth certificate",
            label: "Document 02",
            body: "Birth records that support identity, date and place of birth and declared family relationships.",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202025.502.png",
              alt: "Birth certificate icon",
            },
          },
          {
            title: "Identity proof",
            label: "Document 03",
            body: "Applicable national identity documents and other records requested for the applicant or family members.",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202034.658.png",
              alt: "Identity proof icon",
            },
          },
          {
            title: "Provincial nomination",
            label: "Document 04",
            body: "The nomination certificate and related records when points or eligibility depend on a provincial pathway.",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202042.021.png",
              alt: "Provincial nomination icon",
            },
          },
          {
            title: "Employment evidence",
            label: "Document 05",
            body: "Reference or confirmation letters and supporting records for the skilled work experience being claimed.",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202050.982.png",
              alt: "Employment evidence icon",
            },
          },
          {
            title: "Education and ECA",
            label: "Document 06",
            body: "Academic credentials and an Educational Credential Assessment where the program or points claim requires it.",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202058.785.png",
              alt: "Education and ECA icon",
            },
          },
          {
            title: "Language-test scores",
            label: "Document 07",
            body: "Valid results from an approved English or French test covering all four language abilities.",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-04T163248.787.png",
              alt: "Language test scores icon",
            },
          },
          {
            title: "Police certificates",
            label: "Document 08",
            body: "Police clearance certificates for the countries and periods required by the personalised checklist.",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-04T163301.136.png",
              alt: "Police certificates icon",
            },
          },
        ],
      },
      {
        kind: "faq",
        anchor: "faq",
        eyebrow: "Frequently asked questions",
        heading: "Express Entry, explained clearly",
        items: [
          {
            question: "Which country is best to migrate to {marketFrom}?",
            answer: "There is no single best destination for every applicant. Canada can be attractive to residents seeking a structured skilled-immigration pathway, but the right country depends on occupation, age, language, education, family goals, finances and long-term plans.",
          },
          {
            question: "Can residents apply for Canada PR {marketFrom}?",
            answer: "Yes. Eligible residents can prepare the required language, education and employment evidence {marketIn} and create an online Express Entry profile. Your place of residence does not itself guarantee eligibility or selection.",
          },
          {
            question: "What is the fastest way to get Canadian permanent residence?",
            answer: "There is no universally fastest route. Express Entry may be suitable for qualifying skilled workers, while entrepreneurs or applicants with provincial opportunities may need different programs. Timelines include preparation, time awaiting an invitation and processing after submission.",
          },
          {
            question: "How long does it take to get Canada PR {marketFrom}?",
            answer: "The overall journey varies. Time is needed to prepare prerequisites, enter the pool and receive an invitation, if selected. IRCC’s processing estimate applies only after a complete permanent-residence application is submitted and can change by case and current workload.",
          },
          {
            question: "What is the minimum score for Express Entry?",
            answer: "The 67-point threshold applies to Federal Skilled Worker selection-factor eligibility. It is not a universal CRS invitation score. Eligible pool profiles receive a separate CRS score, and invitation criteria and cut-offs vary by round.",
          },
          {
            question: "What IELTS score is good for Express Entry?",
            answer: "IRCC converts approved language-test results into Canadian Language Benchmark levels for each ability. The required level depends on the program, and stronger results can materially improve CRS ranking. An overall IELTS band alone does not determine eligibility.",
          },
          {
            question: "How much does Canada PR cost {marketFrom}?",
            answer: "Applicants should budget for current government fees plus language testing, an ECA where required, biometrics, medical examinations, police certificates, translations and case-specific costs. Settlement funds are separate from fees. All amounts should be checked against the current official requirements.",
          },
          {
            question: "How do I qualify for Express Entry to Canada?",
            answer: "You must meet the minimum requirements of at least one Express Entry program. Assessment can involve eligible skilled work, approved language results, education and an ECA, funds where required and admissibility. Federal Skilled Worker candidates also use the 67-point selection grid.",
          },
          {
            question: "What is the Express Entry pool?",
            answer: "The pool contains profiles found eligible for at least one Express Entry program. Candidates are ranked through the Comprehensive Ranking System and may be considered in applicable invitation rounds while their profiles remain valid.",
          },
          {
            question: "Which consultancy is best for Canada immigration support?",
            answer: "The right consultancy should use regulated professionals where representation requires it, communicate fees and scope clearly, protect personal information and avoid guarantees. DMC provides consultation and application support through its UAE offices, including profile assessment, document coordination and milestone guidance, but no consultant can guarantee an invitation, nomination or approval.",
          },
        ],
      },
      {
        kind: "cards",
        anchor: "resources",
        eyebrow: "News & blogs",
        heading: "Immigration news and updates",
        lede: "Practical guidance and timely updates to help applicants make informed decisions at every stage of an international immigration journey.",
        items: [
          {
            title: "Complete Guide—When Applying for a Work Visa",
            label: "Work visas · Guide",
            body: "A practical overview of the eligibility checks, documents and preparation involved in a work-visa application.",
            href: "https://dm-consultant.ae/blog/guide-to-applying-work-permit-visa/",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2026/03/Complete_Guide_when_applying-300x242.jpg",
              alt: "Guide to applying for a work visa",
            },
          },
          {
            title: "UK Visit Visa Processing Time From the UAE 2026",
            label: "United Kingdom · Visit visas",
            body: "Understand the application stages, timing considerations and preparation for a UK visit visa from the UAE.",
            href: "https://dm-consultant.ae/blog/uk-visit-visa-processing-time-from-uae/",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2026/03/UK_Visit_Visa_Processing_Time-300x242.jpg",
              alt: "UK visit visa processing time from the UAE",
            },
          },
          {
            title: "UK Visa Interview Questions & Supporting Documents",
            label: "United Kingdom · Application support",
            body: "Review common interview themes and the supporting evidence applicants may need to prepare.",
            href: "https://dm-consultant.ae/blog/uk-visa-interview-questions/",
            image: {
              src: "https://dm-consultant.ae/wp-content/uploads/2026/03/UK_Visa_Interview_Questions-300x242.jpg",
              alt: "UK visa interview questions and supporting documents",
            },
          },
        ],
      },
      {
        kind: "cards",
        anchor: "stories",
        eyebrow: "Success gallery",
        heading: "Our success stories",
        lede: "A selection of client outcomes that reflects the breadth of applications and destinations supported by DMC.",
        items: [
          { title: "Client success 01", label: "Express Entry", body: "Legacy success-gallery image from the old site.", href: "https://dm-consultant.ae/success-stories/", image: { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_1.jpg", alt: "DMC client success story 1" } },
          { title: "Client success 02", label: "Express Entry", body: "Legacy success-gallery image from the old site.", href: "https://dm-consultant.ae/success-stories/", image: { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_2.jpg", alt: "DMC client success story 2" } },
          { title: "Client success 03", label: "Express Entry", body: "Legacy success-gallery image from the old site.", href: "https://dm-consultant.ae/success-stories/", image: { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_3.jpg", alt: "DMC client success story 3" } },
          { title: "Client success 04", label: "Express Entry", body: "Legacy success-gallery image from the old site.", href: "https://dm-consultant.ae/success-stories/", image: { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_4.jpg", alt: "DMC client success story 4" } },
          { title: "Client success 05", label: "Express Entry", body: "Legacy success-gallery image from the old site.", href: "https://dm-consultant.ae/success-stories/", image: { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_5.jpg", alt: "DMC client success story 5" } },
          { title: "Client success 06", label: "Express Entry", body: "Legacy success-gallery image from the old site.", href: "https://dm-consultant.ae/success-stories/", image: { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_6.jpg", alt: "DMC client success story 6" } },
          { title: "Client success 07", label: "Express Entry", body: "Legacy success-gallery image from the old site.", href: "https://dm-consultant.ae/success-stories/", image: { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_7.jpg", alt: "DMC client success story 7" } },
          { title: "Client success 08", label: "Express Entry", body: "Legacy success-gallery image from the old site.", href: "https://dm-consultant.ae/success-stories/", image: { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_8.jpg", alt: "DMC client success story 8" } },
        ],
      },
      {
        kind: "disclaimer",
        body: "DMC is not a recruitment or placement agency and does not guarantee any job offer, employment, Invitation to Apply, nomination, visa or permanent-residence approval. Immigration decisions are made by the relevant government authority, and rules, fees, invitation criteria and processing times can change.",
      },
    ],
    relatedPages: ["visas/canada/provincial-nominee-programs", "visas/canada/study-permits", "visit-visas/canada"],
    relatedTools: ["tools/canada/crs-calculator"],
    lastVerified: "2026-08-04",
    officialSources: [
      { label: "IRCC — Immigrate through Express Entry", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" },
      { label: "IRCC — Express Entry: Rounds of invitations", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/invitations-to-apply.html" },
      { label: "IRCC — Federal Skilled Worker Program", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html" },
    ],
  },
  {
    id: "visas/canada/provincial-nominee-programs",
    title: "Canada Provincial Nominee Programs",
    eyebrow: "Canada skilled immigration",
    seoTitle: "Provincial Nominee Programs (PNP) Canada | DMC Immigration Group",
    seoDescription:
      "How Canadian provincial nominee programs work — Express Entry-aligned and base streams, nomination benefits, provincial criteria and the federal permanent-residence stage.",
    lede: "Provinces and territories across Canada nominate skilled workers, students and entrepreneurs who match their labour-market needs — a route that can complement or replace federal Express Entry eligibility.",
    sections: [
      {
        kind: "overview",
        heading: "How provincial nomination works",
        paragraphs: [
          "Canadian provinces and territories operate nomination programs that respond to their regional labour markets. A successful nomination is not permanent residence: the federal government makes the final immigration decision.",
          "Provincial programs generally fall into two groups. Express Entry-aligned streams draw candidates from the federal pool and add 600 CRS points to their profile, effectively guaranteeing consideration in a following invitation round. Base (paper) streams run entirely outside Express Entry and require the applicant to apply directly to the province.",
          "Each province sets its own criteria, occupation lists, fees and intake schedules, so a nomination strategy is usually occupation- and province-specific rather than generic.",
        ],
      },
      {
        kind: "programs",
        heading: "Common nomination streams",
        items: [
          { code: "EE", title: "Express Entry-aligned streams", body: "Candidates in the federal pool nominated by a province receive 600 additional CRS points before the federal permanent-residence application stage." },
          { code: "Base", title: "Base (paper) streams", body: "Direct provincial nomination for candidates who meet regional criteria, processed outside Express Entry with their own requirements and timelines." },
          { code: "Employer", title: "Employment-offer streams", body: "Many provinces prioritise candidates with a qualifying job offer from an employer in that province." },
          { code: "Grad", title: "International-graduate streams", body: "Graduates of that province's educational institutions may access dedicated nomination streams with reduced work-experience requirements." },
          { code: "Biz", title: "Business and entrepreneur streams", body: "Some provinces operate entrepreneur nomination streams for applicants who will invest in and actively manage a business in the province." },
        ],
      },
      {
        kind: "panel",
        heading: "Nomination at a glance",
        rows: [
          { label: "CRS benefit (Express Entry-aligned)", value: "+600 points" },
          { label: "Federal decision", value: "Always made by IRCC, after nomination" },
          { label: "Criteria", value: "Set per province; occupation, offer, education, language, funds and intent to settle" },
          { label: "Admission targets", value: "Set annually in the federal levels plan; provincial programs vary by intake" },
        ],
        note: "Provincial programs, fees, streams and intake windows change frequently. Always check the nominating province's current website before preparing an application.",
      },
      {
        kind: "process",
        heading: "A typical nomination journey",
        steps: [
          { title: "Assess federal and provincial fit", body: "Compare your occupation, education, language and work history against Express Entry and the provinces that target your profile." },
          { title: "Express interest", body: "Apply to the province (or register interest) and, for Express Entry-aligned streams, keep an active eligible federal profile." },
          { title: "Receive a nomination", body: "The province issues a nomination certificate when you meet its criteria, often with conditions such as intent to reside." },
          { title: "Complete the federal stage", body: "Nominated candidates submit the permanent-residence application to IRCC with the required evidence, medical and police checks." },
          { title: "Land and settle", body: "After approval, plan your landing and settlement in the nominating province — most provinces expect nominees to genuinely reside there." },
        ],
      },
      {
        kind: "faq",
        heading: "Provincial nomination, answered",
        items: [
          {
            question: "Do I need a job offer for a provincial nomination?",
            answer: "Many streams require one, but several provinces also nominate candidates in targeted occupations without an offer, and graduate or Express Entry-aligned streams have their own rules. Criteria are province-specific.",
          },
          {
            question: "Does a provincial nomination guarantee permanent residence?",
            answer: "No. A nomination substantially strengthens an application — and adds 600 CRS points on Express Entry-aligned streams — but the federal government makes the final decision.",
          },
          {
            question: "Can I apply to more than one province?",
            answer: "You can explore options in several provinces, but you should only accept and use one nomination. Applications must be truthful about your intentions in every province where you express interest.",
          },
        ],
      },
    ],
    relatedPages: ["visas/canada/express-entry", "visas/canada/atlantic-immigration-program", "visas/canada/rural-and-northern-immigration-pilot"],
    relatedTools: ["tools/canada/crs-calculator"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "IRCC — Provincial nominee programs", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html" },
    ],
  },
  {
    id: "visas/canada/atlantic-immigration-program",
    title: "Atlantic Immigration Program",
    eyebrow: "Canada skilled immigration",
    seoTitle: "Atlantic Immigration Program (AIP) Canada | DMC Immigration Group",
    seoDescription:
      "The Atlantic Immigration Program for New Brunswick, Nova Scotia, Prince Edward Island and Newfoundland and Labrador — employer endorsement, eligibility and process.",
    lede: "An employer-driven permanent-residence route for skilled workers who want to live and work in Atlantic Canada — New Brunswick, Nova Scotia, Prince Edward Island and Newfoundland and Labrador.",
    sections: [
      {
        kind: "overview",
        heading: "What the Atlantic Immigration Program is",
        paragraphs: [
          "The Atlantic Immigration Program (AIP) is a federal permanent-residence pathway for skilled workers who receive a full-time job offer from a designated employer in one of Canada's four Atlantic provinces.",
          "Unlike points-tested programs, the AIP is built around an endorsement from the employer and the province. The employer must be designated by the province to participate, and the province endorses the candidate's application before it is submitted to IRCC.",
        ],
      },
      {
        kind: "eligibility",
        heading: "Eligibility at a glance",
        items: [
          { title: "Job offer", body: "A full-time, non-seasonal job offer from a designated employer in an Atlantic province." },
          { title: "Work experience", body: "At least 1,560 hours of paid skilled work in the five years before applying, unless exempt (e.g. recent graduates of designated Atlantic institutions)." },
          { title: "Education", body: "A Canadian credential or a foreign equivalent with an Educational Credential Assessment where required." },
          { title: "Language", body: "English or French results meeting at least Canadian Language Benchmark 4, from an approved test." },
          { title: "Settlement funds", body: "Proof of funds for your family when the job offer does not already provide sufficient income." },
          { title: "Settlement plan", body: "An initial settlement plan for the province where you will work and live." },
        ],
      },
      {
        kind: "process",
        heading: "The endorsement-to-approval journey",
        steps: [
          { title: "Secure a designated employer", body: "Find and be hired by an Atlantic employer that is designated by its province to use the program." },
          { title: "Employer endorsement", body: "The employer submits your endorsement application to the province, confirming the genuine offer and settlement support." },
          { title: "Provincial endorsement", body: "The province reviews and endorses the application when the job offer, experience and settlement plan are confirmed." },
          { title: "Federal application", body: "Submit the permanent-residence application to IRCC with medical, police and document evidence." },
          { title: "Arrive and work", body: "After approval, move to your Atlantic province and begin the job with your designated employer." },
        ],
      },
      {
        kind: "faq",
        heading: "Atlantic program, answered",
        items: [
          {
            question: "Which provinces use the AIP?",
            answer: "New Brunswick, Nova Scotia, Prince Edward Island and Newfoundland and Labrador.",
          },
          {
            question: "Do I need a job offer?",
            answer: "Yes. The AIP is employer-driven — a full-time, non-seasonal offer from a designated employer is the core requirement, and no points grid is used.",
          },
          {
            question: "Can my family come with me?",
            answer: "Eligible accompanying family members are included in the permanent-residence application and receive the same status as the principal applicant.",
          },
        ],
      },
    ],
    relatedPages: ["visas/canada/express-entry", "visas/canada/provincial-nominee-programs"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "IRCC — Atlantic Immigration Program", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/atlantic-immigration.html" },
    ],
  },
  {
    id: "visas/canada/rural-and-northern-immigration-pilot",
    title: "Rural & Northern Immigration Pilot",
    eyebrow: "Canada skilled immigration",
    seoTitle: "Rural & Northern Immigration Pilot — status and successor | DMC Immigration Group",
    seoDescription:
      "The Rural and Northern Immigration Pilot concluded in 2024 and was succeeded by the Rural Community Immigration Pilot (RCIP) — current status, legacy details and the verified successor.",
    lede: "Accurate, up-to-date guidance on Canada's rural-community immigration routes — including the concluded pilot and the Rural Community Immigration Pilot that now serves this purpose.",
    sections: [
      {
        kind: "status",
        label: "Pilot concluded — replaced by the Rural Community Immigration Pilot (RCIP)",
        tone: "warning",
        body: "The Rural and Northern Immigration Pilot (RNIP) was a time-limited pilot that concluded on 31 August 2024. Canada has continued and expanded the rural-community concept through the Rural Community Immigration Pilot (RCIP), an employer-driven permanent-residence route. Applications already made under the RNIP continue to be processed by IRCC under the pilot's rules.",
      },
      {
        kind: "overview",
        heading: "What the RNIP was",
        paragraphs: [
          "The Rural and Northern Immigration Pilot helped smaller communities outside Canada's largest cities attract skilled workers who would live, work and settle locally. Participating communities issued recommendations to eligible candidates, who could then apply for permanent residence.",
          "The route is no longer accepting new applications. Its successor, the Rural Community Immigration Pilot, was launched in 2025 with a rolling list of participating rural communities, and it is the current employer-driven option for candidates aiming at rural Canada.",
        ],
      },
      {
        kind: "overview",
        heading: "The Rural Community Immigration Pilot (successor)",
        paragraphs: [
          "RCIP is a community-driven, employer-based permanent-residence program. A candidate needs a genuine, full-time job offer from an employer in a participating rural community, and the community recommends the candidate for the federal application.",
          "Participating communities publish their own criteria, application windows and occupation priorities, and they manage intake differently from one another, so the starting point is always the community's own website.",
        ],
      },
      {
        kind: "eligibility",
        heading: "RCIP eligibility essentials",
        items: [
          { title: "Job offer", body: "A genuine full-time job offer from an employer in a participating rural community." },
          { title: "Community recommendation", body: "A recommendation from the community confirming you will be supported to settle and the offer is genuine." },
          { title: "Experience and education", body: "Work-experience and education requirements set by the program and confirmed by the community." },
          { title: "Language and funds", body: "Approved language results and proof of settlement funds, where required." },
        ],
      },
      {
        kind: "faq",
        heading: "Rural community routes, answered",
        items: [
          {
            question: "Can I still apply under the old RNIP?",
            answer: "No new RNIP applications are accepted — the pilot closed on 31 August 2024. Applications already submitted continue to be processed under the pilot's rules.",
          },
          {
            question: "What replaced the RNIP?",
            answer: "The Rural Community Immigration Pilot (RCIP), launched in 2025, continues the rural-community, employer-driven concept with a current list of participating communities.",
          },
          {
            question: "Which communities participate in RCIP?",
            answer: "Participation is a rolling list published by IRCC, and each community manages its own intake. Check the current official RCIP page and the community websites.",
          },
        ],
      },
    ],
    relatedPages: ["visas/canada/express-entry", "visas/canada/provincial-nominee-programs"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "IRCC — Rural Community Immigration Pilot", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/rural-community-immigration.html" },
      { label: "IRCC — Rural and Northern Immigration Pilot (legacy)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/rural-northern-immigration-pilot.html" },
    ],
  },
  {
    id: "visas/canada/study-permits",
    title: "Canada Study Permits",
    eyebrow: "Study in Canada",
    seoTitle: "Canada Study Permits — current requirements | DMC Immigration Group",
    seoDescription:
      "Study permits for Canada: Provincial Attestation Letters, proof of funds, work rights, PGWP rules and the end of SDS — verified against current IRCC requirements.",
    lede: "Current, verified guidance on studying in Canada — from acceptance by a designated learning institution to a complete study-permit application, including the post-study work rules that matter to graduates.",
    sections: [
      {
        kind: "status",
        label: "SDS closed — regular processing with a Provincial Attestation Letter applies",
        tone: "warning",
        body: "The Student Direct Stream (SDS) was terminated on 8 November 2024. Study-permit applications are now processed under the regular stream, and most applicants need a Provincial Attestation Letter (PAL) from the province or territory of their school.",
      },
      {
        kind: "overview",
        heading: "How a study permit works",
        paragraphs: [
          "A study permit lets a foreign national study at a designated learning institution (DLI) in Canada for the duration of the program. It is not a visa: entry to Canada also requires an entry document such as a visitor visa or electronic travel authorisation (eTA), which is issued with the permit.",
          "Applications must show acceptance at a DLI, sufficient funds for tuition and living costs, and — for most applicants — a Provincial Attestation Letter issued by the province or territory of the school.",
          "International students can work off campus for up to 24 hours per week during regular academic sessions under current rules, and full-time during scheduled breaks.",
        ],
      },
      {
        kind: "requirements",
        heading: "Core requirements",
        items: [
          { title: "Letter of acceptance", body: "An acceptance letter from a designated learning institution." },
          { title: "Provincial Attestation Letter", body: "A PAL from the province or territory where your school is located, for most applicants." },
          { title: "Proof of funds", body: "Evidence covering tuition plus living costs — the published minimum was CAD 20,635 for 2024–2025 and is updated periodically — plus travel funds and, if applicable, fees for accompanying family members." },
          { title: "Study intent and ties", body: "A clear, truthful explanation of your program choice and plans after graduation." },
          { title: "Admissibility", body: "Medical and police checks as required by your situation and country of residence." },
        ],
      },
      {
        kind: "panel",
        heading: "What changed in recent years — a summary",
        rows: [
          { label: "Student Direct Stream", value: "Terminated 8 November 2024; regular processing applies" },
          { label: "Provincial Attestation Letter", value: "Required for most applicants since January 2024" },
          { label: "Off-campus work", value: "Up to 24 hours per week during academic sessions" },
          { label: "Spousal open work permits", value: "Restricted to spouses of students in specific programs (e.g. master's, doctorate)" },
          { label: "PGWP language requirement", value: "Language thresholds apply for post-graduation work permits under current rules" },
        ],
        note: "Rules change frequently. Verify every requirement against the official IRCC pages before preparing an application.",
      },
      {
        kind: "overview",
        heading: "Nursing and NCLEX context",
        paragraphs: [
          "Internationally educated nurses (IENs) exploring Canada often ask about the NCLEX-RN examination and nursing licensure. Nursing regulation is provincial: the provincial nursing regulator assesses education and issues registration, and most Canadian provinces require the NCLEX-RN as the entry examination for registered nurses.",
          "A study permit relates to studying at a Canadian institution; it is separate from nursing licensure. DMC can explain the difference and help you prepare the study-route steps, but licensure decisions belong to the provincial nursing regulator.",
        ],
      },
      {
        kind: "process",
        heading: "A typical study-route journey",
        steps: [
          { title: "Choose a DLI and apply", body: "Identify a designated learning institution and a program that fits your goals, and secure a letter of acceptance." },
          { title: "Obtain a PAL", body: "Use the provincial allocation process to receive a Provincial Attestation Letter from the province of your school." },
          { title: "Prepare funds and documents", body: "Assemble proof of funds, language results, identity documents and any medical or police evidence." },
          { title: "Apply for the study permit", body: "Submit the application with supporting documents and biometrics within the required timelines." },
          { title: "Plan study, work and post-graduation", body: "Understand work rights, co-op arrangements and the current post-graduation work permit rules before you depart." },
        ],
      },
      {
        kind: "faq",
        heading: "Study in Canada, answered",
        items: [
          {
            question: "Is SDS still available?",
            answer: "No. The Student Direct Stream ended on 8 November 2024. Applications are processed under the regular stream, and most applicants need a Provincial Attestation Letter.",
          },
          {
            question: "Can international students work in Canada?",
            answer: "Yes, with conditions: up to 24 hours per week off campus during regular academic sessions and full-time during scheduled breaks. Work rights are set out on the study permit.",
          },
          {
            question: "Can I get a work permit after graduating?",
            answer: "Graduates of eligible programs may qualify for a Post-Graduation Work Permit (PGWP). Duration and eligibility follow the current rules, including language requirements introduced for new applications — check IRCC before planning around it.",
          },
          {
            question: "Do I need a Provincial Attestation Letter?",
            answer: "Most applicants do. Some categories are exempt, such as applicants for certain primary/secondary or graduate programs — the official PAL page lists current exemptions.",
          },
        ],
      },
    ],
    relatedPages: ["study-abroad/canada-student-visas", "visas/canada/express-entry", "visit-visas/canada"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "IRCC — Study in Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html" },
      { label: "IRCC — Study permit: how to apply", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" },
    ],
  },
  {
    id: "visas/canada/family-sponsorship-parent-grandparent-program",
    title: "Parent & Grandparent Sponsorship",
    eyebrow: "Family sponsorship",
    seoTitle: "Parent & Grandparent Sponsorship (PGP) Canada | DMC Immigration Group",
    seoDescription:
      "The Parents and Grandparents Program (PGP) for Canada — interest-to-sponsor rounds, income requirements, the undertaking, and the Super Visa alternative.",
    lede: "For Canadian citizens and permanent residents who want to bring their parents or grandparents to Canada permanently — or bring them for extended visits through the Super Visa.",
    sections: [
      {
        kind: "overview",
        heading: "How the Parents and Grandparents Program works",
        paragraphs: [
          "The PGP is a permanent-residence sponsorship route for parents and grandparents. Demand far exceeds capacity, so IRCC runs an interest-to-sponsor process: sponsors submit an interest form during an announced window, and IRCC selects entrants by lottery to receive an invitation to apply.",
          "There is no guarantee of selection in any given year. For families who prefer certainty, the Super Visa — a long-duration visitor visa — is the widely used alternative while a PGP invitation is pending.",
        ],
      },
      {
        kind: "requirements",
        heading: "Sponsor requirements",
        items: [
          { title: "Sponsor status", body: "Canadian citizen or permanent resident aged 18 or older, residing in Canada." },
          { title: "Income", body: "Meet the minimum necessary income (MNI) for the family size, as evidenced by three years of tax returns — including the most recent." },
          { title: "Undertaking", body: "Sign a financial undertaking covering the sponsored family for up to 20 years (Quebec differs), including repayment of any provincial social assistance." },
          { title: "Application materials", body: "Complete application package with evidence of the relationship, identity documents and payment of fees." },
        ],
      },
      {
        kind: "panel",
        heading: "Super Visa — the flexible alternative",
        rows: [
          { label: "Stay per visit", value: "Up to 5 years per entry (up to 7 years per the current official guidance)" },
          { label: "Validity", value: "Up to 10 years, multiple entries" },
          { label: "Income requirement", value: "Sponsor must meet the income minimum; two new income pathways were introduced in 2026" },
          { label: "Medical insurance", value: "Private medical insurance from a Canadian provider, minimum 1 year" },
          { label: "Family scope", value: "Parents and grandparents of a Canadian citizen or permanent resident" },
        ],
        note: "The Super Visa is a temporary-visitor document, not permanent residence. Details of the 2026 income pathways and current entry rules are on the official IRCC Super Visa page.",
      },
      {
        kind: "process",
        heading: "The PGP journey",
        steps: [
          { title: "Submit interest to sponsor", body: "During the announced window, complete the interest-to-sponsor form with correct, current details." },
          { title: "Wait for selection", body: "IRCC randomly selects entrants by lottery and invites them to apply; unselected entrants may try again in future rounds." },
          { title: "Apply", body: "Invited sponsors submit the full sponsorship and permanent-residence application with income evidence." },
          { title: "Consider the Super Visa meanwhile", body: "Many families use the Super Visa for visits while a PGP application is processed." },
          { title: "Process and settle", body: "Sponsorship and application are assessed, and the family completes medical, police and, on arrival, landing steps." },
        ],
      },
      {
        kind: "faq",
        heading: "Parent and grandparent sponsorship, answered",
        items: [
          {
            question: "How are sponsors selected?",
            answer: "Interest-to-sponsor forms are entered into a random selection (lottery) per intake round. Selection is not guaranteed, and the interest window is usually short.",
          },
          {
            question: "What if I do not meet the income requirement?",
            answer: "The sponsor must meet the minimum necessary income each year of the review period. If you do not qualify, the Super Visa may still allow long visits, or a co-sponsor option may apply in some situations.",
          },
          {
            question: "Is the Super Visa a form of permanent residence?",
            answer: "No. It is a long-duration visitor visa. It does not provide work rights or a pathway to permanent residence by itself.",
          },
        ],
      },
    ],
    relatedPages: ["visit-visas/canada", "visas/canada/express-entry"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "IRCC — Sponsor your parents and grandparents", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/sponsor-parents-grandparents.html" },
      { label: "IRCC — Super Visa", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/parent-grandparent-super-visa.html" },
    ],
  },
  {
    id: "visit-visas/canada",
    title: "Canada Visit Visa (TRV)",
    eyebrow: "Visit visas",
    seoTitle: "Canada Visit Visa & Super Visa Guide | DMC Immigration Group",
    seoDescription:
      "Temporary Resident Visas for Canada — visitor visa requirements, duration, documents and the Super Visa for parents and grandparents, with official sources.",
    lede: "Visitor visas for tourism, family visits and business trips to Canada — including the Super Visa option that lets parents and grandparents stay longer.",
    sections: [
      {
        kind: "overview",
        heading: "Visiting Canada",
        paragraphs: [
          "Most visitors to Canada need a Temporary Resident Visa (TRV), an electronic travel authorisation (eTA) or, in some cases, no entry document at all — the requirement depends on nationality and the entry method.",
          "A visitor visa permits stays of up to six months per entry, unless the border officer states a different period. It does not permit work or study in Canada.",
          "Canada has strong worldwide visitor-visa scrutiny: officers assess the purpose of the visit, funds, ties to the home country, and admissibility. Applications from regions with higher visa demand are often decided by visa offices abroad.",
        ],
      },
      {
        kind: "requirements",
        heading: "What a visitor application must show",
        items: [
          { title: "Purpose of visit", body: "A clear itinerary — tourism, family visit or business activity — supported by documentation." },
          { title: "Financial capacity", body: "Evidence that you and any accompanying family can cover travel, accommodation and expenses." },
          { title: "Ties to home country", body: "Employment, property, family or business ties that demonstrate an intention to leave Canada at the end of the visit." },
          { title: "Admissibility", body: "Medical, criminal-history and security checks apply; some applicants require a medical examination." },
          { title: "Supporting documents", body: "Passport, photographs, invitation letters where relevant, and travel history evidence." },
        ],
      },
      {
        kind: "panel",
        heading: "Super Visa — for parents and grandparents",
        rows: [
          { label: "Stay per visit", value: "Up to 5 years per entry (up to 7 years per the current official guidance)" },
          { label: "Validity", value: "Up to 10 years, multiple entries" },
          { label: "Requirement", value: "A child or grandchild in Canada who meets the income minimum; private medical insurance for at least 1 year" },
          { label: "Purpose", value: "Repeated long family visits; not permanent residence" },
        ],
        note: "The Super Visa income requirement changed in 2026 with the addition of two new income pathways — details are on the official IRCC Super Visa page.",
      },
      {
        kind: "process",
        heading: "A typical visitor-visa journey",
        steps: [
          { title: "Confirm your entry document", body: "Check whether you need a TRV, an eTA, or nothing — using the official IRCC entry-tool." },
          { title: "Prepare evidence", body: "Gather financial proof, ties, travel history and any invitation or business letters." },
          { title: "Apply online", body: "Complete the application, pay the fee and provide biometrics where required." },
          { title: "Await the decision", body: "Processing times vary by country of residence; check the official processing-times page." },
          { title: "Travel", body: "Carry the approved document and supporting evidence for the border interview." },
        ],
      },
      {
        kind: "faq",
        heading: "Canada visitor visas, answered",
        items: [
          {
            question: "How long can I stay on a Canada visitor visa?",
            answer: "Typically up to six months per entry, unless the border officer sets a different period. Stays can be extended in Canada by applying before the current period expires.",
          },
          {
            question: "Can I visit family in Canada?",
            answer: "Yes — family visits are a valid purpose. An invitation letter and the inviter's status documents strengthen the application, alongside your own ties and funds.",
          },
          {
            question: "What is the difference between a TRV and an eTA?",
            answer: "A TRV is a visa stamped into your passport. An eTA is an electronic authorisation for visa-exempt nationals travelling by air. The requirement depends on your passport and how you travel.",
          },
          {
            question: "Do I need a visa to study or work as a visitor?",
            answer: "Yes. A visitor visa does not allow study or work in Canada — separate permits are required, and working without authorisation can affect future applications.",
          },
        ],
      },
    ],
    relatedPages: ["visas/canada/family-sponsorship-parent-grandparent-program", "visas/canada/study-permits", "visas/canada/express-entry"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "IRCC — Visit Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html" },
      { label: "IRCC — Super Visa", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/parent-grandparent-super-visa.html" },
    ],
  },
];
