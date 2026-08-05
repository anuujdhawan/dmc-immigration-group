import type { Flow, Params } from "react-chatbotify";
import { submitChatLead } from "@/features/leads/actions";

export type ChatFlowId =
  | "canada_pr"
  | "australia_pr"
  | "global_visit"
  | "resume_mktg"
  | "not_sure";

export interface ChatFlowMeta {
  id: ChatFlowId;
  label: string;
  icon: string;
}

export const CHAT_FLOWS: ChatFlowMeta[] = [
  { id: "canada_pr", label: "Canada PR", icon: "🇨🇦" },
  { id: "australia_pr", label: "Australia PR", icon: "🇦🇺" },
  { id: "global_visit", label: "Visit Visa", icon: "✈️" },
  { id: "resume_mktg", label: "Resume Marketing", icon: "📋" },
  { id: "not_sure", label: "Not Sure / Explore", icon: "🔍" },
];

const LOCATION_OPTIONS = [
  "UAE",
  "Qatar",
  "Saudi Arabia",
  "Kuwait",
  "Oman",
  "India",
  "Other",
];

/**
 * The contact-collection questions. The chat UI's input-row gate uses these
 * exact strings to detect when a free-text question has been delivered, so
 * keep the copy here as the single source of truth.
 */
export const CONTACT_QUESTION_FRAGMENTS: Record<string, string> = {
  ask_name: "What is your full name?",
  ask_email: "What is your email address?",
  ask_phone: "phone number",
};

