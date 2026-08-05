import type { PageContent } from "@/content/pages/types";

const IMMI = "https://immi.homeaffairs.gov.au/";

export const AUSTRALIA_PAGES: PageContent[] = [
  {
    id: "visas/australia/skilled-independent-189",
    title: "Skilled Independent Visa (189)",
    eyebrow: "Australia skilled migration",
    seoTitle: "Skilled Independent Visa 189 Australia | DMC Immigration Group",
    seoDescription:
      "The points-tested Skilled Independent visa (subclass 189) — EOI, occupation list, skills assessment, points grid and invitation rounds, with official sources.",
    lede: "A points-tested permanent-residence visa for skilled workers who do not need a sponsor, employer or state nomination — invitation-based through SkillSelect.",
    sections: [
      {
        kind: "overview",
        heading: "How the 189 works",
        paragraphs: [
          "The Skilled Independent visa (subclass 189) is a permanent-residence visa for skilled workers with an occupation on the relevant occupation list and a qualifying points score. No employer, state or family sponsor is required.",
          "Candidates lodge an Expression of Interest (EOI) in SkillSelect. The Department of Home Affairs issues invitations periodically, ranking candidates by points and other factors, and invited candidates then lodge the visa application.",
          "Being in the occupation lists and scoring at least the 65-point pass mark does not guarantee an invitation — the department sets invitation numbers and cut-offs by occupation group for each round.",
        ],
      },
      {
        kind: "panel",
        heading: "Points at a glance",
        rows: [
          { label: "Age (25–32)", value: "30 points (18–24 and 33–39: 25; 40–44: 15)" },
          { label: "English — proficient", value: "10 points (superior: 20)" },
          { label: "Skilled employment", value: "Up to 20 points" },
          { label: "Education", value: "Up to 20 points (incl. specialist degrees)" },
          { label: "Australian study", value: "5 points" },
          { label: "Partner and regional factors", value: "Up to 15 points each" },
          { label: "Pass mark", value: "65 points (invitation cut-offs vary by round and occupation)" },
        ],
        note: "The points grid is set out in the points-based skilled migration framework; confirm the current table on the official 189 page before preparing an EOI.",
      },
      {
        kind: "eligibility",
        heading: "Core eligibility requirements",
        items: [
          { title: "Occupation and skills assessment", body: "An occupation on the relevant list with a positive skills assessment for that occupation." },
          { title: "Age", body: "Under 45 years at the time of invitation (subject to current concessions)." },
          { title: "English", body: "Competent English or better, proved by an approved test." },
          { title: "Points", body: "At least 65 points on the points grid." },
          { title: "EOI and invitation", body: "An active, truthful Expression of Interest and an invitation to apply." },
          { title: "Health and character", body: "Medical examination and police clearances for all applicants." },
        ],
      },
      {
        kind: "process",
        heading: "From EOI to permanent residence",
        steps: [
          { title: "Check your occupation", body: "Confirm your occupation is on the relevant list and arrange a positive skills assessment." },
          { title: "Prepare language and documents", body: "Complete an approved English test and gather identity, employment and education evidence." },
          { title: "Lodge an EOI", body: "Submit your Expression of Interest in SkillSelect with an accurate points claim." },
          { title: "Receive an invitation", body: "Wait for an invitation round that includes your occupation group and points band." },
          { title: "Apply and land", body: "Lodge the visa application within the invitation window, then complete travel and landing steps after grant." },
        ],
      },
      {
        kind: "faq",
        heading: "Skilled Independent, answered",
        items: [
          {
            question: "Do I need a sponsor for the 189?",
            answer: "No. The 189 does not require an employer, state nomination or family sponsor — it is a purely points-tested independent route.",
          },
          {
            question: "What points do I need?",
            answer: "The pass mark is 65, but invitations are competitive: the department ranks EOIs and issues limited invitations per occupation, so higher scores improve your chances.",
          },
          {
            question: "What happens after my EOI expires?",
            answer: "EOIs remain in SkillSelect for up to two years. If no invitation arrives, you can update or resubmit your EOI as long as you remain eligible.",
          },
          {
            question: "Can I apply for the 189 {marketFrom}?",
            answer: "Yes. The 189 is open to applicants wherever they live — eligibility depends on your occupation, points score and English ability, not your place of residence. {market} residents often qualify if their occupation is on the relevant list.",
          },
        ],
      },
    ],
    relatedPages: ["visas/australia/skilled-nominated-190", "visas/australia/skilled-work-regional-491", "visas/australia/state-territory-nominations"],
    relatedTools: ["tools/australia/points-calculator", "tools/australia/occupation-eligibility-checker"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Home Affairs — Skilled Independent visa (subclass 189)", url: `${IMMI}visas/getting-a-visa/visa-listing/skilled-independent-189` },
    ],
  },
  {
    id: "visas/australia/skilled-nominated-190",
    title: "Skilled Nominated Visa (190)",
    eyebrow: "Australia skilled migration",
    seoTitle: "Skilled Nominated Visa 190 Australia | DMC Immigration Group",
    seoDescription:
      "The Skilled Nominated visa (subclass 190) — state and territory nomination, the extra 5 points, nomination criteria and the permanent-residence application.",
    lede: "A points-tested permanent-residence visa with an additional five points, available to skilled workers nominated by an Australian state or territory government.",
    sections: [
      {
        kind: "overview",
        heading: "How the 190 works",
        paragraphs: [
          "The Skilled Nominated visa (subclass 190) is a permanent-residence visa for skilled workers nominated by a state or territory government that wants their occupation in that region.",
          "Candidates lodge an EOI with state-nomination interest, receive a nomination from the state (adding five points), and are then considered for invitation by the Department of Home Affairs.",
          "Nominees are expected to live and work in the nominating state or territory for a genuine period — this is a condition of nomination, not a formal residence requirement attached to the visa itself.",
        ],
      },
      {
        kind: "eligibility",
        heading: "Eligibility essentials",
        items: [
          { title: "State or territory nomination", body: "A nomination from a state or territory whose criteria you meet — each publishes its own occupation lists, priorities and application windows." },
          { title: "Occupation and skills assessment", body: "An occupation on the relevant list, with a positive skills assessment." },
          { title: "Points", body: "At least 65 points including the five nomination points." },
          { title: "Age and English", body: "Under 45 at invitation and competent English or better." },
          { title: "Commitment to the state", body: "Genuine intention to live and work in the nominating state or territory." },
        ],
      },
      {
        kind: "panel",
        heading: "Nomination points and process",
        rows: [
          { label: "Nomination points", value: "+5 (included in the 65-point pass mark)" },
          { label: "Nominating body", value: "State or territory government — not the federal department" },
          { label: "Fee", value: "State nomination fees vary by jurisdiction and are separate from the visa application charge" },
          { label: "Visa outcome", value: "Permanent residence, with five-year travel facility" },
        ],
        note: "State nomination windows and criteria change frequently. Apply only with the current published requirements of the state you target.",
      },
      {
        kind: "process",
        heading: "The nomination journey",
        steps: [
          { title: "Research states", body: "Compare occupation lists, criteria and intake windows across the states and territories." },
          { title: "Apply to the state", body: "Submit the state's nomination application with evidence for its specific criteria." },
          { title: "Receive nomination", body: "The state confirms nomination, adding five points to your EOI." },
          { title: "Lodge the visa application", body: "After invitation, apply for the 190 with complete documents." },
          { title: "Move and settle", body: "Plan to live and work in the nominating state or territory after arrival." },
        ],
      },
      {
        kind: "faq",
        heading: "Skilled Nominated, answered",
        items: [
          {
            question: "How is the 190 different from the 189?",
            answer: "The 190 requires state or territory nomination and adds five points; the 189 needs no nomination. Both are permanent-residence points-tested visas.",
          },
          {
            question: "Must I live in the nominating state?",
            answer: "Nomination commits you to live and work in that state or territory for a genuine period. There is no fixed statutory residence condition on the visa, but the undertaking is part of the nomination.",
          },
          {
            question: "Which states accept my occupation?",
            answer: "Occupation lists differ by state and are updated regularly. DMC can help you compare current lists and match your profile to an open nomination program.",
          },
        ],
      },
    ],
    relatedPages: ["visas/australia/skilled-independent-189", "visas/australia/state-territory-nominations", "visas/australia/skilled-work-regional-491"],
    relatedTools: ["tools/australia/points-calculator", "tools/australia/occupation-eligibility-checker"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Home Affairs — Skilled Nominated visa (subclass 190)", url: `${IMMI}visas/getting-a-visa/visa-listing/skilled-nominated-190` },
    ],
  },
  {
    id: "visas/australia/skilled-work-regional-491",
    title: "Skilled Work Regional (Provisional) Visa (491)",
    eyebrow: "Australia skilled migration",
    seoTitle: "Skilled Work Regional Visa 491 Australia | DMC Immigration Group",
    seoDescription:
      "The Skilled Work Regional (Provisional) visa (subclass 491) — regional nomination, 15 extra points, the five-year visa and the pathway to PR through the 191.",
    lede: "A provisional regional visa worth 15 additional points — a practical first step toward Australian permanent residence for skilled workers living and working in regional Australia.",
    sections: [
      {
        kind: "overview",
        heading: "How the 491 works",
        paragraphs: [
          "The Skilled Work Regional (Provisional) visa (subclass 491) lets skilled workers live, work and study in designated regional areas of Australia for five years. It is a provisional visa: it does not itself grant permanent residence.",
          "Candidates are nominated by a state or territory regional program or sponsored by an eligible family member, and the visa is worth 15 points in the points test.",
          "After three years on the 491 while living and working in regional Australia, holders can progress to permanent residence through the Skilled Regional visa (subclass 191), subject to meeting its conditions.",
        ],
      },
      {
        kind: "eligibility",
        heading: "Eligibility essentials",
        items: [
          { title: "Nomination or family sponsorship", body: "State/territory regional nomination, or sponsorship by an eligible family member in a designated area." },
          { title: "Occupation and skills assessment", body: "An occupation on the relevant regional list with a positive skills assessment." },
          { title: "Points", body: "At least 65 points including the 15 nomination or sponsorship points." },
          { title: "Regional commitment", body: "A genuine intention to live and work in a designated regional area." },
          { title: "Age, English and health", body: "Under 45 at invitation, competent English or better, and meeting health and character requirements." },
        ],
      },
      {
        kind: "panel",
        heading: "The 491 at a glance",
        rows: [
          { label: "Points benefit", value: "+15" },
          { label: "Visa length", value: "5 years (provisional)" },
          { label: "Pathway", value: "Subclass 191 permanent residence after 3 years on the 491" },
          { label: "Conditions", value: "Live, work and study in designated regional areas; comply with visa conditions 8578–8581" },
        ],
        note: "Regional areas are defined by postcode. Some 491 holders can apply for permanent residence after three years without a current employer nomination.",
      },
      {
        kind: "process",
        heading: "From nomination to PR pathway",
        steps: [
          { title: "Check regional lists", body: "Confirm your occupation on the relevant regional occupation list and complete a skills assessment." },
          { title: "Seek nomination or sponsorship", body: "Apply to a state regional program or secure an eligible family sponsor." },
          { title: "Lodge your EOI", body: "Submit the EOI with the 15-point claim and wait for an invitation." },
          { title: "Apply for the 491", body: "Lodge the visa application after invitation and move to your designated regional area." },
          { title: "Progress to the 191", body: "After three years of compliant residence, assess your eligibility for permanent residence under the 191." },
        ],
      },
      {
        kind: "faq",
        heading: "Skilled Work Regional, answered",
        items: [
          {
            question: "Can I switch to a permanent visa directly?",
            answer: "The standard route is the 191 after three years on the 491. Alternative pathways may exist through employer sponsorship or state nomination if your circumstances change.",
          },
          {
            question: "What counts as a regional area?",
            answer: "Designated regional areas cover most of Australia outside major cities and are defined by postcode in the official regional-postcode tool.",
          },
          {
            question: "Can my family join me on the 491?",
            answer: "Yes — eligible family members can be included in the application and share the visa conditions.",
          },
        ],
      },
    ],
    relatedPages: ["visas/australia/permanent-residence-skilled-regional-191", "visas/australia/state-territory-nominations", "visas/australia/skilled-nominated-190"],
    relatedTools: ["tools/australia/points-calculator", "tools/australia/occupation-eligibility-checker"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Home Affairs — Skilled Work Regional (Provisional) visa (subclass 491)", url: `${IMMI}visas/getting-a-visa/visa-listing/skilled-work-regional-491` },
    ],
  },
  {
    id: "visas/australia/permanent-residence-skilled-regional-191",
    title: "Permanent Residence (Skilled Regional) Visa (191)",
    eyebrow: "Australia skilled migration",
    seoTitle: "Permanent Residence Skilled Regional Visa 191 Australia | DMC Immigration Group",
    seoDescription:
      "The Skilled Regional visa (subclass 191) — the permanent-residence step for 491 and 494 holders, including the ATO notices requirement and current income rules.",
    lede: "The permanent-residence step for holders of the 491 or 494 regional visas who have lived and worked in regional Australia for three years.",
    sections: [
      {
        kind: "overview",
        heading: "How the 191 works",
        paragraphs: [
          "The Permanent Residence (Skilled Regional) visa (subclass 191) is the final step of the regional migration pathway. It is open to people who have held the Skilled Work Regional (Provisional) visa (subclass 491) or the Skilled Employer Sponsored Regional (Provisional) visa (subclass 494) for at least three years and complied with their conditions.",
          "The visa grants permanent residence, including the right to live and work anywhere in Australia, with a five-year travel facility.",
          "There is no minimum income requirement for the 191 — the Department of Home Affairs confirmed in June 2023 that no legislative income threshold applies. Primary applicants must instead provide Australian Taxation Office notices of assessment for three income years out of the five years of their eligible visa.",
        ],
      },
      {
        kind: "eligibility",
        heading: "Eligibility essentials",
        items: [
          { title: "Eligible visa", body: "Hold a 491 or 494 visa for at least three years at the time of application." },
          { title: "Compliance", body: "Have complied with all conditions of the eligible visa during that period." },
          { title: "ATO notices", body: "Provide notices of assessment for three of the five income years covered by the eligible visa." },
          { title: "Health and character", body: "Meet medical and police requirements for all applicants." },
        ],
      },
      {
        kind: "panel",
        heading: "Key facts",
        rows: [
          { label: "Minimum income", value: "None (removed; confirmed 2023)" },
          { label: "Evidence required", value: "ATO notices of assessment — 3 of 5 income years" },
          { label: "Eligible holders", value: "Subclass 491 and 494 visa holders" },
          { label: "Visa type", value: "Permanent residence, 5-year travel facility" },
        ],
        note: "While no minimum income applies today, the department has not ruled out introducing a threshold in future — check the official 191 page when you are ready to apply.",
      },
      {
        kind: "process",
        heading: "Preparing for the 191",
        steps: [
          { title: "Track your years", body: "Confirm you have held the eligible visa for at least three years and kept records of residence and work in regional Australia." },
          { title: "Gather ATO notices", body: "Collect notices of assessment for three income years within the visa period." },
          { title: "Confirm compliance", body: "Review every visa condition, including regional residence and working arrangements." },
          { title: "Apply", body: "Lodge the application with identity, health and character evidence." },
          { title: "Receive permanent residence", body: "After grant, you are free to live and work anywhere in Australia." },
        ],
      },
      {
        kind: "faq",
        heading: "Skilled Regional (191), answered",
        items: [
          {
            question: "Is there really no income requirement?",
            answer: "Correct — the Department of Home Affairs confirmed in June 2023 that there is no minimum income requirement for the 191. Primary applicants must still provide ATO notices of assessment for three of five income years.",
          },
          {
            question: "Do I need to stay in a regional area after applying?",
            answer: "You must have lived and worked in designated regional areas while holding the eligible visa. Once the 191 is granted, permanent residence is unrestricted.",
          },
          {
            question: "Can I apply before three years on the 491?",
            answer: "No — three years on the eligible visa is a core requirement, and applications made earlier are refused.",
          },
        ],
      },
    ],
    relatedPages: ["visas/australia/skilled-work-regional-491", "visas/australia/skilled-independent-189"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Home Affairs — Permanent Residence (Skilled Regional) visa (subclass 191)", url: `${IMMI}visas/getting-a-visa/visa-listing/skilled-regional-191` },
    ],
  },
  {
    id: "visas/australia/employer-sponsored-482",
    title: "Employer Sponsored Visa (482)",
    eyebrow: "Australia employer sponsorship",
    seoTitle: "Skills in Demand Visa (482) Australia | DMC Immigration Group",
    seoDescription:
      "The Skills in Demand visa (subclass 482), which replaced the TSS 482 — Core, Specialist and Essential streams, salary thresholds, occupation list and the PR pathway.",
    lede: "Australia's current employer-sponsored skilled work visa — the Skills in Demand visa (subclass 482) — explained with the naming history, streams and salary rules that matter.",
    sections: [
      {
        kind: "status",
        label: "New name, same subclass — Skills in Demand replaced TSS on 7 December 2024",
        tone: "info",
        body: "The Temporary Skill Shortage (TSS) visa is now the Skills in Demand (SID) visa, subclass 482, with three streams: Core Skills, Specialist Skills and Essential Skills. The former TSS name appears only in older documents and in arrangements for people already holding the old visa.",
      },
      {
        kind: "overview",
        heading: "How the Skills in Demand visa works",
        paragraphs: [
          "The SID visa lets Australian employers sponsor skilled workers for up to four years. It replaced the TSS visa for new applications from 7 December 2024, keeping the subclass 482 number.",
          "The Core Skills stream covers occupations on the Core Skills Occupation List (CSOL) with salaries at or above the Core Skills Income Threshold (CSIT) — the workhorse stream for most professionals and tradespeople.",
          "The Specialist Skills stream has no occupation list: it is for highly paid senior or technical roles above the Specialist Skills Income Threshold (SSIT). The Essential Skills stream covers capped lower-paid roles such as aged and disability care through labour agreements or DAMAs.",
          "SID holders can change employers with a 180-day grace period to find a new sponsor, and the visa provides a route to permanent residence through the 186 (Employer Nomination Scheme) after qualifying periods.",
        ],
      },
      {
        kind: "panel",
        heading: "Salary thresholds (indexed annually on 1 July)",
        rows: [
          { label: "Core Skills Income Threshold (CSIT)", value: "AUD 76,515 in 2025–26; approximately AUD 79,400 from 1 July 2026" },
          { label: "Specialist Skills Income Threshold (SSIT)", value: "AUD 141,210 in 2025–26; approximately AUD 146,600 from 1 July 2026" },
          { label: "Also required", value: "Annual Market Salary Rate for the role — the higher of the two applies" },
        ],
        note: "Thresholds are indexed each 1 July under the migration regulations. The exact figure depends on the nomination lodgement date — always confirm the current CSIT/SSIT on the official Home Affairs salary page.",
      },
      {
        kind: "requirements",
        heading: "Core stream requirements",
        items: [
          { title: "Sponsor", body: "An Australian employer approved as a sponsor, nominating the role." },
          { title: "Occupation", body: "An occupation on the Core Skills Occupation List for the Core stream." },
          { title: "Experience", body: "One year of relevant work experience within the last five years (reduced from two years under the SID rules)." },
          { title: "Salary", body: "Guaranteed base salary meeting the CSIT and the Annual Market Salary Rate." },
          { title: "Skills and English", body: "Skills assessment and approved English test where required; health and character checks." },
        ],
      },
      {
        kind: "process",
        heading: "The sponsorship journey",
        steps: [
          { title: "Secure a sponsoring employer", body: "Find an approved sponsor in Australia with an eligible nominated role." },
          { title: "Sponsorship and nomination", body: "The employer submits sponsorship and nomination applications with salary evidence." },
          { title: "Apply for the visa", body: "You lodge the visa application once the nomination is approved." },
          { title: "Work and plan", body: "Begin work; note the 180-day grace period rules if you ever change employers." },
          { title: "Progress to PR", body: "Explore the 186 Temporary Residence Transition stream when you meet the qualifying period." },
        ],
      },
      {
        kind: "faq",
        heading: "Employer sponsored (482), answered",
        items: [
          {
            question: "Is the 482 the same as the old TSS visa?",
            answer: "No. The Skills in Demand visa replaced the TSS visa for new applications from 7 December 2024. The subclass number (482) is retained, but the streams, thresholds and rules are new.",
          },
          {
            question: "Can I change employers on the SID visa?",
            answer: "Yes — you have a 180-day grace period to find a new sponsor and lodge a new nomination, and your cumulative time continues toward PR pathways.",
          },
          {
            question: "Does the SID lead to permanent residence?",
            answer: "Yes, typically through the 186 Employer Nomination Scheme, including the Temporary Residence Transition stream for SID holders meeting the qualifying period.",
          },
          {
            question: "What salary do I need?",
            answer: "For the Core stream, your guaranteed base salary must meet the CSIT (about AUD 79,400 from 1 July 2026) and the Annual Market Salary Rate — whichever is higher.",
          },
        ],
      },
    ],
    relatedPages: ["visas/australia/employer-nomination-scheme-186", "visas/australia/skilled-independent-189"],
    relatedTools: ["tools/australia/occupation-eligibility-checker"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Home Affairs — Skills in Demand visa (subclass 482)", url: `${IMMI}visas/getting-a-visa/visa-listing/skills-in-demand-visa-subclass-482` },
      { label: "Home Affairs — Salary requirements for sponsored workers", url: `${IMMI}visas/employing-and-sponsoring-someone/sponsoring-workers/nominating-a-position/salary-requirements` },
    ],
  },
  {
    id: "visas/australia/employer-nomination-scheme-186",
    title: "Employer Nomination Scheme (186)",
    eyebrow: "Australia employer sponsorship",
    seoTitle: "Employer Nomination Scheme 186 Australia | DMC Immigration Group",
    seoDescription:
      "The Employer Nomination Scheme (subclass 186) — direct entry, temporary residence transition and labour agreement streams for employer-sponsored permanent residence.",
    lede: "A permanent-residence route for skilled workers sponsored by an Australian employer — through direct entry, transition from a temporary visa, or a labour agreement.",
    sections: [
      {
        kind: "overview",
        heading: "How the ENS (186) works",
        paragraphs: [
          "The Employer Nomination Scheme (subclass 186) grants permanent residence to skilled workers nominated by their Australian employer. The employer must be approved as a sponsor, and the nomination must meet salary and market-rate requirements.",
          "Three streams are available: the Direct Entry stream for applicants who have not necessarily worked for the employer on a temporary visa; the Temporary Residence Transition stream for holders of eligible temporary visas such as the 482 who have completed the qualifying period; and the Labour Agreement stream for employers with approved labour agreements.",
          "The 186 is the main permanent-residence outcome for 482 (Skills in Demand) holders in Australia.",
        ],
      },
      {
        kind: "eligibility",
        heading: "Eligibility essentials",
        items: [
          { title: "Sponsorship and nomination", body: "A nomination from an approved sponsor for an eligible occupation." },
          { title: "Skills assessment", body: "A positive skills assessment for the occupation where required." },
          { title: "Age", body: "Under 45 at application time (with concessions for some applicants, e.g. TRT stream, researchers or high earners)." },
          { title: "English", body: "Competent English or better for most applicants." },
          { title: "Salary", body: "Meet the applicable income threshold (e.g. CSIT for Direct Entry and TRT nominations since December 2024) and the Annual Market Salary Rate." },
          { title: "Transition path", body: "For the TRT stream, three years on an eligible temporary visa (e.g. 482) with the nominating employer." },
        ],
      },
      {
        kind: "panel",
        heading: "Streams compared",
        rows: [
          { label: "Direct Entry", value: "For applicants not already on a temporary visa with the employer; standard eligibility applies" },
          { label: "Temporary Residence Transition", value: "For holders of eligible temporary visas (e.g. 482) after the qualifying period with the nominating employer" },
          { label: "Labour Agreement", value: "For employers with an approved labour agreement covering the occupation" },
        ],
        note: "Stream-specific rules, including the qualifying period and age concessions, are set out on the official 186 page.",
      },
      {
        kind: "process",
        heading: "The ENS journey",
        steps: [
          { title: "Confirm the pathway", body: "Identify which stream applies to your employment situation." },
          { title: "Employer nomination", body: "Your employer applies for nomination of the role with salary evidence." },
          { title: "Visa application", body: "Lodge the 186 application after nomination approval." },
          { title: "Assessment", body: "Health, character and document checks complete with the decision." },
          { title: "Permanent residence", body: "After grant, you hold permanent residence with a five-year travel facility." },
        ],
      },
      {
        kind: "faq",
        heading: "Employer Nomination Scheme, answered",
        items: [
          {
            question: "Can I apply for the 186 while on a 482?",
            answer: "Yes — the Temporary Residence Transition stream is designed for eligible temporary-visa holders after the qualifying period with their nominating employer.",
          },
          {
            question: "What salary applies to 186 nominations?",
            answer: "Nominations lodged since 7 December 2024 in the Direct Entry and TRT streams are assessed against the Core Skills Income Threshold and the Annual Market Salary Rate.",
          },
          {
            question: "Is the age limit strict?",
            answer: "Applicants must generally be under 45, but concessions exist for specific categories — confirm your situation against the current official requirements.",
          },
        ],
      },
    ],
    relatedPages: ["visas/australia/employer-sponsored-482", "visas/australia/skilled-independent-189"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Home Affairs — Employer Nomination Scheme (subclass 186)", url: `${IMMI}visas/getting-a-visa/visa-listing/employer-nomination-scheme-186` },
    ],
  },
  {
    id: "visas/australia/national-innovation-visa-858",
    title: "National Innovation Visa (858)",
    eyebrow: "Australia high-value migration",
    seoTitle: "National Innovation Visa 858 Australia | DMC Immigration Group",
    seoDescription:
      "The National Innovation Visa (subclass 858), which replaced the Global Talent visa — invitation-only permanent residence for internationally recognised talent and innovators.",
    lede: "An invitation-only permanent-residence visa for internationally recognised researchers, innovators, entrepreneurs and cultural figures — the successor to the Global Talent visa.",
    sections: [
      {
        kind: "status",
        label: "Successor to the Global Talent visa — new name, invitation-only",
        tone: "info",
        body: "The National Innovation Visa (NIV), subclass 858, replaced the former Global Talent (formerly Global Talent Independent / GTI) visa in December 2024. The old Global Talent naming no longer applies to new applications.",
      },
      {
        kind: "overview",
        heading: "How the National Innovation Visa works",
        paragraphs: [
          "The National Innovation Visa is a permanent-residence visa for individuals of international standing who can make a distinctive contribution to Australia — leading researchers and academics, founders and investors in cutting-edge ventures, and figures of international renown in fields such as sport, the arts and entrepreneurship.",
          "It is invitation-only: candidates first receive an invitation (often through a nomination or endorsement process), then lodge a visa application. It replaced the Global Talent Independent stream within the former Global Talent visa framework in December 2024.",
          "There is no points test, but applicants must demonstrate exceptional talent through international awards, research impact, patents, publications or equivalent recognition, and show they can remain productive in Australia.",
        ],
      },
      {
        kind: "eligibility",
        heading: "Eligibility essentials",
        items: [
          { title: "Invitation", body: "An invitation to apply, typically after an Expression of Interest and a nomination or endorsement by an appropriate organisation or individual." },
          { title: "Exceptional achievement", body: "Internationally recognised excellence in your field, evidenced by awards, publications, patents or equivalent recognition." },
          { title: "Sustained contribution", body: "Demonstrated ability to make a continuing contribution to Australia in your field." },
          { title: "Endorsement", body: "A nomination (Form 1000) from an eligible nominator where required by the current process." },
          { title: "Health and character", body: "Standard medical and police requirements apply." },
        ],
      },
      {
        kind: "process",
        heading: "The NIV journey",
        steps: [
          { title: "Assess eligibility", body: "Review whether your achievements meet the exceptional-talent threshold and identify a suitable nominator." },
          { title: "Expression of Interest", body: "Submit an EOI and seek nomination or endorsement for the visa." },
          { title: "Receive an invitation", body: "Invitations are issued selectively; invitation does not equal approval." },
          { title: "Apply", body: "Lodge the visa application with evidence of your achievements and recognition." },
          { title: "Settle in Australia", body: "After grant, permanent residence allows unrestricted work and a five-year travel facility." },
        ],
      },
      {
        kind: "faq",
        heading: "National Innovation Visa, answered",
        items: [
          {
            question: "Is this the same as the Global Talent visa?",
            answer: "The NIV is the successor to the Global Talent visa, launched in December 2024. The new naming and invitation process apply to new applications.",
          },
          {
            question: "Can I apply without an invitation?",
            answer: "No — an invitation is required. The EOI and nomination process precedes any visa application.",
          },
          {
            question: "Who can nominate me?",
            answer: "Eligible nominators are defined by the current process and typically include leaders in the relevant field, research organisations or venture partners — check the official page for the current list.",
          },
        ],
      },
    ],
    relatedPages: ["visas/australia/employer-sponsored-482", "visas/australia/skilled-independent-189"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Home Affairs — National Innovation Visa (subclass 858)", url: `${IMMI}visas/getting-a-visa/visa-listing/national-innovation-visa-858` },
    ],
  },
  {
    id: "visas/australia/state-territory-nominations",
    title: "State & Territory Nominations",
    eyebrow: "Australia skilled migration",
    seoTitle: "State & Territory Nominations Australia | DMC Immigration Group",
    seoDescription:
      "How Australian state and territory nomination programs work — 190 and 491 nomination, occupation lists, criteria and application windows per jurisdiction.",
    lede: "A hub for understanding nomination by Australian states and territories — the key to the 190 and 491 points-tested routes.",
    sections: [
      {
        kind: "overview",
        heading: "Why state nomination matters",
        paragraphs: [
          "State and territory governments nominate skilled workers whose occupations and profiles match regional needs. Nomination adds points — five for the 190 and fifteen for the 491 — and opens occupations that may not be available through the independent stream.",
          "Each jurisdiction publishes its own occupation list, criteria, fees and application windows, and many operate invitation-based systems where you register interest and wait for selection.",
          "Because criteria and windows change without much notice, the practical route is to match your profile against current open programs and apply when windows open.",
        ],
      },
      {
        kind: "links",
        heading: "Nomination-based visas",
        items: [
          { title: "Skilled Nominated Visa (190)", path: "/visas/australia/skilled-nominated-190", description: "Permanent residence with state nomination and 5 additional points." },
          { title: "Skilled Work Regional (491)", path: "/visas/australia/skilled-work-regional-491", description: "Provisional regional visa with 15 additional points and a PR pathway." },
          { title: "Skilled Independent (189)", path: "/visas/australia/skilled-independent-189", description: "No nomination needed — compare against nominated routes." },
        ],
      },
      {
        kind: "eligibility",
        heading: "What states assess",
        items: [
          { title: "Occupation lists", body: "Your occupation must be on the jurisdiction's current list, often with specific caveats." },
          { title: "Work and residence links", body: "Many states require current employment in the state, local study, or genuine local commitment." },
          { title: "Points and English", body: "Minimum points and English levels may be set above the federal pass mark." },
          { title: "Intake windows", body: "Applications and registrations open and close in announced windows — timing is part of the strategy." },
        ],
      },
      {
        kind: "process",
        heading: "The nomination process",
        steps: [
          { title: "Shortlist jurisdictions", body: "Compare current occupation lists and criteria across states and territories." },
          { title: "Register or apply", body: "Submit the state's application or register interest in its system." },
          { title: "Wait for nomination", body: "States nominate selectively within their allocated places." },
          { title: "Lodge the visa application", body: "Nominated candidates receive invitations and apply for the 190 or 491." },
          { title: "Settle locally", body: "Commit to living and working in the nominating jurisdiction." },
        ],
      },
      {
        kind: "faq",
        heading: "State nomination, answered",
        items: [
          {
            question: "Can I be nominated by more than one state?",
            answer: "You can register interest in several jurisdictions, but a single nomination is used for one visa application — and declarations must be truthful in every jurisdiction.",
          },
          {
            question: "Do I need to live in the state before applying?",
            answer: "Some states require local study or employment; others accept offshore applicants. Each jurisdiction's criteria decide.",
          },
          {
            question: "How often do occupation lists change?",
            answer: "Lists are reviewed regularly — sometimes multiple times a year — so DMC re-checks them at application time rather than relying on older lists.",
          },
        ],
      },
    ],
    relatedPages: ["visas/australia/skilled-nominated-190", "visas/australia/skilled-work-regional-491"],
    relatedTools: ["tools/australia/occupation-eligibility-checker"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Home Affairs — State and territory nominated", url: `${IMMI}visas/getting-a-visa/visa-listing/skilled-nominated-190` },
    ],
  },
];
