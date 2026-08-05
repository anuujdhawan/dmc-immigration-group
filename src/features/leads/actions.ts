"use server";

import { Resend } from "resend";
import { env } from "@/config/env/server";
import { leadSchema, type LeadFormData } from "./schema";
import { sendToCrm } from "./crm";

interface LeadResult {
  success: boolean;
  error?: string;
}

function buildLeadEmail(data: LeadFormData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New Enquiry — ${data.destination} (${data.preferredMarket})`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2A7015;">New Lead from DMC Website</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${escapeHtml(data.fullName)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${escapeHtml(data.phone)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Destination/Program:</td><td style="padding: 8px;">${escapeHtml(data.destination)}</td></tr>
        ${data.ageRange ? `<tr><td style="padding: 8px; font-weight: bold;">Age Range:</td><td style="padding: 8px;">${escapeHtml(data.ageRange)}</td></tr>` : ""}
        ${data.education ? `<tr><td style="padding: 8px; font-weight: bold;">Education:</td><td style="padding: 8px;">${escapeHtml(data.education)}</td></tr>` : ""}
        ${data.workExperience ? `<tr><td style="padding: 8px; font-weight: bold;">Work Experience:</td><td style="padding: 8px;">${escapeHtml(data.workExperience)}</td></tr>` : ""}
        <tr><td style="padding: 8px; font-weight: bold;">Preferred Market:</td><td style="padding: 8px;">${escapeHtml(data.preferredMarket)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Enquiry Type:</td><td style="padding: 8px;">${escapeHtml(data.enquiryType)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Source Page:</td><td style="padding: 8px;">${escapeHtml(data.sourcePage || "N/A")}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Current Market:</td><td style="padding: 8px;">${escapeHtml(data.currentMarket)}</td></tr>
        ${data.utmSource ? `<tr><td style="padding: 8px; font-weight: bold;">UTM Source:</td><td style="padding: 8px;">${escapeHtml(data.utmSource)}</td></tr>` : ""}
        ${data.utmMedium ? `<tr><td style="padding: 8px; font-weight: bold;">UTM Medium:</td><td style="padding: 8px;">${escapeHtml(data.utmMedium)}</td></tr>` : ""}
        ${data.utmCampaign ? `<tr><td style="padding: 8px; font-weight: bold;">UTM Campaign:</td><td style="padding: 8px;">${escapeHtml(data.utmCampaign)}</td></tr>` : ""}
        ${data.gclid ? `<tr><td style="padding: 8px; font-weight: bold;">Google Click ID (gclid):</td><td style="padding: 8px;">${escapeHtml(data.gclid)}</td></tr>` : ""}
        ${data.message ? `<tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${escapeHtml(data.message)}</td></tr>` : ""}
      </table>
      <p style="color: #666; font-size: 12px; margin-top: 24px;">Submitted at ${new Date().toISOString()}</p>
    </div>
  `;
  const text = [
    `New Lead from DMC Website`,
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Destination: ${data.destination}`,
    ...(data.workExperience ? [`Work Experience: ${data.workExperience}`] : []),
    `Preferred Market: ${data.preferredMarket}`,
    `Enquiry Type: ${data.enquiryType}`,
    ...(data.utmSource ? [`UTM Source: ${data.utmSource}`] : []),
    ...(data.utmMedium ? [`UTM Medium: ${data.utmMedium}`] : []),
    ...(data.utmCampaign ? [`UTM Campaign: ${data.utmCampaign}`] : []),
    ...(data.gclid ? [`Google Click ID: ${data.gclid}`] : []),
    data.message ? `Message: ${data.message}` : "",
    `Source: ${data.sourcePage || "N/A"}`,
    `Submitted at: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendViaResend(data: LeadFormData): Promise<boolean> {
  if (!env.RESEND_ENABLED) return true;

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const { subject, html, text } = buildLeadEmail(data);

    const toEmail =
      env[`DMC_${data.preferredMarket.toUpperCase().replace("-", "_")}_LEAD_TO_EMAIL` as keyof typeof env] ||
      env.RESEND_REPLY_TO_EMAIL;

    const from = `${env.RESEND_FROM_NAME} <${env.RESEND_FROM_LOCAL_PART}@${env.RESEND_SENDING_DOMAIN}>`;

    const { error } = await resend.emails.send({
      from,
      to: [toEmail as string],
      subject,
      html,
      text,
      replyTo: env.RESEND_REPLY_TO_EMAIL || undefined,
    });
    if (error) {
      console.error("Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send failed:", err);
    return false;
  }
}

export async function submitLead(formData: LeadFormData): Promise<LeadResult> {
  // Honeypot check
  if (formData.honeypot && formData.honeypot.length > 0) {
    // Silently reject bots
    return { success: true };
  }

  // Server-side validation
  const parsed = leadSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: "Please check your form inputs and try again." };
  }

  const data = parsed.data;

  // Send via Resend and CRM in parallel
  const results = await Promise.allSettled([
    sendViaResend(data),
    sendToCrm(data),
  ]);

  const emailResult = results[0];

  const emailSuccess =
    emailResult.status === "fulfilled" && emailResult.value;

  // If both Resend and CRM are disabled, still return success (form was validated)
  const resendAttempted = env.RESEND_ENABLED;
  const crmAttempted = env.CRM_ENABLED;

  if (!resendAttempted && !crmAttempted) {
    return { success: true };
  }

  if (resendAttempted && !emailSuccess) {
    return { success: false, error: "Failed to send enquiry email. Please try again or contact us directly." };
  }

  return { success: true };
}

