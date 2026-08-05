import { z } from "zod";

const MARKETS = ["dubai", "abu-dhabi", "qatar", "kuwait", "india"] as const;

export const leadSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(8, "Please enter a valid phone number").max(20),
  email: z.string().email("Please enter a valid email address"),
  destination: z.string().min(1, "Please select a destination or program"),
  ageRange: z.string().optional(),
  education: z.string().optional(),
  enquiryType: z.enum(["consultation", "eligibility", "callback", "guided-chat"]).default("consultation"),
  preferredMarket: z.enum(MARKETS),
  message: z.string().max(2000).optional(),
  sourcePage: z.string().optional(),
  sourceComponent: z.string().optional(),
  currentMarket: z.enum(MARKETS),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  consent: z.literal("on", {
    errorMap: () => ({ message: "You must agree to the privacy policy and terms" }),
  }),
  honeypot: z.string().max(0, "Bot detected").optional().default(""),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const LEAD_DESTINATIONS = MARKETS;

export type LeadDestination = (typeof MARKETS)[number];
