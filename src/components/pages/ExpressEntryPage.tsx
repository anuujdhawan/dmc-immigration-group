"use client";

import { MARKET_LABELS, type Market } from "@/config/markets";
import { marketHref } from "@/lib/routing/routes";
import { pageMedia } from "@/config/page-media";
import { Hero } from "@/components/home/Hero";
import { CRSCalculator } from "@/components/calculators/CRSCalculator";
import {
  BenefitsGrid,
  BlogGrid,
  ConsultationBand,
  CriteriaGrid,
  DisclaimerBand,
  DocumentList,
  EvidenceGrid,
  FaqSection,
  FinalCta,
  FeatureList,
  GuidanceSection,
  InternalAnchorNav,
  InternalBreadcrumbs,
  InternalFactsBar,
  InternalSection,
  LeadFormSection,
  MediaGallerySection,
  MediaFrame,
  PartnerLogoStrip,
  ProcessSection,
  ProgramCards,
  RichCopy,
  RoadmapGrid,
  ScoreCard,
  SectionHeader,
  SplitContentSection,
  StoryCarousel,
  type AnchorItem,
  type BlogPostItem,
  type CriteriaItem,
  type EvidenceItem,
  type FactItem,
  type FaqItem,
  type FeatureItem,
  type PartnerLogoItem,
  type ProgramItem,
  type RoadmapItem,
  type ScoreRow,
} from "@/components/pages/internal/InternalPageTemplate";

function faqItemsForMarket(marketLabel: string): FaqItem[] {
  return [
  {
    q: `Which country is best to migrate to from ${marketLabel}?`,
    a: `If you want to migrate from ${marketLabel}, Canada is a strong option to explore. It has structured immigration pathways and is widely considered by professionals and families looking for long-term settlement, career, education and healthcare access. Permanent residence can provide access to many benefits, subject to Canadian rules and provincial requirements.`,
  },
  {
    q: `Can residents served by DMC ${marketLabel} apply for Canada PR?`,
    a: `Yes. Eligible clients served by our ${marketLabel} office can prepare an Express Entry profile and apply online if they meet the relevant federal or provincial criteria. The suitable pathway depends on language results, education, skilled work history, settlement funds where required, admissibility and CRS ranking.`,
  },
  {
    q: "What is the fastest way to get Canadian permanent residence?",
    a: "One option for eligible entrepreneurs is the Canada Start-Up Visa. However, for most skilled workers looking for permanent residency status in Canada, the Express Entry system is the fastest route for Canadian immigration.",
  },
  {
    q: `How long does it take to get Canada PR from ${marketLabel}?`,
    a: "Express Entry Canada manages applications electronically to speed up the process. IRCC, formerly CIC, processes applications on priority and takes around six months to decide. After you get ITA, the processing time starts from the application submission date for a permanent residence visa. Only the top-ranked profiles are chosen by IRCC for skilled migration.",
  },
  {
    q: "What is the minimum score for Express Entry?",
    a: "The minimum score required to enter the Express Entry Pool is 67 points. It would help if you obtained as many Comprehensive Ranking System (CRS) points as possible to improve your chances of ranking higher. Invitation rounds are conducted regularly, and CRS cut-off scores vary by round.",
  },
  {
    q: "What IELTS score is good for Express Entry?",
    a: "The minimum criteria for Canada Express Entry is the Canadian Language Benchmark (CLB 7), which means an IELTS band score of 6 for all 4 factors: reading, writing, speaking, and listening. Higher bands get more points and improve eligibility scores. The applicant's aim should be to score a higher band score to achieve a higher Canadian Language Benchmark, score more CRS points and improve ranking.",
  },
  {
    q: `How much does Canada PR cost from ${marketLabel}?`,
    a: "To apply for immigration to Canada through the Express Entry program, a single applicant must pay a fee of CAD 1,365 and an additional CAD 1,365 if they include a spouse in the application. The application fee for a dependent child is CAD 230. The total cost of the process, including additional expenses, is approximately CAD 2,300 for a single applicant. Additional costs include language proficiency tests (CAD 300), ECA (CAD 200), biometrics (CAD 85), medical exams (CAD 450 per adult and CAD 250 per child), and police clearance certificates (CAD 100 per country). Applicants must also show proof of funds of around $13,310 in a bank account.",
  },
  {
    q: "How do I qualify for Express Entry to Canada?",
    a: `Clients served by our ${marketLabel} office can qualify for Canada PR under Express Entry if they meet at least one eligible program's criteria and enter the pool. The CRS score is calculated based on factors such as age, language ability, education, skilled work experience, employment offers where applicable, and other ranking factors.`,
  },
  {
    q: "What is the Express Entry pool?",
    a: "Eligible candidates for at least one of the popular programs in Canada need to create a profile to enter the Express Entry pool. These programs are: Federal Skilled Worker programs, Federal Skilled Trades program, Canadian Experience Class, and some PNP Programs. The provincial and federal governments and designated employers in Canada can choose higher-ranked candidates from this Pool and give ITAs.",
  },
  {
    q: "Which consultancy is best for Canada immigration support?",
    a: `DMC supports Canada immigration enquiries through its ${marketLabel} market team with structured consultation, profile review, document coordination, ECA and language-test guidance, case-officer support and post-landing preparation where available. We keep the advice transparent and do not guarantee invitations, jobs, visas or approvals.`,
  },
  ];
}