export function buildFlow(market: string): Flow {
  // Collected answers, shared across blocks via closure.
  const answers: Record<string, string> = {};

  // Record an option/text answer into the shared `answers` object.
  const record = (key: string) => (params: Params) => {
    answers[key] = params.userInput;
  };

  // Route the initial menu choice into the correct guided flow.
  const route = (params: Params): string => {
    const input = params.userInput;
    const flow = CHAT_FLOWS.find((f) => f.label === input);
    answers.flowLabel = input;
    answers.flowId = flow?.id ?? "unknown";
    if (input === "Canada PR") return "canada_edu";
    if (input === "Australia PR") return "aus_edu";
    if (input === "Visit Visa") return "visit_dest";
    if (input === "Resume Marketing") return "resume_prof";
    return "not_sure_priority";
  };

  return {
    /* ── entry: choose a service path ─────────────────────────── */
    start: {
      message: "Hi there! 👋 Welcome to DM Consultants.\n\nWhat are you interested in today?",
      options: CHAT_FLOWS.map((f) => f.label),
      path: route,
    },

    /* ════════════════════════════════════════════════════════════
       CANADA PR FLOW
       ════════════════════════════════════════════════════════════ */
    canada_edu: {
      message:
        "Great choice! Let's see if you qualify for Canada PR. 🇨🇦\n\nWhat is your highest level of education?",
      options: ["High School", "Diploma", "Bachelor's", "Master's", "Doctorate"],
      path: "canada_age",
    },
    canada_age: {
      message: "Which age range are you in?",
      options: ["18-25", "26-35", "36-45", "46+"],
      path: "canada_english",
    },
    canada_english: {
      message: "Have you taken an English test (IELTS / CELPIP / PTE)?",
      options: ["Have a score", "Booked, awaiting result", "Not yet"],
      path: "canada_work",
    },
    canada_work: {
      message: "How many years of skilled work experience do you have?",
      options: ["0-1", "2-4", "5-9", "10+ years"],
      path: "canada_location",
    },
    canada_location: {
      message: "Where are you currently based?",
      options: LOCATION_OPTIONS,
      path: "ask_name",
    },

    /* ════════════════════════════════════════════════════════════
       AUSTRALIA PR FLOW
       ════════════════════════════════════════════════════════════ */
    aus_edu: {
      message:
        "Excellent! Let's check your Australia PR eligibility. 🇦🇺\n\nWhat is your highest level of education?",
      options: ["Diploma", "Bachelor's", "Master's", "Doctorate"],
      path: "aus_occupation",
    },
    aus_occupation: {
      message: "What is your current occupation / field of work?",
      options: [
        "IT / Software",
        "Engineering",
        "Healthcare / Nursing",
        "Finance / Accounting",
        "Education",
        "Trades / Construction",
        "Other",
      ],
      path: "aus_age",
    },
    aus_age: {
      message: "Which age range are you in?",
      options: ["18-25", "26-32", "33-40", "41-45", "46+"],
      path: "aus_english",
    },
    aus_english: {
      message: "Have you taken an English test (IELTS / PTE)?",
      options: ["Have a score", "Booked, awaiting result", "Not yet"],
      path: "aus_location",
    },
    aus_location: {
      message: "Where are you currently based?",
      options: LOCATION_OPTIONS,
      path: "ask_name",
    },

    /* ════════════════════════════════════════════════════════════
       GLOBAL VISIT VISA FLOW
       ════════════════════════════════════════════════════════════ */
    visit_dest: {
      message: "Where would you like to visit? ✈️\n\nWe assist with visit visas worldwide.",
      options: ["Canada", "Australia", "UK", "USA", "New Zealand", "Schengen", "Other"],
      path: "visit_purpose",
    },
    visit_purpose: {
      message: "What is the purpose of your trip?",
      options: ["Tourism", "Business", "Family & Friends Visit"],
      path: "visit_timing",
    },
    visit_timing: {
      message: "When are you planning to travel?",
      options: ["Within 1 month", "1-3 months", "3-6 months", "Not sure yet"],
      path: "visit_location",
    },
    visit_location: {
      message: "Where are you currently based?",
      options: LOCATION_OPTIONS,
      path: "ask_name",
    },

    /* ════════════════════════════════════════════════════════════
       RESUME MARKETING FLOW
       ════════════════════════════════════════════════════════════ */
    resume_prof: {
      message: "Let's get your career moving! 📋\n\nWhat is your current profession / field?",
      options: [
        "IT / Software",
        "Engineering",
        "Healthcare",
        "Finance / Accounting",
        "Education",
        "Sales / Marketing",
        "Hospitality",
        "Other",
      ],
      path: "resume_exp",
    },
    resume_exp: {
      message: "How many years of experience do you have?",
      options: ["0-2", "3-5", "6-10", "10+ years"],
      path: "resume_employed",
    },
    resume_employed: {
      message: "Are you currently employed?",
      options: ["Yes", "No"],
      path: "resume_target",
    },
    resume_target: {
      message: "Which job market are you targeting?",
      options: ["UAE/GCC", "Canada", "Australia", "Europe", "Open to anywhere"],
      path: "resume_location",
    },
    resume_location: {
      message: "Where are you currently based?",
      options: LOCATION_OPTIONS,
      path: "ask_name",
    },

    /* ════════════════════════════════════════════════════════════
       NOT SURE / EXPLORE OPTIONS FLOW
       ════════════════════════════════════════════════════════════ */
    not_sure_priority: {
      message:
        "No worries — we'll help you figure it out! 🔍\n\nWhat matters most to you right now?",
      options: [
        "Move abroad permanently",
        "Just want to visit",
        "Work abroad temporarily",
        "Improve my resume",
        "Not sure at all",
      ],
      function: record("not_sure_priority"),
      path: "not_sure_country",
    },
    not_sure_country: {
      message: "Is there a country you're leaning towards, even loosely?",
      options: ["Canada", "Australia", "UK-Europe", "USA", "No preference yet"],
      function: record("not_sure_country"),
      path: "not_sure_age",
    },
    not_sure_age: {
      message: "Which age range are you in?",
      options: ["18-25", "26-35", "36-45", "46+"],
      function: record("not_sure_age"),
      path: "not_sure_location",
    },
    not_sure_location: {
      message: "Where are you currently based?",
      options: LOCATION_OPTIONS,
      function: record("not_sure_location"),
      path: "ask_name",
    },

    /* ════════════════════════════════════════════════════════════
       CONTACT COLLECTION (shared by all paths)
       ════════════════════════════════════════════════════════════ */
    ask_name: {
      message: "Almost done! 🎯\n\nWhat is your full name?",
      function: record("name"),
      path: "ask_email",
    },
    ask_email: {
      message: "What is your email address?",
      function: record("email"),
      path: "ask_phone",
    },
    ask_phone: {
      message: "Last one — what is your phone number (with country code)?",
      function: async (params) => {
        answers.phone = params.userInput;
        try {
          await submitChatLead({
            flowId: answers.flowId ?? "unknown",
            flowLabel: answers.flowLabel ?? "Guided Chat",
            answers,
            name: answers.name ?? "",
            email: answers.email ?? "",
            phone: answers.phone ?? "",
            market,
            sourcePage: typeof window !== "undefined" ? window.location.href : "",
          });
        } catch (err) {
          console.error("Chat lead submit failed:", err);
        }
      },
      path: "end",
    },

    /* ════════════════════════════════════════════════════════════
       END
       ════════════════════════════════════════════════════════════ */
    end: {
      message: () =>
        `Thank you, ${answers.name || "there"}! 🙌 We have received your details and an immigration specialist will be in touch shortly.`,
      chatDisabled: true,
    },
  };
}
