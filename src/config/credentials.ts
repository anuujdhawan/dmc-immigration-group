export interface Credential {
  id: string;
  title: string;
  authority: string;
  region: string;
  verifyUrl: string;
  description: string;
}

export interface ConsultantCredential {
  name: string;
  role: string;
  registration: string;
  registerName: string;
  verifyUrl: string;
  status: "candidate";
}

export const CREDENTIALS: Credential[] = [
  {
    id: "rcic",
    title: "RCIC Licensed",
    authority: "CICC Registration — Canada",
    region: "Canada",
    verifyUrl: "https://register.college-ic.ca/",
    description: "Regulated Canadian Immigration Consultant in good standing with the College of Immigration and Citizenship Consultants.",
  },
  {
    id: "mara",
    title: "MARA Registered",
    authority: "Migration Agents Registration Authority",
    region: "Australia",
    verifyUrl: "https://www.mara.gov.au/",
    description: "Registered migration agent authorised to provide immigration assistance for Australia.",
  },
  {
    id: "ama",
    title: "Authorised Migration Agent",
    authority: "Migration Act 1958",
    region: "Australia",
    verifyUrl: "https://www.homeaffairs.gov.au/",
    description: "Registered under the Migration Act 1958 for immigration assistance in Australia.",
  },
  {
    id: "indemnity",
    title: "Fully Insured",
    authority: "Professional Indemnity",
    region: "Global",
    verifyUrl: "",
    description: "Professional indemnity insurance covering immigration advisory work.",
  },
  {
    id: "ethics",
    title: "Ethical Practice",
    authority: "OMARA & CICC Code of Conduct",
    region: "Canada · Australia",
    verifyUrl: "",
    description: "Bound by the professional codes of conduct of the OMARA and the CICC.",
  },
];

export const CONSULTANT_CREDENTIALS: ConsultantCredential[] = [
  {
    name: "Kanika Gaba",
    role: "Regulated Canadian Immigration Consultant",
    registration: "RCIC R534737",
    registerName: "CICC",
    verifyUrl: "https://register.college-ic.ca/",
    status: "candidate",
  },
  {
    name: "Riccardo James Patrick Ippoliti",
    role: "Registered Migration Agent",
    registration: "MARN 1386990",
    registerName: "MARA / OMARA",
    verifyUrl: "https://www.mara.gov.au/",
    status: "candidate",
  },
];