const BLOG_POSTS: BlogPostItem[] = [
  {
    href: "https://dm-consultant.ae/blog/guide-to-applying-work-permit-visa/",
    img: "https://dm-consultant.ae/wp-content/uploads/2026/03/Complete_Guide_when_applying-300x242.jpg",
    alt: "Guide to applying for a work visa",
    meta: "Work visas · Guide",
    title: "Complete Guide—When Applying for a Work Visa",
    body: "A practical overview of the eligibility checks, documents and preparation involved in a work-visa application.",
  },
  {
    href: "https://dm-consultant.ae/blog/uk-visit-visa-processing-time-from-uae/",
    img: "https://dm-consultant.ae/wp-content/uploads/2026/03/UK_Visit_Visa_Processing_Time-300x242.jpg",
    alt: "UK visit visa processing time from the UAE",
    meta: "United Kingdom · Visit visas",
    title: "UK Visit Visa Processing Time From the UAE 2026",
    body: "Understand the application stages, timing considerations and preparation for a UK visit visa from the UAE.",
  },
  {
    href: "https://dm-consultant.ae/blog/uk-visa-interview-questions/",
    img: "https://dm-consultant.ae/wp-content/uploads/2026/03/UK_Visa_Interview_Questions-300x242.jpg",
    alt: "UK visa interview questions and supporting documents",
    meta: "United Kingdom · Application support",
    title: "UK Visa Interview Questions & Supporting Documents",
    body: "Review common interview themes and the supporting evidence applicants may need to prepare.",
  },
];

const EVIDENCE_DOCS: EvidenceItem[] = [
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202016.726.png", label: "DOCUMENT 01", title: "Passport and travel documents", body: "Copies of the original passport, identity pages and relevant travel or invitation records." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202025.502.png", label: "DOCUMENT 02", title: "Birth certificate", body: "Birth records that support identity, date and place of birth and declared family relationships." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202034.658.png", label: "DOCUMENT 03", title: "Identity proof", body: "Applicable national identity documents and other records requested for the applicant or family members." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202042.021.png", label: "DOCUMENT 04", title: "Provincial nomination", body: "The nomination certificate and related records when points or eligibility depend on a provincial pathway." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202050.982.png", label: "DOCUMENT 05", title: "Employment evidence", body: "Reference or confirmation letters and supporting records for the skilled work experience being claimed." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202058.785.png", label: "DOCUMENT 06", title: "Education and ECA", body: "Academic credentials and an Educational Credential Assessment where the program or points claim requires it." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-04T163248.787.png", label: "DOCUMENT 07", title: "Language-test scores", body: "Valid results from an approved English or French test covering all four language abilities." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-04T163301.136.png", label: "DOCUMENT 08", title: "Police certificates", body: "Police clearance certificates for the countries and periods required by the personalised checklist." },
];

