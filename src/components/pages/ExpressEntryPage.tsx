"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { Market } from "@/config/markets";
import { marketHref } from "@/lib/routing/routes";
import { CRSCalculator } from "@/components/calculators/CRSCalculator";

const FAQ_ITEMS = [
  {
    q: "Which country is best to migrate to from Dubai?",
    a: "If you want to migrate from Dubai, Canada is a great option. It has friendly immigration laws and is an ideal country to live in with your family. Obtaining permanent residency (PR) in Canada grants you access to many benefits the Canadian Government provides, including excellent job opportunities, higher wages, quality of life, unrestricted mobility, and access to advanced education and healthcare.",
  },
  {
    q: "Can UAE residents apply for Canada PR from Dubai?",
    a: "Yes. Residents of the UAE have an advantageous position to qualify for Canada's migration programs due to their English ability, education system, and work experience in a competitive atmosphere. If this is your first time considering living in Canada, the FSWP could be your most suitable option.",
  },
  {
    q: "What is the fastest way to get Canadian permanent residence?",
    a: "One option for eligible entrepreneurs is the Canada Start-Up Visa. However, for most skilled workers looking for permanent residency status in Canada, the Express Entry system is the fastest route for Canadian immigration.",
  },
  {
    q: "How long does it take to get Canada PR from Dubai?",
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
    q: "How much does Canada PR cost from Dubai?",
    a: "To apply for immigration to Canada through the Express Entry program, a single applicant must pay a fee of CAD 1,365 and an additional CAD 1,365 if they include a spouse in the application. The application fee for a dependent child is CAD 230. The total cost of the process, including additional expenses, is approximately CAD 2,300 for a single applicant. Additional costs include language proficiency tests (CAD 300), ECA (CAD 200), biometrics (CAD 85), medical exams (CAD 450 per adult and CAD 250 per child), and police clearance certificates (CAD 100 per country). Applicants must also show proof of funds of around $13,310 in a bank account.",
  },
  {
    q: "How do I qualify for Express Entry to Canada?",
    a: "UAE residents can qualify for Canada PR under Express Entry if they score 67 CRS points in the Pool. The CRS score is calculated based on various factors like age, English ability, employment offers, education, and work experience in an eligible occupation.",
  },
  {
    q: "What is the Express Entry pool?",
    a: "Eligible candidates for at least one of the popular programs in Canada need to create a profile to enter the Express Entry pool. These programs are: Federal Skilled Worker programs, Federal Skilled Trades program, Canadian Experience Class, and some PNP Programs. The provincial and federal governments and designated employers in Canada can choose higher-ranked candidates from this Pool and give ITAs.",
  },
  {
    q: "Which consultancy is best for Canada immigration support?",
    a: "DM Immigration Consultants is the top immigration consultant in Dubai. We provide efficient, reliable, transparent immigration services for Canada and other major countries. Our highlights are: ICCRC-Licensed Canada immigration agents, free consultation, evaluation, and IELTS training sessions, guidance in ECA, a dedicated Case Officer to support you and provide regular updates, and post-landing services including assistance in accommodation search, job search, and registration.",
  },
];

