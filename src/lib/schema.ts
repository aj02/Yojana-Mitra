import { z } from "zod";
import {
  STATES,
  OCCUPATIONS,
  INCOMES,
  CATEGORIES,
  SPECIAL_STATUSES,
  EDUCATION_LEVELS,
  GENDERS,
  SCHEME_CATEGORIES,
} from "./constants";

export const ProfileSchema = z.object({
  age: z.number().int().min(0).max(120),
  gender: z.enum(GENDERS),
  state: z.enum(STATES),
  occupation: z.enum(OCCUPATIONS),
  income: z.enum(INCOMES),
  category: z.enum(CATEGORIES),
  education: z.enum(EDUCATION_LEVELS),
  specialStatuses: z.array(z.enum(SPECIAL_STATUSES)).max(SPECIAL_STATUSES.length),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const SchemeSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  level: z.string().min(1),
  benefit: z.string().min(1),
  why_eligible: z.string().min(1),
  how_to_apply: z.string().min(1),
  official_url: z.string().url().or(z.string().min(1)),
  match_score: z.number().min(0).max(100),
  key_documents: z.array(z.string()).default([]),
});

export type Scheme = z.infer<typeof SchemeSchema>;

export const SchemesResponseSchema = z.object({
  summary: z.string().min(1),
  schemes: z.array(SchemeSchema).min(1).max(12),
});

export type SchemesResponse = z.infer<typeof SchemesResponseSchema>;

export { SCHEME_CATEGORIES };

export function buildUserMessage(p: Profile): string {
  const lines = [
    `Age: ${p.age}`,
    `Gender: ${p.gender}`,
    `State/UT: ${p.state}`,
    `Occupation: ${p.occupation}`,
    `Annual household income: ${p.income}`,
    `Social category: ${p.category}`,
    `Education: ${p.education}`,
    `Special statuses: ${p.specialStatuses.length ? p.specialStatuses.join(", ") : "None reported"}`,
  ];
  return `Citizen profile:\n${lines.join("\n")}\n\nReturn 6–8 most relevant schemes as the JSON object specified.`;
}
