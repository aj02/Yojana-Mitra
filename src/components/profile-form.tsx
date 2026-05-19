"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/section-header";
import { ChipGroup, ChipMulti } from "@/components/chip-group";
import { OrnamentDivider } from "@/components/ornament";
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
    <form onSubmit={submit} className="space-y-16 sm:space-y-20">
      <section>
        <SectionHeader number="01" title="Who you are" hint="Basic profile — age, gender, where you live." />
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="age" className="text-[color:var(--ink-soft)]">Age</Label>
            <Input
              id="age"
              type="number"
              inputMode="numeric"
              min={0}
              max={120}
              value={age}
              placeholder="e.g. 34"
              onChange={(e) => setAge(e.target.value)}
              className="h-11 bg-[color:var(--paper-card)] border-[color:var(--line)] text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)] focus-visible:ring-[color:var(--terracotta-soft)]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender" className="text-[color:var(--ink-soft)]">Gender</Label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as (typeof GENDERS)[number])}
              className="h-11 w-full rounded-md border border-[color:var(--line)] bg-[color:var(--paper-card)] px-3 text-sm text-[color:var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--terracotta-soft)]"
            >
              <option value="">Select…</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="state" className="text-[color:var(--ink-soft)]">State or Union Territory</Label>
            <Input
              id="state"
              list="states-list"
              value={state}
              placeholder="Start typing… e.g. Maharashtra"
              onChange={(e) => setState(e.target.value)}
              className="h-11 bg-[color:var(--paper-card)] border-[color:var(--line)] text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)] focus-visible:ring-[color:var(--terracotta-soft)]"
            />
            <datalist id="states-list">
              {STATES.map((s) => <option key={s} value={s} />)}
            </datalist>
            {state && !stateValid && (
              <p className="text-xs text-[color:var(--terracotta)]">
                Pick a state from the suggestions.
              </p>
            )}
          </div>
        </div>
      </section>

      <OrnamentDivider />

      <section>
        <SectionHeader number="02" title="Your situation" hint="What you do, what you earn, where you fit." />
        <div className="space-y-8">
          <div className="space-y-3">
            <Label className="text-[color:var(--ink-soft)]">Occupation</Label>
            <ChipGroup options={OCCUPATIONS} value={occupation} onChange={setOccupation} ariaLabel="Occupation" />
          </div>
          <div className="space-y-3">
            <Label className="text-[color:var(--ink-soft)]">Annual household income</Label>
            <ChipGroup options={INCOMES} value={income} onChange={setIncome} ariaLabel="Income" />
          </div>
          <div className="space-y-3">
            <Label className="text-[color:var(--ink-soft)]">Social category</Label>
            <ChipGroup options={CATEGORIES} value={category} onChange={setCategory} ariaLabel="Social category" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="education" className="text-[color:var(--ink-soft)]">Education</Label>
            <select
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value as (typeof EDUCATION_LEVELS)[number])}
              className="h-11 w-full rounded-md border border-[color:var(--line)] bg-[color:var(--paper-card)] px-3 text-sm text-[color:var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--terracotta-soft)]"
            >
              <option value="">Select…</option>
              {EDUCATION_LEVELS.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <OrnamentDivider />

      <section>
        <SectionHeader
          number="03"
          title="Anything else"
          hint="Tap all that apply. Many schemes target specific situations."
        />
        <ChipMulti
          options={SPECIAL_STATUSES}
          values={specials}
          onChange={setSpecials}
          ariaLabel="Special statuses"
        />
      </section>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={!ready || loading}
          className="h-14 w-full sm:w-auto rounded-full bg-[color:var(--terracotta)] px-8 text-base text-[color:var(--paper-card)] hover:bg-[color:var(--terracotta)]/90 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Finding schemes…
            </>
          ) : (
            <>
              Find my schemes
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
        {!ready && (
          <p className="mt-3 text-xs text-[color:var(--ink-muted)]">
            Fill all fields above to continue. Special statuses are optional.
          </p>
        )}
      </div>
    </form>
  );
}
