# Yojana Mitra

> A short profile reveals the Indian central and state welfare schemes you may qualify for. Built for citizens, social workers, and panchayats.

Tens of thousands of crores in Indian government welfare benefits go unclaimed every year — pensions, scholarships, housing support, cash transfers, free health cover. The bottleneck is rarely eligibility; it is discovery. **Yojana Mitra** takes a one-minute profile and asks an LLM to surface the 6–8 most relevant schemes (Central + State) for that person, with how to apply and what documents to keep ready.

---

## Stack

- **Next.js 16** (App Router, RSC) with TypeScript
- **Tailwind CSS v4** + **shadcn/ui** (radix-nova preset, neutral base, CSS variables)
- **DeepInfra** for inference — model `meta-llama/Llama-3.3-70B-Instruct`, `response_format: json_object`
- **Upstash Redis + Ratelimit** — 5 requests / hour / IP on `/api/schemes`
- **Zod v4** — strict server-side validation of the form payload
- **lucide-react** icons, **sonner** toasts
- Fonts: **Fraunces** (display, editorial serif) + **Geist** (body)

The DeepInfra API key lives only in `process.env` on the server. Nothing in the client bundle references it.

---

## Local setup

```bash
git clone <this-repo>
cd Yojana-Mitra
npm install
cp .env.example .env.local
# fill in the three keys (see below)
npm run dev
```

Open <http://localhost:3000>. Fill the form. Hit "Find my schemes →".

### Environment variables

| Var | Where to get it | Required |
|-----|-----------------|----------|
| `DEEPINFRA_API_KEY` | <https://deepinfra.com> → API Keys | Yes |
| `UPSTASH_REDIS_REST_URL` | <https://console.upstash.com> → create Redis DB | Recommended (in production) |
| `UPSTASH_REDIS_REST_TOKEN` | Same Upstash DB → REST token | Recommended (in production) |
| `NEXT_PUBLIC_SITE_URL` | Your deployment URL — used in `sitemap.ts` | Optional |

If the Upstash vars are missing, the rate limiter is disabled (handy for local dev) but the route still works. **Do not deploy publicly without them** — one viral share of an unprotected API costs real money in DeepInfra credits.

---

## Project layout

```
src/
  app/
    layout.tsx            # fonts, metadata, Toaster
    page.tsx              # hero + form, or results
    globals.css           # design tokens (paper/ink/terracotta)
    robots.ts / sitemap.ts
    api/schemes/route.ts  # POST → ratelimit → Zod → DeepInfra → return
  components/
    profile-form.tsx      # 3 sections, chip groups, native datalist for state
    results-view.tsx      # filterable list of scheme cards
    scheme-card.tsx       # one card per scheme
    chip-group.tsx        # ChipGroup (single) + ChipMulti
    section-header.tsx    # "01 / Title" editorial header
    ornament.tsx          # nested-square SVG inspired by jaali lattice work
    header.tsx, footer.tsx
    ui/                   # shadcn outputs (button, input, dialog, …)
  lib/
    constants.ts          # states, occupations, incomes, statuses
    system-prompt.ts      # LLM system prompt (verbatim from spec)
    schema.ts             # Zod schema for the form payload + LLM response
    deepinfra.ts          # client + JSON-extraction helper
    ratelimit.ts          # Upstash sliding-window 5/hour/IP
    utils.ts              # shadcn cn()
```

---

## API contract

`POST /api/schemes` — body:

```json
{
  "age": 28,
  "gender": "Female",
  "state": "Maharashtra",
  "occupation": "Farmer",
  "income": "₹1 – 2.5 lakh",
  "category": "OBC",
  "education": "Class 12 (HSC)",
  "specialStatuses": ["Owns farmland", "Lives in rural area"]
}
```

Response (200):

