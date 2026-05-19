export type SchemeFact = {
  name: string;
  meta: string;
  benefit: string;
  fact: string;
  category:
    | "health"
    | "agri"
    | "housing"
    | "pension"
    | "insurance"
    | "women"
    | "youth"
    | "banking"
    | "energy"
    | "skill";
};

export const SCHEME_FACTS: SchemeFact[] = [
  {
    name: "Ayushman Bharat PMJAY",
    meta: "Health · Central",
    benefit: "₹5 lakh/year free hospitalization per family.",
    fact: "12+ crore families covered — world's largest publicly funded health scheme.",
    category: "health",
  },
  {
    name: "PM-KISAN Samman Nidhi",
    meta: "Agriculture · Central",
    benefit: "₹6,000/year direct to small & marginal farmers.",
    fact: "₹3.5 lakh crore disbursed to 11 crore farmers since 2019.",
    category: "agri",
  },
  {
    name: "PMAY-G (Gramin)",
    meta: "Housing · Central",
    benefit: "Up to ₹1.3 lakh to build a permanent rural home.",
    fact: "2.5+ crore pucca houses sanctioned for rural families.",
    category: "housing",
  },
  {
    name: "Pradhan Mantri Ujjwala Yojana",
    meta: "Energy · Central",
    benefit: "Free LPG connection + first refill subsidy.",
    fact: "10+ crore connections — cleaner kitchens for women.",
    category: "energy",
  },
  {
    name: "Atal Pension Yojana",
    meta: "Pension · Central",
    benefit: "Guaranteed ₹1,000–₹5,000/month pension after 60.",
    fact: "6+ crore subscribers in India's largest pension net.",
    category: "pension",
  },
  {
    name: "PMJJBY",
    meta: "Insurance · Central",
    benefit: "₹2 lakh life cover for ₹436/year — auto-debit.",
    fact: "Cheapest life insurance in India by a wide margin.",
    category: "insurance",
  },
  {
    name: "PMSBY",
    meta: "Insurance · Central",
    benefit: "₹2 lakh accident cover for ₹20/year.",
    fact: "20 crore enrolments since launch — costs less than chai.",
    category: "insurance",
  },
  {
    name: "Sukanya Samriddhi Yojana",
    meta: "Women & Child · Central",
    benefit: "8.2% tax-free interest for girls under 10.",
    fact: "One of India's highest guaranteed returns.",
    category: "women",
  },
  {
    name: "Jan Dhan Yojana",
    meta: "Financial Inclusion · Central",
    benefit: "Zero-balance bank account + RuPay card + insurance.",
    fact: "53 crore accounts opened — India banked the world's largest unbanked.",
    category: "banking",
  },
  {
    name: "MUDRA Loans",
    meta: "Employment · Central",
    benefit: "Up to ₹20 lakh collateral-free micro-business loan.",
    fact: "47+ crore loans approved across Shishu/Kishor/Tarun tiers.",
    category: "skill",
  },
  {
    name: "Stand Up India",
    meta: "Employment · Central",
    benefit: "₹10 lakh – ₹1 crore loan for SC/ST/women entrepreneurs.",
    fact: "One bank branch must fund at least 2 such borrowers.",
    category: "skill",
  },
  {
    name: "NSAP — Old Age Pension",
    meta: "Social Security · Central",
    benefit: "₹200–₹500/month for poor seniors above 60.",
    fact: "3+ crore elderly, widows, and PwD supported.",
    category: "pension",
  },
  {
    name: "Ladki Bahin Yojana",
    meta: "Women · Maharashtra",
    benefit: "₹1,500/month to eligible women aged 21–65.",
    fact: "2+ crore Maharashtrian women enrolled since 2024.",
    category: "women",
  },
  {
    name: "Gruha Lakshmi",
    meta: "Women · Karnataka",
    benefit: "₹2,000/month to women heads of household.",
    fact: "Rolled out to 1.2+ crore Karnataka households.",
    category: "women",
  },
  {
    name: "Kalaignar Magalir Urimai",
    meta: "Women · Tamil Nadu",
    benefit: "₹1,000/month to eligible women.",
    fact: "Reaches over 1 crore Tamil Nadu women.",
    category: "women",
  },
  {
    name: "Rythu Bandhu",
    meta: "Agriculture · Telangana",
    benefit: "₹5,000/acre per season investment support.",
    fact: "Telangana's flagship farmer support — landed beneficiaries.",
    category: "agri",
  },
  {
    name: "NMMS Scholarship",
    meta: "Education · Central",
    benefit: "₹12,000/year for class 9–12 from low-income families.",
    fact: "Awarded by national merit-cum-means test.",
    category: "youth",
  },
  {
    name: "e-Shram Card",
    meta: "Social Security · Central",
    benefit: "Unique ID + accident cover for unorganised workers.",
    fact: "30+ crore workers registered — India's largest gig/unorganised database.",
    category: "banking",
  },
  {
    name: "PM Vishwakarma",
    meta: "Skill · Central",
    benefit: "Toolkit + ₹3 lakh subsidised credit for traditional artisans.",
    fact: "Targets 18 traditional trades — potters, weavers, blacksmiths.",
    category: "skill",
  },
  {
    name: "Saksham Scholarship",
    meta: "Education · Central",
    benefit: "₹50,000/year for PwD students pursuing technical degrees.",
    fact: "Awarded to 1,000 differently-abled students annually.",
    category: "youth",
  },
];

export const CATEGORY_COLORS: Record<SchemeFact["category"], { from: string; to: string }> = {
  health:    { from: "#ec4899", to: "#f97316" },
  agri:      { from: "#10b981", to: "#84cc16" },
  housing:   { from: "#a855f7", to: "#ec4899" },
  pension:   { from: "#3b82f6", to: "#a855f7" },
  insurance: { from: "#ec4899", to: "#a855f7" },
  women:     { from: "#f43f5e", to: "#ec4899" },
  youth:     { from: "#06b6d4", to: "#3b82f6" },
  banking:   { from: "#06b6d4", to: "#10b981" },
  energy:    { from: "#f59e0b", to: "#ec4899" },
  skill:     { from: "#a855f7", to: "#06b6d4" },
};

export const LOADING_STEPS = [
  "Reading your profile…",
  "Scanning 950+ schemes…",
  "Cross-checking eligibility rules…",
  "Looking at your state schemes…",
  "Sorting by match strength…",
  "Pulling official application portals…",
  "Compiling document checklists…",
  "Finalising your matches…",
];
