"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { ChipGroup, ChipMulti } from "@/components/chip-group";
import { Combobox } from "@/components/combobox";
import { FloatingInput } from "@/components/floating-input";
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
import { ArrowRight, Loader2 } from "lucide-react";
import type { Profile, SchemesResponse } from "@/lib/schema";

type Props = {
  onResults: (data: SchemesResponse) => void;
  onLoadingChange: (loading: boolean) => void;
  loading: boolean;
};

const labelClass =
  "block text-[0.7rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)] font-medium";

export function ProfileForm({ onResults, onLoadingChange, loading }: Props) {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [occupation, setOccupation] = useState<(typeof OCCUPATIONS)[number] | null>(null);
  const [income, setIncome] = useState<(typeof INCOMES)[number] | null>(null);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number] | null>(null);
  const [education, setEducation] = useState<string>("");
  const [specials, setSpecials] = useState<(typeof SPECIAL_STATUSES)[number][]>([]);

  const ageNum = Number(age);
  const ageValid = age !== "" && Number.isFinite(ageNum) && ageNum >= 0 && ageNum <= 120;
  const stateValid = (STATES as readonly string[]).includes(state);
  const genderValid = (GENDERS as readonly string[]).includes(gender);
  const educationValid = (EDUCATION_LEVELS as readonly string[]).includes(education);
  const ready =
    ageValid &&
    genderValid &&
    stateValid &&
    !!occupation &&
    !!income &&
    !!category &&
    educationValid;

  const completed = useMemo(() => {
    let n = 0;
    if (ageValid) n++;
    if (genderValid) n++;
    if (stateValid) n++;
    if (occupation) n++;
    if (income) n++;
    if (category) n++;
    if (educationValid) n++;
    return n;
  }, [ageValid, genderValid, stateValid, occupation, income, category, educationValid]);
  const total = 7;
  const pct = Math.round((completed / total) * 100);

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
      {/* Completion bar */}
      <div className="sticky top-[57px] z-10 -mx-2 mb-4 backdrop-blur-md">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[color:var(--violet)] via-[color:var(--pink)] to-[color:var(--cyan)] transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-mono text-[0.7rem] text-[color:var(--text-secondary)] tabular-nums shrink-0">
            {completed}/{total}
          </span>
        </div>
      </div>

      <section>
        <SectionHeader
          number="01"
          title="Who you are"
          hint="A few basics — age, gender, where you live."
        />
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-12">
          <div className="sm:col-span-4">
            <FloatingInput
              label="Age"
              type="number"
              inputMode="numeric"
              min={0}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onClear={() => setAge("")}
              isValid={ageValid}
              invalid={age !== "" && !ageValid}
              hint={age !== "" && !ageValid ? "Between 0 and 120" : undefined}
            />
          </div>
          <div className="sm:col-span-4">
            <Combobox
              label="Gender"
              options={GENDERS}
              value={gender}
              onChange={setGender}
            />
          </div>
          <div className="sm:col-span-4">
            <Combobox
              label="State or UT"
              options={STATES}
              value={state}
              onChange={setState}
              placeholder="Search 36 states & UTs"
              searchable
            />
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
            <span className={labelClass}>
              Occupation {occupation && <Selected />}
            </span>
            <ChipGroup options={OCCUPATIONS} value={occupation} onChange={setOccupation} ariaLabel="Occupation" />
          </div>
          <div className="space-y-3">
            <span className={labelClass}>
              Annual household income {income && <Selected />}
            </span>
            <ChipGroup options={INCOMES} value={income} onChange={setIncome} ariaLabel="Income" />
          </div>
          <div className="space-y-3">
            <span className={labelClass}>
              Social category {category && <Selected />}
            </span>
            <ChipGroup options={CATEGORIES} value={category} onChange={setCategory} ariaLabel="Social category" />
          </div>
          <div className="max-w-sm">
            <Combobox
              label="Education"
              options={EDUCATION_LEVELS}
              value={education}
              onChange={setEducation}
              placeholder="Highest education completed"
            />
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
          {specials.length === 0
            ? "Nothing selected · this is fine"
            : `${specials.length} selected`}
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
            {total - completed} field{total - completed === 1 ? "" : "s"} to go
          </p>
        )}
      </div>
    </form>
  );
}

function Selected() {
  return (
    <span className="ml-1.5 inline-flex h-4 items-center rounded-full bg-gradient-to-r from-[color:var(--violet)]/30 to-[color:var(--pink)]/30 border border-white/10 px-1.5 text-[0.6rem] tracking-normal normal-case text-[color:var(--text-primary)]">
      set
    </span>
  );
}