```json
{
  "summary": "…",
  "schemes": [
    {
      "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      "category": "Agriculture",
      "level": "Central",
      "benefit": "₹6,000/year direct income support …",
      "why_eligible": "…",
      "how_to_apply": "Register at pmkisan.gov.in or via your CSC.",
      "official_url": "https://pmkisan.gov.in",
      "match_score": 94,
      "key_documents": ["Aadhaar", "Bank passbook", "Land records"]
    }
  ]
}
```

Status codes:

- `200` – schemes returned, sorted by `match_score` descending
- `400` – body failed Zod validation
- `429` – rate limit hit (includes `Retry-After` header)
- `502` – upstream model/parse error

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. <https://vercel.com> → **Add New Project** → import the repo.
3. **Settings → Environment Variables** — add the three keys for both Production and Preview.
4. Deploy. First push gives `yojana-mitra-<hash>.vercel.app`.
5. (Optional) Add a custom domain — `.in` is ~₹700/year, `.app` ~₹1500/year. Vercel → Domains → Add → follow the DNS instructions.
6. Smoke-test:
   - Submit a real profile, confirm 6–8 schemes return in < 8 seconds.
   - Hit the route 6 times within an hour — the 6th should 429.
7. Add the deployed URL to Google Search Console; submit the sitemap.

### Cost projection

At ~2K input + ~1.5K output tokens per call and Llama-3.3-70B pricing (~$0.23/M input, $0.40/M output), **1,000 daily form submissions ≈ ₹450/month**. Vercel free tier and Upstash free tier (10K commands/day) cover this volume.

### Swapping models

Change `MODEL` in [src/lib/deepinfra.ts](src/lib/deepinfra.ts#L2). DeepInfra exposes Llama 3.x, Qwen, DeepSeek, Mistral, and others under an OpenAI-compatible Chat Completions API — no other code changes needed as long as the model supports `response_format: json_object`.

---

## Design system

Editorial-civic. Warm cream paper, ink black, terracotta accent — no tricolor clichés. Tokens live in [src/app/globals.css](src/app/globals.css):

| Token | Value | Use |
|-------|-------|-----|
| `--paper` | `#f7f1e6` | Page background |
| `--paper-card` | `#fffaf1` | Card background |
| `--ink` | `#1a1611` | Headlines, body |
| `--ink-soft` | `#4a4138` | Long-form copy |
| `--ink-muted` | `#877867` | Meta, labels |
| `--terracotta` | `#b8421f` | Primary CTA, match badge |
| `--forest` | `#2d5e3e` | Reserved for success states |
| `--line` | `#d9cdb8` | Dividers, borders |

The only decorative element is a nested-square SVG inspired by *jaali* lattice work — see [src/components/ornament.tsx](src/components/ornament.tsx). No stock photos, no illustrations. Restraint is the look.

---

## What's NOT in v1 (intentional)

- No user accounts / signup — friction kills the proposition.
- No URL allowlist — the LLM-returned URLs are shown with a clear disclaimer that users must verify on official portals. A maintained allowlist is the right v2 move.
- Results are stored in client state only — refresh wipes them. A `sessionStorage`-backed `/results/<uuid>` route is on the roadmap.

---

## Roadmap (priority order)

1. Hindi language toggle (`lib/i18n.ts` + prompt language flag)
2. Save & share `/r/<uuid>` permalink with Upstash 30-day TTL
3. PDF export of matched schemes (`@react-pdf/renderer`)
4. WhatsApp share button (`wa.me` deep link with top 3 schemes)
5. Voice input via Whisper
6. Per-scheme deep-dive pages with FAQ + filled-form samples
7. State-wise SEO landing pages (`/in/maharashtra`, etc.)
8. Eligibility verification follow-up chat
9. Telegram / WhatsApp bot frontend

---

## License

MIT. Use freely.

---

## A note on accuracy

Scheme eligibility, benefits, deadlines, and application steps change. The LLM is good at surfacing candidates but not authoritative. **Always verify on the official Government of India / state portal before applying.** When in doubt, the nearest Common Service Centre (CSC), panchayat office, or municipal ward office can help.
