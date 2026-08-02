export type ApprovalStatus = "candidate" | "approved" | "rejected";

export interface Testimonial {
  id: string;
  name: string;
  program: string;
  market: string;
  quote: string;
  status: ApprovalStatus;
  sourceUrl: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "mir-ali",
    name: "Mir Ali",
    program: "Skilled pathway",
    market: "Canada",
    quote: "",
    status: "candidate",
    sourceUrl: "https://dm-consultant.ae/client-testimonials/",
  },
  {
    id: "nandita-prakash",
    name: "Nandita Prakash",
    program: "Family pathway",
    market: "Australia",
    quote: "",
    status: "candidate",
    sourceUrl: "https://dm-consultant.ae/client-testimonials/",
  },
  {
    id: "aditya-kain",
    name: "Aditya Kain",
    program: "Express Entry",
    market: "Canada",
    quote: "",
    status: "candidate",
    sourceUrl: "https://dm-consultant.ae/client-testimonials/",
  },
  {
    id: "raheel-bajwa",
    name: "Raheel Bajwa",
    program: "Skilled pathway",
    market: "Canada",
    quote: "",
    status: "candidate",
    sourceUrl: "https://dm-consultant.ae/client-testimonials/",
  },
  {
    id: "mashal-rana",
    name: "Mashal Rana",
    program: "Family pathway",
    market: "Canada",
    quote: "",
    status: "candidate",
    sourceUrl: "https://dm-consultant.ae/client-testimonials/",
  },
  {
    id: "vijay-rajput",
    name: "Vijay Rajput",
    program: "Student pathway",
    market: "Canada",
    quote: "",
    status: "candidate",
    sourceUrl: "https://dm-consultant.ae/client-testimonials/",
  },
  {
    id: "tania-singh",
    name: "Tania Singh",
    program: "Skilled pathway",
    market: "Australia",
    quote: "",
    status: "candidate",
    sourceUrl: "https://dm-consultant.ae/client-testimonials/",
  },
  {
    id: "meena-kapoor",
    name: "Meena Kapoor",
    program: "Family pathway",
    market: "Australia",
    quote: "",
    status: "candidate",
    sourceUrl: "https://dm-consultant.ae/client-testimonials/",
  },
  {
    id: "mehta-jain",
    name: "Mehta Jain",
    program: "Skilled pathway",
    market: "Australia",
    quote: "",
    status: "candidate",
    sourceUrl: "https://dm-consultant.ae/client-testimonials/",
  },
  {
    id: "ankita-batra",
    name: "Ankita Batra",
    program: "Study pathway",
    market: "Australia",
    quote: "",
    status: "candidate",
    sourceUrl: "https://dm-consultant.ae/client-testimonials/",
  },
];

export function approvedTestimonials(limit?: number): Testimonial[] {
  const approved = TESTIMONIALS.filter((t) => t.status === "approved" && t.quote);
  return limit ? approved.slice(0, limit) : approved;
}