const ROADMAP_STEPS: RoadmapItem[] = [
  { small: "01 · START", title: "Register online", body: "Canadian immigration authorities issue PR under many Skilled Immigration Programs. Register with us today and kick-start your quest to realise the Canadian dream.", img: "https://dm-consultant.ae/wp-content/uploads/2023/12/private-account.png" },
  { small: "02 · CONNECT", title: "Immediate response", body: "After enrolling with us and giving all the required details, you will get an immediate call from our experts to know your requirements.", img: "https://dm-consultant.ae/wp-content/uploads/2023/12/responsibility-1.png" },
  { small: "03 · REVIEW", title: "Know the process", body: "Our licensed immigration experts will offer professional consular services. We show complete transparency in revealing the Express Entry process from Dubai.", img: "https://dm-consultant.ae/wp-content/uploads/2023/12/consultation-1.png" },
  { small: "04 · ONBOARD", title: "Join us", body: "The signup process on our website is simple and quick. You can use our payment gateway to pay the fees online and begin your process.", img: "https://dm-consultant.ae/wp-content/uploads/2023/12/united-2.png" },
  { small: "05 · PREPARE", title: "Documentation", body: "We will assign a dedicated case officer to guide you in gathering all the documents, assisting in getting ECA, improving your IELTS test score, and finishing all the formalities.", img: "https://dm-consultant.ae/wp-content/uploads/2023/12/documents.png" },
  { small: "06 · FILE", title: "Submission", body: "Our services are flexible, and after evaluating your documents and details, we submit the immigration application. We also try to know the reason behind visa denial and assist you in re-application.", img: "https://dm-consultant.ae/wp-content/uploads/2023/12/passport.png" },
  { small: "07 · SETTLE", title: "Post-landing services", body: "Our services continue after approval, and we will hold your hands until you settle in Canada. Our post-landing team will help you to get accommodation and do all required registrations.", img: "https://dm-consultant.ae/wp-content/uploads/2023/12/montage.png" },
  { small: "08 · MOVE", title: "Get ready to fly", body: "Sign up with DM today, the most reliable immigration consultants in Dubai. We have a vast network over 3 continents and can help you save time and money.", img: "https://dm-consultant.ae/wp-content/uploads/2023/12/business-trip.png" },
];

const STORIES = [
  "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_1.jpg",
  "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_2.jpg",
  "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_3.jpg",
  "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_4.jpg",
  "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_5.jpg",
  "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_6.jpg",
  "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_7.jpg",
  "https://dm-consultant.ae/wp-content/uploads/2025/10/DM_Success_Stories_8.jpg",
];

const PARTNER_LOGOS: PartnerLogoItem[] = [
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-16.png", alt: "Media partner" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-15.png", alt: "Forbes India" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-14.png", alt: "Media partner" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-13.png", alt: "Media partner" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-12.png", alt: "The Column" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-18.png", alt: "Media partner" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-17.png", alt: "Media partner" },
];

