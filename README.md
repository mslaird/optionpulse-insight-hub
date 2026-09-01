# OptionPulse

A predictive options-analytics prototype for retail traders. React + TypeScript on Supabase, with an
Alpha Vantage-backed options-chain service behind a staleness-aware cache.

Built and put in front of real users in 2025. **Paused** — the reasons are at the bottom, and they
are the interesting part.

## What is actually here

`src/App.tsx` registers sixteen routes, but that count flatters it: one is a 404 catch-all and two
are redirects, so **thirteen are real screens** — dashboard, options chain, watchlist, alerts,
journal, education, stock detail, community, challenges, achievements, tools, pricing, settings.
They render. What is behind them is mostly fixtures, and auth is not real; both are detailed below.

The piece worth opening is the one edge function,
[`supabase/functions/option-chain/index.ts`](supabase/functions/option-chain/index.ts). Options
chains are large and Alpha Vantage's free tier is tightly rate-limited, so fetching per page view
was never going to work. It does three things instead:

- **Caches by ticker with a staleness check.** `getLastUpdated()` and `shouldUpdate()` decide whether
  to hit the upstream at all, so repeat views are served from Postgres rather than from the vendor.
- **Runs from an external scheduler.** Supabase's free tier has no cron, so refresh is driven from
  outside on a fixed interval. The code says so:
  `// With external scheduler, we can be more conservative`.
- **Enforces a ticker allowlist** — `['AAPL', 'SPY', 'QQQ']` — because an open symbol parameter on a
  rate-limited vendor key is a way to get that key throttled by the first person who finds the
  endpoint.

None of that is clever. It is the ordinary work of putting a paid, rate-limited, slow upstream
behind something a product can read, which is most of what integration work actually is. Note the
shape: the app never invokes the function. An external cron calls it, it writes `option_chains`,
and the client reads that table. That is the right split for a scheduled refresh, and it means the
function is not on the request path at all.

## How it was built, and what the commit log shows

`git log` is ~285 commits, the large majority authored by `gpt-engineer-app[bot]` — this was built by
directing an AI coding tool. That is how I work and I would rather state it than have it discovered:
I wrote the spec and the product decisions, the tool produced most of the diffs, and I reviewed and
redirected. The judgment on display here is the architecture and the decision to stop, not
hand-authorship.

## What is not here

Stated plainly, because the repo is small enough that you would find all of it anyway:

- **No tests. No CI.** Neither exists, and `npm run build` is bare `vite build`, which strips types
  without checking them. Both tsconfigs disable `strict`, `noImplicitAny` and `strictNullChecks`,
  so "React + TypeScript" here means TypeScript with its guarantees turned off and nothing
  verifying it. The bot commits from 2025-04-17 show four separate type errors being patched one at
  a time rather than the setting being turned back on.
- **Nothing running today.** No live URL. The Supabase project behind it is switched off. It was
  up in 2025, which is when people saw it.
- **No migrations directory.** The schema was created through the Supabase UI, so it is not
  reproducible from this repo.
- **The "AI alerts" are mock data.** `AIAlertsContext` loads `mockAIAlerts` and `mockLeapsAlerts`
  from a 335-line static file. There is no model, no inference, and no LLM call anywhere in this
  repository. The alerts UI, the filters and the ITM-probability slider are all real and all
  operating on fixtures. Describing that as an AI signal layer is an overstatement; my
  resume and site said it and have been corrected.
- **Auth is mock, and not only in development.** `src/utils/auth.ts` is a Zustand store with three
  hardcoded users. `App.tsx:32-35` calls `autoLoginAsTier('Free')` in an unguarded `useEffect`, so
  it ran in production too — I described it as a dev backdoor, and the code has no dev guard.
  Supabase Auth was never wired up, and because tier gating reads this store, the paywall is
  bypassable from the console.
- **One provider, one function.** Alpha Vantage only, and the free tier is why the cache exists.
- **The app fabricates option prices for six of the nine tickers it offers, silently.** This is the
  defect I would lead with, not the licensing story below. `StockSelector.tsx` offers AAPL, MSFT,
  GOOGL, AMZN, TSLA, META, NVDA, SPY and QQQ. The edge function only ever populates three — AAPL,
  SPY and QQQ. For the other six the `.single()` query throws, `useOptionsData` catches it, and
  returns `createMockOptionsData()`, which hands back strikes of 175 and 180 with a fixed price, IV
  and Greeks. So selecting **NVDA** renders Apple's strikes labelled NVDA. Nothing in the UI says
  so; the only trace is a `console.warn`. For a securities product that is not a rough edge, it is
  the disqualifying bug, and I would rather name it than have it found.
- **One hook touches the database; the rest of the app reads fixtures.** `useOptionsData` reads the
  `option_chains` table the edge function fills. There is a second, `useUserAlerts`, which queries
  `alerts` and is **dead code** — nothing in the repo imports it. Meanwhile **24 modules** import
  from `src/data/`. I previously wrote eleven here; I counted wrong, and the true number is worse
  for me, so it is the one that belongs in a section about what this repo is not.

## Why it is paused

Two walls, and neither was a build problem.

**Data cost.** Real options analytics needs a real market-data feed. The free tier that made the
prototype possible is also what made it a prototype — the cache and the three-ticker allowlist are
both workarounds for a licence I had not bought. Doing it properly meant paying for data before
knowing whether anyone would pay me.

**Regulation.** Publishing predictive signals about securities to retail traders is not a neutral
act. I was not prepared to underwrite that exposure, and building the compliance posture to do it
properly was a larger project than the product.

So I stopped, after it worked and after early users had seen it. Choosing not to continue a thing you
have already built is harder than shipping it, and it is the decision here I would defend.

---

*Built by [Mark Laird](https://markslaird.com) · [LinkedIn](https://www.linkedin.com/in/markslaird/)*