/* ────────────────────────────────────────────────────────────────────────────
   Guided-chat lead delivery (DmcGuidedChat)
   Recipient resolution order:
   1. DMC_CHATBOT_LEAD_TO_EMAIL   (primary, easily editable in .env)
   2. DMC_<MARKET>_LEAD_TO_EMAIL  (per-market fallback)
   3. RESEND_REPLY_TO_EMAIL
   ──────────────────────────────────────────────────────────────────────────── */

export interface ChatLeadPayload {
  flowId: string;
  flowLabel: string;
  answers: Record<string, string>;
  name: string;
  email: string;
  phone: string;
  market: string;
  sourcePage?: string;
}

const CHAT_ANSWER_LABELS: Record<string, string> = {
  flowLabel: "Flow",
  canada_edu: "Education",
  canada_age: "Age Range",
  canada_english: "English Test",
  canada_work: "Work Experience",
  canada_location: "Current Location",
  aus_edu: "Education",
  aus_occupation: "Occupation",
  aus_age: "Age Range",
  aus_english: "English Test",
  aus_location: "Current Location",
  visit_dest: "Destination",
  visit_purpose: "Trip Purpose",
  visit_timing: "Travel Timing",
  visit_location: "Current Location",
  resume_prof: "Profession",
  resume_exp: "Experience",
  resume_employed: "Currently Employed",
  resume_target: "Target Market",
  resume_location: "Current Location",
  not_sure_priority: "Priority",
  not_sure_country: "Preferred Country",
  not_sure_age: "Age Range",
  not_sure_location: "Current Location",
};

function chatAnswerLabel(key: string): string {
  return CHAT_ANSWER_LABELS[key] ?? key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildChatLeadEmail(data: ChatLeadPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New Chat Lead — ${data.flowLabel} (${data.market})`;

  const answerRows = Object.entries(data.answers)
    .filter(([key, value]) => value && !["name", "email", "phone", "flowId"].includes(key))
    .map(
      ([key, value]) =>
        `<tr><td style="padding: 8px; font-weight: bold;">${escapeHtml(chatAnswerLabel(key))}:</td><td style="padding: 8px;">${escapeHtml(value)}</td></tr>`,
    )
    .join("\n");

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2A7015;">New Chat Lead from DMC Website</h2>
      <p style="color: #444;">A visitor completed the guided chat on the website.</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${escapeHtml(data.phone)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Flow:</td><td style="padding: 8px;">${escapeHtml(data.flowLabel)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Preferred Market:</td><td style="padding: 8px;">${escapeHtml(data.market)}</td></tr>
        ${answerRows}
        <tr><td style="padding: 8px; font-weight: bold;">Source Page:</td><td style="padding: 8px;">${escapeHtml(data.sourcePage || "N/A")}</td></tr>
      </table>
      <p style="color: #666; font-size: 12px; margin-top: 24px;">Submitted at ${new Date().toISOString()}</p>
    </div>
  `;

  const answerLines = Object.entries(data.answers)
    .filter(([key, value]) => value && !["name", "email", "phone", "flowId"].includes(key))
    .map(([key, value]) => `${chatAnswerLabel(key)}: ${value}`);

  const text = [
    `New Chat Lead from DMC Website`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Flow: ${data.flowLabel}`,
    `Preferred Market: ${data.market}`,
    ...answerLines,
    `Source: ${data.sourcePage || "N/A"}`,
    `Submitted at: ${new Date().toISOString()}`,
  ].join("\n");

  return { subject, html, text };
}

export async function submitChatLead(payload: ChatLeadPayload): Promise<LeadResult> {
  if (!env.RESEND_ENABLED) return { success: true };

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const { subject, html, text } = buildChatLeadEmail(payload);

    const marketEnvKey = `DMC_${payload.market.toUpperCase().replace("-", "_")}_LEAD_TO_EMAIL`;
    const toEmail =
      env.DMC_CHATBOT_LEAD_TO_EMAIL ||
      (env[marketEnvKey as keyof typeof env] as string) ||
      env.RESEND_REPLY_TO_EMAIL;

    const from = `${env.RESEND_FROM_NAME} <${env.RESEND_FROM_LOCAL_PART}@${env.RESEND_SENDING_DOMAIN}>`;

    const { error } = await resend.emails.send({
      from,
      to: [toEmail],
      subject,
      html,
      text,
      replyTo: env.RESEND_REPLY_TO_EMAIL || undefined,
    });
    if (error) {
      console.error("Resend chat-lead error:", error);
      return { success: false, error: "Failed to send chat lead email." };
    }
    return { success: true };
  } catch (err) {
    console.error("Resend chat-lead send failed:", err);
    return { success: false, error: "Failed to send chat lead email." };
  }
}
