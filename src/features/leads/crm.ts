import { env } from "@/config/env/server";
import type { LeadFormData } from "./schema";

/**
 * CRM adapter — disabled by default.
 * When CRM_ENABLED=true, sends a normalized lead payload to the configured endpoint.
 * Replace this implementation with the real CRM provider when selected.
 */
export async function sendToCrm(data: LeadFormData): Promise<boolean> {
  if (!env.CRM_ENABLED) return true;

  try {
    const payload = {
      source: "dmc-website",
      timestamp: new Date().toISOString(),
      contact: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
      },
      enquiry: {
        destination: data.destination,
        ageRange: data.ageRange || null,
        education: data.education || null,
        workExperience: data.workExperience || null,
        type: data.enquiryType,
        message: data.message || null,
      },
      market: data.preferredMarket,
      sourcePage: data.sourcePage || null,
      currentMarket: data.currentMarket,
      utm: {
        source: data.utmSource || null,
        medium: data.utmMedium || null,
        campaign: data.utmCampaign || null,
        gclid: data.gclid || null,
      },
      consent: {
        agreed: true,
        timestamp: new Date().toISOString(),
      },
    };

    const url = `${env.CRM_BASE_URL}${env.CRM_LEADS_ENDPOINT}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (env.CRM_API_KEY) {
      headers[env.CRM_AUTH_HEADER] = `${env.CRM_AUTH_SCHEME} ${env.CRM_API_KEY}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), env.CRM_TIMEOUT_MS);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error("CRM error:", response.status, response.statusText);
      return false;
    }

    return true;
  } catch (err) {
    console.error("CRM send failed:", err);
    return false;
  }
}
