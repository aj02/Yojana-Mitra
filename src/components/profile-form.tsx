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
import { ArrowRight, Loader2 } from "lucide-react";
import type { Profile, SchemesResponse } from "@/lib/schema";

type Props = {
  onResults: (data: SchemesResponse) => void;
  onLoadingChange: (loading: boolean) => void;
  loading: boolean;
};

const inputBase =
  "h-12 w-full bg-transparent border-b-2 border-[color:var(--cream-soft)] focus:border-[color:var(--marigold)] outline-none px-1 text-[color:var(--cream)] placeholder:text-[color:var(--cream-soft)]/50 transition-colors font-display text-xl";

const labelBase =
  "font-mono text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--cream-soft)]";

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
    <form onSubmit={submit} className="space-y-20 sm:space-y-24">
      <section>
        <SectionHeader
          number="01"
          title="Who you are"
          hint="A few basics — age, where you live, how you'd describe yourself."
        />
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-12">
          <div className="space-y-2 sm:col-span-3">
            <Label htmlFor="age" className={labelBase}>Age</Label>
            <input
              id="age"
              type="number"
              inputMode="numeric"
              min={0}
              max={120}
              value={age}
              placeholder="34"
              onChange={(e) => setAge(e.target.value)}
              className={inputBase}
            />
          </div>
          <div className="space-y-2 sm:col-span-9">
            <Label htmlFor="gender" className={labelBase}>Gender</Label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as (typeof GENDERS)[number])}
              className={inputBase + " appearance-none cursor-pointer"}
              style={{
                backgroundImage:
                  "linear-gradient(45deg, transparent 50%, var(--marigold) 50%), linear-gradient(135deg, var(--marigold) 50%, transparent 50%)",
                backgroundPosition:
                  "calc(100% - 14px) 1.35rem, calc(100% - 8px) 1.35rem",
                backgroundSize: "6px 6px, 6px 6px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <option value="" className="bg-[color:var(--night)]">Choose…</option>
              {GENDERS.map((g) => (
                <option key={g} value={g} className="bg-[color:var(--night)]">{g}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 sm:col-span-12">
            <Label htmlFor="state" className={labelBase}>State or Union Territory</Label>
            <input
              id="state"
              list="states-list"
              value={state}
              placeholder="Start typing… e.g. Maharashtra"
              onChange={(e) => setState(e.target.value)}
              className={inputBase}
              autoComplete="off"
            />
            <datalist id="states-list">
              {STATES.map((s) => <option key={s} value={s} />)}
            </datalist>
            {state && !stateValid && (
              <p className="font-mono text-xs text-[color:var(--vermilion)]">
                ⚠ Pick one from the list.
              </p>
            )}
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          number="02"
          title="Your situation"
          hint="What you do, what you earn, where you fit. Tap one in each row."
        />
        <div className="space-y-10">
          <div className="space-y-4">
            <Label className={labelBase}>Occupation</Label>
            <ChipGroup options={OCCUPATIONS} value={occupation} onChange={setOccupation} ariaLabel="Occupation" />
          </div>
          <div className="space-y-4">
            <Label className={labelBase}>Annual household income</Label>
            <ChipGroup options={INCOMES} value={income} onChange={setIncome} ariaLabel="Income" />
          </div>
          <div className="space-y-4">
            <Label className={labelBase}>Social category</Label>
            <ChipGroup options={CATEGORIES} value={category} onChange={setCategory} ariaLabel="Social category" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="education" className={labelBase}>Education</Label>
            <select
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value as (typeof EDUCATION_LEVELS)[number])}
              className={inputBase + " appearance-none cursor-pointer"}
              style={{
                backgroundImage:
                  "linear-gradient(45deg, transparent 50%, var(--marigold) 50%), linear-gradient(135deg, var(--marigold) 50%, transparent 50%)",
                backgroundPosition:
                  "calc(100% - 14px) 1.35rem, calc(100% - 8px) 1.35rem",
                backgroundSize: "6px 6px, 6px 6px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <option value="" className="bg-[color:var(--night)]">Choose…</option>
              {EDUCATION_LEVELS.map((e) => (
                <option key={e} value={e} className="bg-[color:var(--night)]">{e}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          number="03"
          title="Anything else"
          hint="Tap any that apply. Many schemes target specific situations — being a widow, a senior, owning farmland, living rural."
        />
        <ChipMulti
          options={SPECIAL_STATUSES}
          values={specials}
          onChange={setSpecials}
          ariaLabel="Special statuses"
        />
        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--cream-soft)]">
          {specials.length === 0 ? "None selected · optional" : `${specials.length} selected`}
        </p>
      </section>

      <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <button
          type="submit"
          disabled={!ready || loading}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-[color:var(--marigold)] text-[color:var(--night)] font-display text-xl tracking-tight border-2 border-[color:var(--marigold)] stamp-shadow-cream transition-all duration-150 hover:bg-[color:var(--vermilion)] hover:border-[color:var(--vermilion)] hover:text-[color:var(--cream)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[color:var(--marigold)] disabled:hover:text-[color:var(--night)]"
        >
          {loading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Finding schemes
            </>
          ) : (
            <>
              Find my schemes
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
        {!ready && (
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--cream-soft)]">
            ↑ Complete fields above
          </p>
        )}
      </div>
    </form>
  );
}
