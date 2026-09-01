# OptionPulse

A predictive options-analytics MVP for retail traders. React + TypeScript on Supabase, with an
Alpha Vantage-backed options-chain service behind a staleness-aware cache.

Built and put in front of real users in 2025. **Paused** — the reasons are at the bottom, and they
are the interesting part.

## What is actually here

Sixteen routes: dashboard, options chain, watchlist, alerts, journal, education, stock detail,
community, challenges, achievements, tools, pricing, settings. Auth and the data layer work.

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

None of that is clever. It is the ordinary work of putting a paid, rate-limited, slow upstream behind
something a UI can call, which is most of what integration work actually is.

## How it was built, and what the commit log shows

`git log` is ~285 commits, the large majority authored by `gpt-engineer-app[bot]` — this was built by
directing an AI coding tool. That is how I work and I would rather state it than have it discovered:
I wrote the spec and the product decisions, the tool produced most of the diffs, and I reviewed and
redirected. The judgment on display here is the architecture and the decision to stop, not
hand-authorship.

## What is not here

Stated plainly, because the repo is small enough that you would find all of it anyway:

- **No tests. No CI.** Neither exists.
- **Nothing deployed.** No live URL. The Supabase project behind it is not running.
- **No migrations directory.** The schema was created through the Supabase UI, so it is not
  reproducible from this repo.
- **The "AI signal modeling" is thin.** There is an analytics and signal layer in the UI; it is not a
  trained model, and I would not describe it as one in an interview.
- **One provider, one function.** Alpha Vantage only, and the free tier is why the cache exists.

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
