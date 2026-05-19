"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Ornament } from "@/components/ornament";
import { ProfileForm } from "@/components/profile-form";
import { ResultsView } from "@/components/results-view";
import type { SchemesResponse } from "@/lib/schema";

export default function Home() {
  const [results, setResults] = useState<SchemesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      {!results && (
        <main className="flex-1">
          <section className="mx-auto max-w-2xl px-6 sm:px-8 pt-16 sm:pt-24 pb-10">
            <div className="mb-8">
              <Ornament size={36} />
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--ink-muted)] mb-4">
              An aid for navigating welfare schemes
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] tracking-tight text-[color:var(--ink)] text-balance">
              The benefits you&apos;ve already earned, in plain sight.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink-soft)] text-pretty">
              Tens of thousands of crores in Indian government welfare benefits
              go unclaimed every year — pensions, scholarships, housing
              support, cash transfers, free health cover. The problem is rarely
              eligibility. It&apos;s discovery.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[color:var(--ink-soft)] text-pretty">
              Tell us a little about yourself. Within seconds, you&apos;ll see
              the central and state schemes you may qualify for, with how to
              apply for each.
            </p>
          </section>

          <section className="mx-auto max-w-2xl px-6 sm:px-8 pb-24">
            <ProfileForm
              onResults={setResults}
              onLoadingChange={setLoading}
              loading={loading}
            />
          </section>
        </main>
      )}

      {results && (
        <main ref={resultsRef} className="flex-1">
          <ResultsView data={results} onReset={() => setResults(null)} />
        </main>
      )}

      <Footer />
    </div>
  );
}