const BLOG_POSTS = [
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

const EVIDENCE_DOCS = [
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202016.726.png", label: "DOCUMENT 01", title: "Passport and travel documents", body: "Copies of the original passport, identity pages and relevant travel or invitation records." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202025.502.png", label: "DOCUMENT 02", title: "Birth certificate", body: "Birth records that support identity, date and place of birth and declared family relationships." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202034.658.png", label: "DOCUMENT 03", title: "Identity proof", body: "Applicable national identity documents and other records requested for the applicant or family members." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202042.021.png", label: "DOCUMENT 04", title: "Provincial nomination", body: "The nomination certificate and related records when points or eligibility depend on a provincial pathway." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202050.982.png", label: "DOCUMENT 05", title: "Employment evidence", body: "Reference or confirmation letters and supporting records for the skilled work experience being claimed." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-02T202058.785.png", label: "DOCUMENT 06", title: "Education and ECA", body: "Academic credentials and an Educational Credential Assessment where the program or points claim requires it." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-04T163248.787.png", label: "DOCUMENT 07", title: "Language-test scores", body: "Valid results from an approved English or French test covering all four language abilities." },
  { icon: "https://dm-consultant.ae/wp-content/uploads/2023/12/Shape-1-2023-12-04T163301.136.png", label: "DOCUMENT 08", title: "Police certificates", body: "Police clearance certificates for the countries and periods required by the personalised checklist." },
];

const ROADMAP_STEPS = [
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

const PARTNER_LOGOS = [
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-16.png", alt: "Media partner" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-15.png", alt: "Forbes India" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-14.png", alt: "Media partner" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-13.png", alt: "Media partner" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-12.png", alt: "The Column" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-18.png", alt: "Media partner" },
  { src: "https://dm-consultant.ae/wp-content/uploads/2025/10/New-Project-17.png", alt: "Media partner" },
];

const ANCHOR_NAV = [
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

export function ExpressEntryPage({ market }: { market: Market }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const storyTrackRef = useRef<HTMLDivElement>(null);

  const moveStories = useCallback((direction: number) => {
    if (!storyTrackRef.current) return;
    storyTrackRef.current.scrollBy({
      left: direction * Math.max(300, storyTrackRef.current.clientWidth * 0.72),
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="ee-page" id="express-entry-content">
      {/* Breadcrumb */}
      <nav className="ee-breadcrumb" aria-label="Breadcrumb">
        <div className="ee-shell">
          <a href={marketHref(market, "/")}>Home</a>
          <span>›</span>
          <a href={marketHref(market, "/visas/canada/express-entry")}>Visas</a>
          <span>›</span>
          <a href={marketHref(market, "/visas/canada/express-entry")}>Canada</a>
          <span>›</span>
          <strong>Express Entry</strong>
        </div>
      </nav>

      {/* Facts bar */}
      <aside className="ee-facts">
        <div className="ee-shell ee-facts-grid">
          <div className="ee-fact"><small>System</small><strong>Online profile management</strong></div>
          <div className="ee-fact"><small>Programs</small><strong>FSWP · FSTP · CEC · PNP</strong></div>
          <div className="ee-fact"><small>Selection</small><strong>CRS-ranked invitation rounds</strong></div>
          <div className="ee-fact"><small>After an ITA</small><strong>60 days to submit</strong></div>
        </div>
      </aside>

      {/* Anchor nav */}
      <nav className="ee-anchor-nav" aria-label="Express Entry page sections">
        <div className="ee-shell ee-anchor-scroll">
          {ANCHOR_NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </div>
      </nav>

      {/* Hero with inline contact form */}
      <section className="ee-section ee-section-white" id="services">
        <div className="ee-shell ee-split">
          <figure className="ee-media ee-media-landscape">
            <img alt="Benefits of permanent residence in Canada" decoding="async" fetchPriority="high" src="https://dm-consultant.ae/wp-content/uploads/2023/12/PR_in_Canada_2.jpg" />
            <figcaption className="ee-image-label">Canada permanent residence</figcaption>
          </figure>
          <div>
            <span className="ee-kicker">Benefits of Express Entry Canada</span>
            <h2 className="ee-heading">A structured route towards <span>Canadian permanent residence.</span></h2>
            <div className="ee-rich-copy">
              <p>Express Entry is Canada&apos;s electronic system for managing skilled-immigration applications under three federal economic programs. Eligible candidates create a profile, enter the pool and are ranked through the Comprehensive Ranking System.</p>
              <p>For professionals and families, the pathway can provide an organised route to permanent residence, access to opportunities across Canada and the ability to include eligible accompanying family members.</p>
            </div>
            <div className="ee-benefits">
              {[
                "Electronic profile and application management",
                "Routes for skilled professionals and tradespeople",
                "Potential provincial nomination opportunities",
                "Eligible family members can be included",
                "Access to career, education and settlement opportunities",
                "A pathway that may lead to citizenship eligibility later",
              ].map((b) => (
                <div key={b} className="ee-benefit"><span className="ee-check">✓</span><b>{b}</b></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero inline contact form */}
      <section className="ee-section ee-section-alt" aria-labelledby="ee-hero-form-title">
        <div className="ee-shell ee-hero-form-wrap">
          <div className="ee-hero-form-intro">
            <span className="ee-kicker">Get in touch with DMC</span>
            <h2 className="ee-heading" id="ee-hero-form-title">Canada Express Entry consultants in Dubai.</h2>
            <p className="ee-copy">Express Entry is the online system IRCC uses to invite eligible candidates and manage permanent-residence applications under selected economic immigration programs.</p>
            <p className="ee-copy">Applicants may need support to assess program fit, create an accurate profile, understand CRS ranking and coordinate their evidence. DMC supports prospective applicants in Dubai, Abu Dhabi and Sharjah through these preparation stages without guaranteeing an invitation or approval.</p>
            <div className="ee-hero-form-contact">
              <strong>Prefer to call?</strong>
              <span>+971 4 344 7757</span>
            </div>
          </div>
          <form className="ee-form ee-hero-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you. To complete your consultation request, please call +971 4 344 7757."); }}>
            <div className="ee-form-row">
              <input aria-label="Full name" placeholder="Full name" required />
              <input aria-label="Email address" placeholder="Email address" type="email" />
            </div>
            <div className="ee-form-row">
              <input aria-label="Phone number" placeholder="Phone number" required type="tel" />
              <select aria-label="Country of interest">
                <option value="">Migrate, visit or work country</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>New Zealand</option>
                <option>Europe</option>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="ee-form-row">
              <select aria-label="Age range">
                <option value="">Age range</option>
                <option>18–25 years</option>
                <option>26–30 years</option>
                <option>31–35 years</option>
                <option>36–40 years</option>
                <option>41–45 years</option>
                <option>45+ years</option>
              </select>
              <select aria-label="Highest education">
                <option value="">Highest education</option>
                <option>High school</option>
                <option>2-year diploma</option>
                <option>3-year diploma</option>
                <option>Bachelor&apos;s degree</option>
                <option>Master&apos;s degree</option>
                <option>Doctorate</option>
              </select>
            </div>
            <div className="ee-form-row">
              <select aria-label="Years of work experience">
                <option value="">Years of work experience</option>
                <option>No experience</option>
                <option>Less than 1 year</option>
                <option>1–2 years</option>
                <option>3–4 years</option>
                <option>5+ years</option>
              </select>
              <select aria-label="Immigration type">
                <option value="">Immigration type</option>
                <option>General migration</option>
                <option>Student visa</option>
                <option>Business migration</option>
                <option>Visit visa</option>
                <option>High-value migration</option>
              </select>
            </div>
            <select aria-label="Preferred DMC location">
              <option value="">Preferred DMC location</option>
              <option>Dubai</option>
              <option>Abu Dhabi</option>
              <option>Sharjah</option>
            </select>
            <label className="ee-consent"><input required type="checkbox" /> <span>I accept the <Link href="/terms-and-conditions">Terms &amp; Conditions</Link> and consent to being contacted about my enquiry.</span></label>
            <button className="ee-button ee-button-primary" type="submit">Book Your Free Assessment →</button>
          </form>
        </div>
      </section>

      {/* Programs */}
      <section className="ee-section ee-section-soft" id="programs">
        <div className="ee-shell">
          <header className="ee-section-head">
            <span className="ee-kicker">Programs under Express Entry</span>
            <h2 className="ee-heading">Federal programs and an <span>aligned provincial route.</span></h2>
            <p className="ee-copy">Express Entry manages applications under three federal economic immigration programs, while aligned Provincial Nominee Programs can create an additional route for eligible candidates.</p>
          </header>
          <div className="ee-program-grid">
            {[
              { code: "FSW", num: "01", title: "Federal Skilled Worker Program", body: "For skilled professionals with eligible foreign or Canadian work experience who meet the program's language, education, work-experience and 67-point selection-factor requirements.", label: "International professional route" },
              { code: "FST", num: "02", title: "Federal Skilled Trades Program", body: "For experienced workers in eligible skilled trades who meet the applicable trade-experience, language and job-offer or Canadian certificate-of-qualification conditions.", label: "Skilled trades route" },
              { code: "CEC", num: "03", title: "Canadian Experience Class", body: "For skilled workers with eligible Canadian work experience acquired in the required period before applying. Education is not a minimum CEC requirement, although education can influence CRS ranking.", label: "Canadian experience route" },
              { code: "PNP", num: "04", title: "Provincial Nominee Program", body: "Canadian provinces and territories can nominate candidates who meet their labour-market and program requirements. Express Entry-aligned nominations use a separate provincial process before the federal permanent-residence stage.", label: "Express Entry-aligned provincial route" },
            ].map((p) => (
              <article key={p.code} className="ee-program" data-number={p.num}>
                <span className="ee-program-code">{p.code}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <span className="ee-program-label">{p.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Overview / How it works */}
      <section className="ee-section ee-section-white" id="overview">
        <div className="ee-shell ee-split ee-split-reverse">
          <figure className="ee-media ee-media-portrait">
            <img alt="Canadian city and landscape" decoding="async" loading="lazy" src="https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_07.jpg" />
            <figcaption className="ee-image-label">Explore opportunities across Canada</figcaption>
          </figure>
          <div>
            <span className="ee-kicker">Overview and features</span>
            <h2 className="ee-heading">How the Express Entry <span>system works.</span></h2>
            <div className="ee-rich-copy">
              <p>Launched in 2015, the Express Entry Draw is an online system IRCC administers. This fast-tracked comprehensive ranking system reduces the processing time for immigration. Many from the UAE, in general, and Dubai, in particular, are exploring migration to Canada options. Immigration benefits Canada&apos;s economic development and skill transferability. The Canada Express Entry Dubai remains the most popular pathway for those looking to migrate to Canada from Dubai.</p>
              <p>Interested candidates must create an Express Entry profile, including their age, education, work experience, language ability, adaptability, etc., and score 67 minimum points out of 100 available points to become eligible. Candidates make an Expression of Interest (EOI) for particular programs. IRCC can select applicants for multiple programs at various skill levels for a stay in Canada.</p>
              <p>The federal and provincial governments and registered employers in Canada can pick candidates from this Pool, depending on category-based rounds, who get an ITA for Canadian migration under one of the programs. A higher ranking in CRS increases the chances of getting an ITA. You can boost your score using the CRS calculator and improve your chances of receiving an ITA for Canada PR from a province and additional nomination points of up to 600.</p>
            </div>
            <div className="ee-feature-list">
              {[
                { title: "Career and economic opportunity", body: "Permanent residents can work for eligible employers across Canada, subject to the conditions that apply to them." },
                { title: "Education and family settlement", body: "Families can explore Canadian education and settlement services after becoming permanent residents." },
                { title: "Public services and community life", body: "Eligibility for public services depends on the province, residence status and applicable waiting periods." },
                { title: "Long-term pathway", body: "Permanent residence can create a future path towards citizenship when statutory residence and other requirements are met." },
              ].map((f) => (
                <article key={f.title} className="ee-feature-item">
                  <span>•</span>
                  <div><h3>{f.title}</h3><p>{f.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility + Score card */}
      <section className="ee-section ee-section-soft" id="eligibility">
        <div className="ee-shell ee-eligibility-grid">
          <div>
            <header>
              <span className="ee-kicker">Eligibility criteria</span>
              <h2 className="ee-heading">What shapes your <span>Express Entry eligibility?</span></h2>
              <p className="ee-copy">Each federal program has different minimum requirements. A proper assessment considers how the applicant&apos;s credentials work together rather than relying on a single number.</p>
            </header>
            <div className="ee-criteria">
              {[
                { num: "01 · Age", body: "Age affects FSW selection and CRS ranking, although Express Entry does not use one universal maximum age." },
                { num: "02 · Language", body: "Approved English or French results are required in reading, writing, speaking and listening." },
                { num: "03 · Work history", body: "Eligible skilled experience must align with the correct NOC occupation and TEER category." },
                { num: "04 · Education", body: "Canadian credentials or an Educational Credential Assessment may be required or may add points." },
                { num: "05 · Settlement funds", body: "Applicants must show the required funds when the applicable program and circumstances require them." },
                { num: "06 · Admissibility", body: "Medical, criminality, security, identity and background requirements apply to the family application." },
              ].map((c) => (
                <div key={c.num} className="ee-criterion"><small>{c.num}</small><strong>{c.body}</strong></div>
              ))}
            </div>
          </div>
          <aside className="ee-score-card" id="tools">
            <div className="ee-score-head"><strong>67</strong><span>Federal Skilled Worker selection-factor threshold out of 100</span></div>
            <div className="ee-score-row"><span>Official-language skills</span><b>Up to 28</b></div>
            <div className="ee-score-row"><span>Education</span><b>Up to 25</b></div>
            <div className="ee-score-row"><span>Skilled work experience</span><b>Up to 15</b></div>
            <div className="ee-score-row"><span>Age</span><b>Up to 12</b></div>
            <div className="ee-score-row"><span>Arranged employment</span><b>Up to 10</b></div>
            <div className="ee-score-row"><span>Adaptability</span><b>Up to 10</b></div>
            <p className="ee-note">The 67-point grid is used to assess Federal Skilled Worker eligibility. It is different from the Comprehensive Ranking System score used to rank eligible profiles in the pool.</p>
          </aside>
        </div>
      </section>

      {/* CRS calculator */}
      <section className="ee-section ee-section-white" aria-labelledby="ee-crs-title">
        <div className="ee-shell" style={{ display: "flex", flexDirection: "column", gap: "clamp(36px, 5vw, 64px)" }}>
          <header style={{ maxWidth: "680px" }}>
            <span className="ee-kicker">CRS points calculator</span>
            <h2 className="ee-heading" id="ee-crs-title">Eligibility gets you considered. <span>CRS determines rank.</span></h2>
            <p className="ee-copy">The Comprehensive Ranking System assigns points to eligible profiles. Scores and invitation criteria vary between rounds, so there is no permanent invitation cut-off.</p>
            <div className="ee-crs-callout">A provincial nomination can provide substantial additional CRS points (up to 600). Provincial programs use separate eligibility criteria, schedules and application steps.</div>
          </header>
          <CRSCalculator />
        </div>
      </section>

      {/* Documents */}
      <section className="ee-section ee-section-white" id="documents">
        <div className="ee-shell ee-doc-grid">
          <div>
            <span className="ee-kicker">Documents required to apply</span>
            <h2 className="ee-heading">Prepare the evidence behind <span>your Express Entry profile.</span></h2>
            <p className="ee-copy">A complete file depends on consistent, verifiable records. Begin with the core documents that support your profile and, after an invitation, your permanent-residence application.</p>
            <div className="ee-doc-list">
              {[
                "01", "Passport and travel documents",
                "02", "Birth and identity documents",
                "03", "Approved language-test results",
                "04", "Education and ECA evidence",
                "05", "Employment reference letters",
                "06", "Provincial nomination, if applicable",
                "07", "Police clearance certificates",
                "08", "Immigration medical examination",
                "09", "Proof of funds, where required",
                "10", "Civil-status and family documents",
                "11", "Job-offer evidence, if claimed",
                "12", "Payment and application records",
              ].reduce<string[][]>((acc, item, i) => {
                if (i % 2 === 0) acc.push([item]);
                else acc[acc.length - 1].push(item);
                return acc;
              }, []).map(([num, text]) => (
                <div key={num} className="ee-document"><span>{num}</span>{text}</div>
              ))}
            </div>
            <p className="ee-doc-note">Marriage, divorce, adoption, dependent-child, name-change, trade-certification or other supporting records may also be required. Dates, duties and declarations must remain consistent across the profile, forms and evidence.</p>
          </div>
          <figure className="ee-media ee-media-landscape">
            <img alt="Benefits of permanent residence in Canada" decoding="async" loading="lazy" src="https://dm-consultant.ae/wp-content/uploads/2023/12/PR_in_Canada_2.jpg" />
            <figcaption className="ee-image-label">Canada Express Entry preparation</figcaption>
          </figure>
        </div>
      </section>

      {/* Process (dark) */}
      <section className="ee-section ee-section-dark" id="process">
        <div className="ee-shell">
          <header className="ee-section-head">
            <span className="ee-kicker">Express PR application process</span>
            <h2 className="ee-heading">From profile creation to a <span>complete application.</span></h2>
            <p className="ee-copy">A disciplined six-stage process helps keep eligibility, declarations, supporting evidence and post-invitation deadlines aligned from the outset.</p>
          </header>
          <div className="ee-process-layout">
            <figure className="ee-process-visual">
              <img alt="Express Entry permanent residence application process" loading="lazy" src="https://dm-consultant.ae/wp-content/uploads/2023/12/canada_image_7.jpg" />
            </figure>
            <div className="ee-process-steps">
              {[
                { num: "01", title: "Create an eligible Express Entry profile", body: "Complete the required prerequisites, confirm program fit and enter accurate profile information. Federal Skilled Worker applicants must satisfy the applicable 67-point selection grid." },
                { num: "02", title: "Show provincial interest where suitable", body: "Select provinces or territories of interest and consider Express Entry-aligned nomination opportunities that match your background." },
                { num: "03", title: "Attach supporting information", body: "Prepare work-experience evidence, education records, proof of funds and any job-offer or nomination evidence being claimed." },
                { num: "04", title: "Include eligible family members", body: "Declare a spouse or common-law partner and dependent children accurately, including the information required for non-accompanying family members." },
                { num: "05", title: "Receive and monitor the CRS score", body: "The eligible profile is ranked in the pool and may be considered in general, program-specific or category-based invitation rounds." },
                { num: "06", title: "Proceed after an Invitation to Apply", body: "If invited, review every declaration and submit the complete permanent-residence application and required evidence within the stated deadline." },
              ].map((s) => (
                <article key={s.num} className="ee-process-step">
                  <span>{s.num}</span>
                  <div><h3>{s.title}</h3><p>{s.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consultation band */}
      <section className="ee-consult-band" aria-labelledby="ee-free-consult-title">
        <div className="ee-shell ee-consult-grid">
          <header>
            <span className="ee-kicker">Schedule a free consultation</span>
            <h2 id="ee-free-consult-title">Speak with our Canadian immigration team.</h2>
            <p>Use a focused 30-minute consultation to discuss eligibility, CRS factors, provincial options and preparation priorities.</p>
          </header>
          <form className="ee-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you. To complete your consultation request, please call +971 4 344 7757."); }}>
            <input aria-label="Consultation full name" placeholder="Full name" required />
            <input aria-label="Consultation phone number" placeholder="Phone number" required type="tel" />
            <input aria-label="Consultation email" placeholder="Email address" type="email" />
            <select aria-label="Preferred DMC consultation location">
              <option value="">Preferred location</option>
              <option>Dubai</option>
              <option>Abu Dhabi</option>
              <option>Sharjah</option>
            </select>
            <button className="ee-button ee-button-light" type="submit">Request Consultation →</button>
          </form>
        </div>
      </section>

      {/* Why DMC / Guidance */}
      <section className="ee-section ee-section-soft" id="why-dmc">
        <div className="ee-shell ee-guidance-grid">
          <aside className="ee-guidance-panel">
            <span className="ee-kicker" style={{ color: "var(--ee-200)" }}>How DMC guides you</span>
            <h2>A stronger application begins with a clearer strategy.</h2>
            <p>If you fulfil the Canadian Government visa standards, you are eligible to apply for permanent residence as a primary applicant and include a spouse or common-law partner during a PR application. Creating a profile in the Express Entry stream, visa filing, and checking document authenticity can be complicated. You need a professional company to handle the process smoothly.</p>
            <p>Our consultancy company offers excellent customer service, and our ICCRC-certified consultants update you regularly about the invitation round and category-based selection to make your professional migration to Canada easier.</p>
            <button className="ee-button ee-button-light" type="button">Speak with DMC →</button>
          </aside>
          <div className="ee-guidance-list">
            {[
              { num: "01", title: "Program-fit and eligibility review", body: "Compare the applicant's history with relevant federal and provincial criteria before profile creation. We assess your age, education, work experience and language ability against the correct NOC and TEER classification." },
              { num: "02", title: "CRS improvement planning", body: "Identify legitimate language, education, work-experience and nomination factors that may strengthen ranking. We help you understand how each factor contributes to your overall score." },
              { num: "03", title: "IELTS training and language support", body: "We have a dedicated centre in Dubai to offer free IELTS training sessions in association with the British Council, helping you achieve higher CLB levels and more CRS points." },
              { num: "04", title: "Document and form coordination", body: "Keep identity, education, employment, travel and personal-history declarations consistent throughout the file. Our team manages applications and helps you fill out assessments and other forms." },
              { num: "05", title: "Provincial nomination guidance", body: "If you have arranged employment from a Canadian employer in a particular province and have satisfactory language test results, we will help you seek provincial nomination for up to 600 additional CRS points." },
              { num: "06", title: "Pre-landing and settlement preparation", body: "Our services continue after approval. Our post-landing team will help you get accommodation, complete required registrations, and settle into life in Canada." },
            ].map((g) => (
              <article key={g.num} className="ee-guidance-item">
                <span>{g.num}</span>
                <div><h3>{g.title}</h3><p>{g.body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence grid */}
      <section className="ee-section ee-section-white" aria-labelledby="ee-evidence-title">
        <div className="ee-shell">
          <header className="ee-section-head">
            <span className="ee-kicker">Detailed document evidence</span>
            <h2 className="ee-heading" id="ee-evidence-title">Supporting evidence for a <span>decision-ready application.</span></h2>
            <p className="ee-copy">Each document should support the facts declared in the profile, forms and application history. The checklist below highlights eight important evidence categories.</p>
          </header>
          <div className="ee-evidence-grid">
            {EVIDENCE_DOCS.map((d) => (
              <article key={d.label} className="ee-evidence-card">
                <span className="ee-evidence-icon"><img alt="" loading="lazy" src={d.icon} /></span>
                <small>{d.label}</small>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="ee-section ee-section-white" aria-labelledby="ee-roadmap-title">
        <div className="ee-shell">
          <header className="ee-section-head">
            <span className="ee-kicker">Our simple process</span>
            <h2 className="ee-heading" id="ee-roadmap-title">Immigration <span>roadmap.</span></h2>
            <p className="ee-copy">From initial registration to travel readiness, each stage is structured to reduce avoidable gaps and keep the application moving with clear responsibilities.</p>
          </header>
          <div className="ee-roadmap-grid">
            {ROADMAP_STEPS.map((s) => (
              <article key={s.small} className="ee-roadmap-card">
                <span className="ee-roadmap-icon" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt="" width="38" height="38" style={{ objectFit: "contain" }} />
                </span>
                <small>{s.small}</small>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ee-section ee-section-soft" id="faq">
        <div className="ee-shell ee-faq-grid">
          <header className="ee-faq-intro">
            <span className="ee-kicker">Frequently asked questions</span>
            <h2 className="ee-heading">Express Entry, <span>explained clearly.</span></h2>
            <p className="ee-copy">Straightforward answers to the questions applicants most often raise about eligibility, ranking, documentation, costs and timelines.</p>
          </header>
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <article key={i} className={`ee-faq-item${openFaq === i ? " open" : ""}`}>
                <button className="ee-faq-question" type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}
                  <span className="ee-faq-icon">+</span>
                </button>
                <div className="ee-faq-answer">
                  <p>{item.a}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* News / Blog */}
      <section className="ee-section ee-section-white" id="resources">
        <div className="ee-shell">
          <header className="ee-section-head">
            <span className="ee-kicker">News &amp; blogs</span>
            <h2 className="ee-heading">Immigration news and <span>updates.</span></h2>
            <p className="ee-copy">Practical guidance and timely updates to help applicants make informed decisions at every stage of an international immigration journey.</p>
          </header>
          <div className="ee-blog-grid">
            {BLOG_POSTS.map((post) => (
              <article key={post.title} className="ee-blog-card">
                <a className="ee-blog-image" href={post.href}>
                  <img alt={post.alt} loading="lazy" src={post.img} />
                </a>
                <div className="ee-blog-body">
                  <span className="ee-blog-meta">{post.meta}</span>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <a className="ee-blog-link" href={post.href}>Read article →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="ee-section ee-section-soft ee-stories" id="stories">
        <div className="ee-shell">
          <div className="ee-story-head">
            <header className="ee-section-head">
              <span className="ee-kicker">Success gallery</span>
              <h2 className="ee-heading">Our success <span>stories.</span></h2>
              <p className="ee-copy">A selection of client outcomes that reflects the breadth of applications and destinations supported by DMC.</p>
            </header>
          </div>
          <div className="ee-story-carousel">
            <div className="ee-story-controls" aria-label="Success story controls">
              <button aria-label="Previous success stories" className="ee-story-control" type="button" onClick={() => moveStories(-1)}>←</button>
              <button aria-label="Next success stories" className="ee-story-control" type="button" onClick={() => moveStories(1)}>→</button>
            </div>
            <div className="ee-story-track" ref={storyTrackRef} tabIndex={0}>
              {STORIES.map((src, i) => (
                <figure key={i} className="ee-story-card">
                  <img alt={`DMC client success story ${i + 1}`} loading="lazy" src={src} />
                  <figcaption className="ee-story-caption">
                    <b>Client success</b>
                    <span>{String(i + 1).padStart(2, "0")} / {String(STORIES.length).padStart(2, "0")}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner logos bar */}
      <section className="ee-section ee-section-white" style={{ padding: "clamp(48px, 5vw, 80px) 0" }}>
        <div className="ee-shell">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(24px, 4vw, 56px)", flexWrap: "wrap", opacity: 0.55 }}>
            {PARTNER_LOGOS.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={logo.src} src={logo.src} alt={logo.alt} style={{ height: "clamp(28px, 3.5vw, 42px)", width: "auto", objectFit: "contain", mixBlendMode: "multiply" }} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <aside className="ee-disclaimer">
        <div className="ee-shell">
          <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>ℹ</span>
          <p><strong>Important:</strong> DMC is not a recruitment or placement agency and does not guarantee any job offer, employment, Invitation to Apply, nomination, visa or permanent-residence approval. Immigration decisions are made by the relevant government authority, and rules, fees, invitation criteria and processing times can change.</p>
        </div>
      </aside>

      {/* CTA */}
      <section className="ee-cta" id="contact">
        <div className="ee-shell ee-cta-grid">
          <header>
            <span className="ee-kicker">Start with clarity</span>
            <h2 className="ee-heading">Could Express Entry be the right <span>route for you?</span></h2>
            <p className="ee-copy">Speak with the DMC team about program fit, documentation priorities, CRS factors and a realistic next step for your profile.</p>
          </header>
          <div className="ee-cta-actions">
            <a className="ee-button ee-button-light" href={marketHref(market, "/#contact")}>Book Consultation →</a>
            <a className="ee-button ee-button-outline" href="tel:+97143447757">Call +971 4 344 7757</a>
          </div>
        </div>
      </section>
    </div>
  );
}
