import { z } from "zod";

const MARKETS = ["dubai", "abu-dhabi", "qatar", "kuwait", "india"] as const;

export const leadSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(8, "Please enter a valid phone number").max(20),
  email: z.string().email("Please enter a valid email address"),
  destination: z.string().min(1, "Please select a destination or program"),
  ageRange: z.string().optional().default(""),
  education: z.string().optional().default(""),
  workExperience: z.string().optional().default(""),
  enquiryType: z.string().optional().default("consultation"),
  preferredMarket: z.enum(MARKETS),
  message: z.string().max(2000).optional().default(""),
  sourcePage: z.string().optional().default(""),
  sourceComponent: z.string().optional().default(""),
  currentMarket: z.enum(MARKETS),
  utmSource: z.string().optional().default(""),
  utmMedium: z.string().optional().default(""),
  utmCampaign: z.string().optional().default(""),
  gclid: z.string().optional().default(""),
  consent: z.string(),
  honeypot: z.string().optional().default(""),
}).refine((data) => data.consent === "on", {
  message: "You must agree to the privacy policy and terms",
  path: ["consent"],
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const LEAD_DESTINATIONS = MARKETS;

export type LeadDestination = (typeof MARKETS)[number];