const ANCHOR_NAV: AnchorItem[] = [
  { href: "#services", label: "Overview" },
  { href: "#programs", label: "Programs" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#tools", label: "Points & CRS" },
  { href: "#documents", label: "Documents" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQs" },
  { href: "#resources", label: "News" },
  { href: "#stories", label: "Success Stories" },
];

const FACTS: FactItem[] = [
  { label: "System", value: "Online profile management" },
  { label: "Programs", value: "FSWP · FSTP · CEC · PNP" },
  { label: "Selection", value: "CRS-ranked invitation rounds" },
  { label: "After an ITA", value: "60 days to submit" },
];

const BENEFITS = [
  "Electronic profile and application management",
  "Routes for skilled professionals and tradespeople",
  "Potential provincial nomination opportunities",
  "Eligible family members can be included",
  "Access to career, education and settlement opportunities",
  "A pathway that may lead to citizenship eligibility later",
];

const PROGRAMS: ProgramItem[] = [
  { code: "FSW", num: "01", title: "Federal Skilled Worker Program", body: "For skilled professionals with eligible foreign or Canadian work experience who meet the program's language, education, work-experience and 67-point selection-factor requirements.", label: "International professional route" },
  { code: "FST", num: "02", title: "Federal Skilled Trades Program", body: "For experienced workers in eligible skilled trades who meet the applicable trade-experience, language and job-offer or Canadian certificate-of-qualification conditions.", label: "Skilled trades route" },
  { code: "CEC", num: "03", title: "Canadian Experience Class", body: "For skilled workers with eligible Canadian work experience acquired in the required period before applying. Education is not a minimum CEC requirement, although education can influence CRS ranking.", label: "Canadian experience route" },
  { code: "PNP", num: "04", title: "Provincial Nominee Program", body: "Canadian provinces and territories can nominate candidates who meet their labour-market and program requirements. Express Entry-aligned nominations use a separate provincial process before the federal permanent-residence stage.", label: "Express Entry-aligned provincial route" },
];

function overviewCopyForMarket(marketLabel: string) {
  return [
  `Launched in 2015, the Express Entry Draw is an online system IRCC administers. This fast-tracked comprehensive ranking system reduces the processing time for immigration. Many clients served by DMC ${marketLabel} explore Canada migration options because the pathway can support skilled talent mobility and long-term settlement planning. Canada Express Entry remains one of the most popular routes for eligible applicants seeking Canadian permanent residence from ${marketLabel}.`,
  "Interested candidates must create an Express Entry profile, including their age, education, work experience, language ability, adaptability, etc., and score 67 minimum points out of 100 available points to become eligible. Candidates make an Expression of Interest (EOI) for particular programs. IRCC can select applicants for multiple programs at various skill levels for a stay in Canada.",
  "The federal and provincial governments and registered employers in Canada can pick candidates from this Pool, depending on category-based rounds, who get an ITA for Canadian migration under one of the programs. A higher ranking in CRS increases the chances of getting an ITA. You can boost your score using the CRS calculator and improve your chances of receiving an ITA for Canada PR from a province and additional nomination points of up to 600.",
  ];
}

const FEATURES: FeatureItem[] = [
  { title: "Career and economic opportunity", body: "Permanent residents can work for eligible employers across Canada, subject to the conditions that apply to them." },
  { title: "Education and family settlement", body: "Families can explore Canadian education and settlement services after becoming permanent residents." },
  { title: "Public services and community life", body: "Eligibility for public services depends on the province, residence status and applicable waiting periods." },
  { title: "Long-term pathway", body: "Permanent residence can create a future path towards citizenship when statutory residence and other requirements are met." },
];

const CRITERIA: CriteriaItem[] = [
  { num: "01 · Age", body: "Age affects FSW selection and CRS ranking, although Express Entry does not use one universal maximum age." },
  { num: "02 · Language", body: "Approved English or French results are required in reading, writing, speaking and listening." },
  { num: "03 · Work history", body: "Eligible skilled experience must align with the correct NOC occupation and TEER category." },
  { num: "04 · Education", body: "Canadian credentials or an Educational Credential Assessment may be required or may add points." },
  { num: "05 · Settlement funds", body: "Applicants must show the required funds when the applicable program and circumstances require them." },
  { num: "06 · Admissibility", body: "Medical, criminality, security, identity and background requirements apply to the family application." },
];

const SCORE_ROWS: ScoreRow[] = [
  { label: "Official-language skills", value: "Up to 28" },
  { label: "Education", value: "Up to 25" },
  { label: "Skilled work experience", value: "Up to 15" },
  { label: "Age", value: "Up to 12" },
  { label: "Arranged employment", value: "Up to 10" },
  { label: "Adaptability", value: "Up to 10" },
];

const DOCUMENTS = [
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
];

const PROCESS_STEPS = [
  { num: "01", title: "Create an eligible Express Entry profile", body: "Complete the required prerequisites, confirm program fit and enter accurate profile information. Federal Skilled Worker applicants must satisfy the applicable 67-point selection grid." },
  { num: "02", title: "Show provincial interest where suitable", body: "Select provinces or territories of interest and consider Express Entry-aligned nomination opportunities that match your background." },
  { num: "03", title: "Attach supporting information", body: "Prepare work-experience evidence, education records, proof of funds and any job-offer or nomination evidence being claimed." },
  { num: "04", title: "Include eligible family members", body: "Declare a spouse or common-law partner and dependent children accurately, including the information required for non-accompanying family members." },
  { num: "05", title: "Receive and monitor the CRS score", body: "The eligible profile is ranked in the pool and may be considered in general, program-specific or category-based invitation rounds." },
  { num: "06", title: "Proceed after an Invitation to Apply", body: "If invited, review every declaration and submit the complete permanent-residence application and required evidence within the stated deadline." },
];

const GUIDANCE_ITEMS = [
  { num: "01", title: "Program-fit and eligibility review", body: "Compare the applicant's history with relevant federal and provincial criteria before profile creation. We assess your age, education, work experience and language ability against the correct NOC and TEER classification." },
  { num: "02", title: "CRS improvement planning", body: "Identify legitimate language, education, work-experience and nomination factors that may strengthen ranking. We help you understand how each factor contributes to your overall score." },
  { num: "03", title: "IELTS training and language support", body: "We have a dedicated centre in Dubai to offer free IELTS training sessions in association with the British Council, helping you achieve higher CLB levels and more CRS points." },
  { num: "04", title: "Document and form coordination", body: "Keep identity, education, employment, travel and personal-history declarations consistent throughout the file. Our team manages applications and helps you fill out assessments and other forms." },
  { num: "05", title: "Provincial nomination guidance", body: "If you have arranged employment from a Canadian employer in a particular province and have satisfactory language test results, we will help you seek provincial nomination for up to 600 additional CRS points." },
  { num: "06", title: "Pre-landing and settlement preparation", body: "Our services continue after approval. Our post-landing team will help you get accommodation, complete required registrations, and settle into life in Canada." },
];

export function ExpressEntryPage({
  market,
  phoneHref,
  phoneLabel,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
}) {
  const marketLabel = MARKET_LABELS[market];
  const faqItems = faqItemsForMarket(marketLabel);
  const overviewCopy = overviewCopyForMarket(marketLabel);
  const media = pageMedia("visas/canada/express-entry");

  return (
    <div className="ee-page" id="express-entry-content">
      <Hero
        market={market}
        sectionId="express-entry-hero"
        eyebrow={`${MARKET_LABELS[market]} market · Canada Express Entry pathway`}
        titlePrefix="Your journey towards"
        titleAccent="Canadian permanent residence"
        subtitle={`Premium, structured Express Entry support for professionals and families in the ${MARKET_LABELS[market]} market. Navigate the Comprehensive Ranking System, federal programs and provincial pathways with expert guidance.`}
        primaryAction={{
          label: "Book Express Entry Consultation",
          href: `#contact`,
        }}
        secondaryAction={{
          label: "Free Eligibility Assessment",
          href: `#tools`,
        }}
        proofStats={[
          { value: "67", label: "FSW point threshold" },
          { value: "3", label: "Federal programs" },
          { value: "600", label: "PNP bonus points" },
        ]}
        disclaimer="Government authorities make all final visa and immigration decisions. Previous outcomes do not guarantee future approval. CRS scores and invitation rounds are subject to change."
        scrollTarget="#services"
        scrollLabel="Explore Express Entry"
      />
      <InternalBreadcrumbs
        items={[
          { label: "Home", href: marketHref(market, "/") },
          { label: "Visas" },
          { label: "Canada", href: marketHref(market, "/visas/canada") },
          { label: "Express Entry" },
        ]}
      />
      <InternalFactsBar items={FACTS} />
      <InternalAnchorNav items={ANCHOR_NAV} />

      <SplitContentSection
        id="services"
        media={{
          alt: media.split?.alt ?? "Benefits of permanent residence in Canada",
          label: media.split?.label ?? "Canada permanent residence",
          priority: true,
          src: media.split?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/PR_in_Canada_2.jpg",
        }}
        kicker="Benefits of Express Entry Canada"
        title={
          <>
            A structured route towards <span>Canadian permanent residence.</span>
          </>
        }
        after={<BenefitsGrid items={BENEFITS} />}
      >
        <RichCopy
          paragraphs={[
            "Express Entry is Canada's electronic system for managing skilled-immigration applications under three federal economic programs. Eligible candidates create a profile, enter the pool and are ranked through the Comprehensive Ranking System.",
            "For professionals and families, the pathway can provide an organised route to permanent residence, access to opportunities across Canada and the ability to include eligible accompanying family members.",
          ]}
        />
      </SplitContentSection>

      <LeadFormSection
        market={market}
        phone={phoneLabel}
        kicker="Get in touch with DMC"
        title={`Canada Express Entry consultants in ${marketLabel}.`}
        copy={[
          "Express Entry is the online system IRCC uses to invite eligible candidates and manage permanent-residence applications under selected economic immigration programs.",
          `Applicants may need support to assess program fit, create an accurate profile, understand CRS ranking and coordinate their evidence. DMC supports prospective applicants through its ${marketLabel} market team during these preparation stages without guaranteeing an invitation or approval.`,
        ]}
      />

      <InternalSection id="programs" tone="soft">
        <div className="ee-shell">
          <SectionHeader
            kicker="Programs under Express Entry"
            title={
              <>
                Federal programs and an <span>aligned provincial route.</span>
              </>
            }
            copy="Express Entry manages applications under three federal economic immigration programs, while aligned Provincial Nominee Programs can create an additional route for eligible candidates."
          />
          <ProgramCards items={PROGRAMS} />
        </div>
      </InternalSection>

      <SplitContentSection
        id="overview"
        reverse
        media={{
          alt: media.media?.alt ?? "Canadian city and landscape",
          label: media.media?.label ?? "Explore opportunities across Canada",
          src: media.media?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg",
        }}
        mediaVariant="portrait"
        kicker="Overview and features"
        title={
          <>
            How the Express Entry <span>system works.</span>
          </>
        }
        after={<FeatureList items={FEATURES} />}
      >
        <RichCopy paragraphs={overviewCopy} />
      </SplitContentSection>

      <InternalSection id="eligibility" tone="soft">
        <div className="ee-shell ee-eligibility-grid">
          <div>
            <header>
              <span className="ee-kicker">Eligibility criteria</span>
              <h2 className="ee-heading">
                What shapes your <span>Express Entry eligibility?</span>
              </h2>
              <p className="ee-copy">
                Each federal program has different minimum requirements. A proper assessment considers how the applicant&apos;s
                credentials work together rather than relying on a single number.
              </p>
            </header>
            <CriteriaGrid items={CRITERIA} />
          </div>
          <ScoreCard
            id="tools"
            score="67"
            caption="Federal Skilled Worker selection-factor threshold out of 100"
            rows={SCORE_ROWS}
            note="The 67-point grid is used to assess Federal Skilled Worker eligibility. It is different from the Comprehensive Ranking System score used to rank eligible profiles in the pool."
          />
        </div>
      </InternalSection>

      <InternalSection labelledBy="ee-crs-title">
        <div className="ee-shell ee-crs-tool-stack">
          <header>
            <span className="ee-kicker">CRS points calculator</span>
            <h2 className="ee-heading" id="ee-crs-title">
              Eligibility gets you considered. <span>CRS determines rank.</span>
            </h2>
            <p className="ee-copy">
              The Comprehensive Ranking System assigns points to eligible profiles. Scores and invitation criteria vary
              between rounds, so there is no permanent invitation cut-off.
            </p>
            <div className="ee-crs-callout">
              A provincial nomination can provide substantial additional CRS points (up to 600). Provincial programs use
              separate eligibility criteria, schedules and application steps.
            </div>
          </header>
          <CRSCalculator />
        </div>
      </InternalSection>

      <InternalSection id="documents">
        <div className="ee-shell ee-doc-grid">
          <div>
            <span className="ee-kicker">Documents required to apply</span>
            <h2 className="ee-heading">
              Prepare the evidence behind <span>your Express Entry profile.</span>
            </h2>
            <p className="ee-copy">
              A complete file depends on consistent, verifiable records. Begin with the core documents that support your
              profile and, after an invitation, your permanent-residence application.
            </p>
            <DocumentList
              items={DOCUMENTS}
              note="Marriage, divorce, adoption, dependent-child, name-change, trade-certification or other supporting records may also be required. Dates, duties and declarations must remain consistent across the profile, forms and evidence."
            />
          </div>
          <MediaFrame
            asset={{
              alt: media.media?.alt ?? "Benefits of permanent residence in Canada",
              label: media.media?.label ?? "Canada Express Entry preparation",
              src: media.media?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/PR_in_Canada_2.jpg",
            }}
          />
        </div>
      </InternalSection>

      <ProcessSection
        id="process"
        kicker="Express PR application process"
        title={
          <>
            From profile creation to a <span>complete application.</span>
          </>
        }
        copy="A disciplined six-stage process helps keep eligibility, declarations, supporting evidence and post-invitation deadlines aligned from the outset."
        image={{
          alt: media.process?.alt ?? "Express Entry permanent residence application process",
          src: media.process?.src ?? "https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_7.jpg",
        }}
        steps={PROCESS_STEPS}
      />

      <ConsultationBand
        market={market}
        title="Speak with our Canadian immigration team."
        copy="Use a focused 30-minute consultation to discuss eligibility, CRS factors, provincial options and preparation priorities."
        phone={phoneLabel}
      />

      <GuidanceSection
        id="why-dmc"
        kicker="How DMC guides you"
        title="A stronger application begins with a clearer strategy."
        paragraphs={[
          "If you fulfil the Canadian Government visa standards, you are eligible to apply for permanent residence as a primary applicant and include a spouse or common-law partner during a PR application. Creating a profile in the Express Entry stream, visa filing, and checking document authenticity can be complicated. You need a professional company to handle the process smoothly.",
          "Our consultancy company offers excellent customer service, and our ICCRC-certified consultants update you regularly about the invitation round and category-based selection to make your professional migration to Canada easier.",
        ]}
        items={GUIDANCE_ITEMS}
      />

      <MediaGallerySection pageId="visas/canada/express-entry" id="gallery" tone="soft" market={market} />

      <InternalSection labelledBy="ee-evidence-title">
        <div className="ee-shell">
          <SectionHeader
            kicker="Detailed document evidence"
            title={
              <>
                Supporting evidence for a <span>decision-ready application.</span>
              </>
            }
            titleId="ee-evidence-title"
            copy="Each document should support the facts declared in the profile, forms and application history. The checklist below highlights eight important evidence categories."
          />
          <EvidenceGrid items={EVIDENCE_DOCS} />
        </div>
      </InternalSection>

      <InternalSection labelledBy="ee-roadmap-title">
        <div className="ee-shell">
          <SectionHeader
            kicker="Our simple process"
            title={
              <>
                Immigration <span>roadmap.</span>
              </>
            }
            titleId="ee-roadmap-title"
            copy="From initial registration to travel readiness, each stage is structured to reduce avoidable gaps and keep the application moving with clear responsibilities."
          />
          <RoadmapGrid items={ROADMAP_STEPS} />
        </div>
      </InternalSection>

      <FaqSection id="faq" items={faqItems} market={market} />

      <InternalSection id="resources">
        <div className="ee-shell">
          <SectionHeader
            kicker="News & blogs"
            title={
              <>
                Immigration news and <span>updates.</span>
              </>
            }
            copy="Practical guidance and timely updates to help applicants make informed decisions at every stage of an international immigration journey."
          />
          <BlogGrid posts={BLOG_POSTS} />
        </div>
      </InternalSection>

      <InternalSection id="stories" tone="soft" className="ee-stories">
        <div className="ee-shell">
          <div className="ee-story-head">
            <SectionHeader
              kicker="Success gallery"
              title={
                <>
                  Our success <span>stories.</span>
                </>
              }
              copy="A selection of client outcomes that reflects the breadth of applications and destinations supported by DMC."
            />
          </div>
          <StoryCarousel stories={STORIES} />
        </div>
      </InternalSection>

      <PartnerLogoStrip logos={PARTNER_LOGOS} />

      <DisclaimerBand>
        <strong>Important:</strong> DMC is not a recruitment or placement agency and does not guarantee any job offer,
        employment, Invitation to Apply, nomination, visa or permanent-residence approval. Immigration decisions are made
        by the relevant government authority, and rules, fees, invitation criteria and processing times can change.
      </DisclaimerBand>

      <FinalCta market={market} phoneHref={phoneHref} phoneLabel={phoneLabel} />
    </div>
  );
}
