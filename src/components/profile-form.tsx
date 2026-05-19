"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/section-header";
import { ChipGroup, ChipMulti } from "@/components/chip-group";
import {
  STATES,
  OCCUPATIONS,
  INCOMES,
  CATEGORIES,
  SPECIAL_STATUSES,
  EDUCATION_LEVELS,
  GENDERS,
} from "@/lib/constants";
import { toast } from "sonner";
import { ArrowRight, Loader2, ChevronDown } from "lucide-react";
import type { Profile, SchemesResponse } from "@/lib/schema";

type Props = {
  onResults: (data: SchemesResponse) => void;
  onLoadingChange: (loading: boolean) => void;
  loading: boolean;
};

const labelClass =
  "text-xs uppercase tracking-[0.12em] text-[color:var(--text-muted)] font-medium";
const inputClass =
  "h-12 w-full rounded-xl bg-[color:var(--surface)] border border-[color:var(--line)] px-4 text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] outline-none transition-all focus:border-[color:var(--violet)] focus:bg-[color:var(--surface-2)] focus:shadow-[0_0_0_4px_rgba(168,85,247,0.15)]";

export function ProfileForm({ onResults, onLoadingChange, loading }: Props) {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<(typeof GENDERS)[number] | "">("");
  const [state, setState] = useState<string>("");
  const [occupation, setOccupation] = useState<(typeof OCCUPATIONS)[number] | null>(null);
  const [income, setIncome] = useState<(typeof INCOMES)[number] | null>(null);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number] | null>(null);
  const [education, setEducation] = useState<(typeof EDUCATION_LEVELS)[number] | "">("");
  const [specials, setSpecials] = useState<(typeof SPECIAL_STATUSES)[number][]>([]);

  const ageNum = Number(age);
  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum >= 0 && ageNum <= 120;
  const stateValid = (STATES as readonly string[]).includes(state);
  const ready =
    ageValid &&
    !!gender &&
    stateValid &&
    !!occupation &&
    !!income &&
    !!category &&
    !!education;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || loading) return;

    const profile: Profile = {
      age: ageNum,
      gender: gender as (typeof GENDERS)[number],
      state: state as Profile["state"],
      occupation: occupation!,
      income: income!,
      category: category!,
      education: education as (typeof EDUCATION_LEVELS)[number],
      specialStatuses: specials,
    };

    onLoadingChange(true);
    try {
      const res = await fetch("/api/schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error ?? "Something went wrong. Try again.");
        return;
      }
      onResults(data as SchemesResponse);
    } catch {
      toast.error("Could not reach the server. Check your connection.");
    } finally {
      onLoadingChange(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-14 sm:space-y-16">
      <section>
        <SectionHeader
          number="01"
          title="Who you are"
          hint="A few basics — age, gender, where you live."
        />
        <div className="grid gap-5 sm:grid-cols-12">
          <div className="space-y-2 sm:col-span-3">
            <Label htmlFor="age" className={labelClass}>Age</Label>
            <input
              id="age"
              type="number"
              inputMode="numeric"
              min={0}
              max={120}
              value={age}
              placeholder="34"
              onChange={(e) => setAge(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2 sm:col-span-5">
            <Label htmlFor="gender" className={labelClass}>Gender</Label>
            <div className="relative">
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as (typeof GENDERS)[number])}
                className={inputClass + " appearance-none pr-10 cursor-pointer"}
              >
                <option value="">Select</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--text-muted)]" />
            </div>
          </div>
          <div className="space-y-2 sm:col-span-4">
            <Label htmlFor="state" className={labelClass}>State / UT</Label>
            <input
              id="state"
              list="states-list"
              value={state}
              placeholder="e.g. Maharashtra"
              onChange={(e) => setState(e.target.value)}
              className={inputClass}
              autoComplete="off"
            />
            <datalist id="states-list">
              {STATES.map((s) => <option key={s} value={s} />)}
            </datalist>
            {state && !stateValid && (
              <p className="text-xs text-[color:var(--pink)]">Pick one from the list.</p>
            )}
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          number="02"
          title="Your situation"
          hint="What you do, what you earn, where you fit."
        />
        <div className="space-y-8">
          <div className="space-y-3">
            <Label className={labelClass}>Occupation</Label>
            <ChipGroup options={OCCUPATIONS} value={occupation} onChange={setOccupation} ariaLabel="Occupation" />
          </div>
          <div className="space-y-3">
            <Label className={labelClass}>Annual household income</Label>
            <ChipGroup options={INCOMES} value={income} onChange={setIncome} ariaLabel="Income" />
          </div>
          <div className="space-y-3">
            <Label className={labelClass}>Social category</Label>
            <ChipGroup options={CATEGORIES} value={category} onChange={setCategory} ariaLabel="Social category" />
          </div>
          <div className="space-y-2 max-w-sm">
            <Label htmlFor="education" className={labelClass}>Education</Label>
            <div className="relative">
              <select
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value as (typeof EDUCATION_LEVELS)[number])}
                className={inputClass + " appearance-none pr-10 cursor-pointer"}
              >
                <option value="">Select</option>
                {EDUCATION_LEVELS.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--text-muted)]" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          number="03"
          title="Anything else"
          hint="Optional — tap any that apply. Many schemes target specific situations."
        />
        <ChipMulti
          options={SPECIAL_STATUSES}
          values={specials}
          onChange={setSpecials}
          ariaLabel="Special statuses"
        />
        <p className="mt-4 text-xs text-[color:var(--text-muted)]">
          {specials.length === 0 ? "Nothing selected · this is fine" : `${specials.length} selected`}
        </p>
      </section>

      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="submit"
          disabled={!ready || loading}
          className="group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-medium bg-gradient-to-r from-[color:var(--violet)] via-[color:var(--pink)] to-[color:var(--cyan)] text-white shadow-[0_8px_32px_-8px_rgba(168,85,247,0.7)] hover:shadow-[0_12px_40px_-8px_rgba(168,85,247,0.85)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Finding your schemes…
            </>
          ) : (
            <>
              Find my schemes
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
        {!ready && !loading && (
          <p className="text-xs text-[color:var(--text-muted)]">
            Complete the required fields above
          </p>
        )}
      </div>
    </form>
  );
}
