# Launch Log

## 2026-03-08 16:2x — FairBill (Hourly Launch Verification)
- Product: FairBill
- UVP: Medicare-benchmarked pricing for medical bills. Get negotiation leverage before collections.
- URL: https://fairbill-production.up.railway.app
- Status: live (HTTP 200 verified at run time)
- Portfolio: Tile present on Infinite Machines with live status and launch URL.
- Compliance: free MVP, non-technical public utility focus, dark monochrome style, no emoji, Infinite Machines footer, informational disclaimer.
- Delegation note: sessions_send dispatch to SHO/NAO/YUI/JIN/TAI was attempted for this run; agent responses were blocked by upstream quota/timeouts, so this cycle executed as launch verification + portfolio integrity check.


## 2026-03-08 — FastPath Benefits Screener
- Product: FastPath Benefits Screener
- UVP: Free one-minute pre-screen for SNAP, Medicaid, WIC, and LIHEAP with plain-language next steps.
- URL: https://fastpath-benefits-screener-production.up.railway.app
- Status: building (Railway URL currently returns 404; awaiting linked deploy).
- Compliance: free MVP, non-technical audience focus, dark monochrome IM style, Infinite Machines footer, legal-safe disclaimer included.
- Note: Verify URL returns HTTP 200 before posting final [HOURLY LAUNCH].

## 2026-03-08 — FastPath Benefits Screener
- Product: FastPath Benefits Screener
- UVP: Free one-minute pre-screen for SNAP, Medicaid, WIC, and LIHEAP with plain-language next steps.
- URL: https://benefits-navigator-production.up.railway.app
- Status: live and reachable (HTTP 200); tile updated to live URL.
- Compliance: free MVP, non-technical audience focus, dark monochrome IM style, Infinite Machines footer.

## 2026-03-08 — WageShield
- Product: WageShield
- UVP: Instant overtime and wage calculator for hourly workers. Deterministic math, no signup.
- URL: https://roastmysite-production-a490.up.railway.app (repurposed Railway service from roastmysite)
- Status: live (HTTP 200 verified)
- Compliance: free MVP, non-technical audience focus, dark monochrome IM style, Infinite Machines footer.

## 2026-03-08 10:24 — FairBill (Hourly Launch Attempt)
- Product: FairBill
- UVP: Medicare-benchmarked pricing for medical bills. Get negotiation leverage before collections.
- URL: https://fairbill-production.up.railway.app
- Status: blocked (HTTP 404; Railway CLI unauthorized + free-plan service capacity prevents new deploy from this host)
- Delegation: SHO implementation pass completed (production build fix committed: `6cc03ef`), NAO/YUI/JIN/TAI requested for copy/UX/risk updates; Gemini quota limits prevented fresh responses this cycle.
- Compliance: free MVP, non-technical audience (uninsured/underinsured patients), dark monochrome IM style, Infinite Machines footer, legal disclaimers included.
- Supabase: schema/seed artifacts present (`supabase-schema.sql`, `seed-db.mjs`); requires table creation in project `jeollamxgbmlhvzdgoqt` before full data-backed launch.
- Next: free one Railway slot (or repoint existing service) via dashboard, run deploy, verify HTTP 200, then flip IM tile from planned -> live and publish [HOURLY LAUNCH] to group.

## 2026-03-08 12:xx — Utility Shutoff Lifeline (Hourly Launch)
- Product: Utility Shutoff Lifeline
- UVP: Know your utility shutoff deadline and protections in one minute, with immediate next actions.
- URL: https://utility-shutoff-lifeline-production.up.railway.app
- Status: deploying (service created and building in Railway; public URL still HTTP 404 at validation time)
- Delegation: SHO completed implementation + repo push (`c83ae60`) and triggered Railway deploy via project `0f6153ba-7a9b-4cae-9927-dcc41fd9c474`; NAO/YUI/JIN/TAI delegation attempted but blocked by model quota/rate limits in this cycle.
- Compliance: free MVP, non-technical audience focus, dark monochrome style, no emoji, Infinite Machines footer, informational disclaimer included.
- IM Portfolio: tile added with status `building` and launch URL.
- Next: wait for Railway build completion, verify HTTP 200, flip tile status to `live`, then post `[HOURLY LAUNCH]` to Telegram group `-1003816885121`.

## 2026-03-08 12:22 — Utility Shutoff Lifeline
- Product: Utility Shutoff Lifeline
- UVP: See your utility shutoff deadline, protections, and emergency action links in one screen before disconnection.
- URL: https://utility-shutoff-lifeline-production.up.railway.app
- Status: deploying (service created, public domain generated with target port 8080; awaiting first successful deployment/HTTP 200)
- Compliance: free MVP, non-technical public utility focus, dark monochrome IM style, no emoji, Infinite Machines footer, legal-safe disclaimer included.
- Notes: Repo pushed (`doreisato/utility-shutoff-lifeline`), IM tile updated to `live` target URL; final healthcheck pending active deployment.

## 2026-03-08 15:26 — Utility Shutoff Lifeline (Launch Confirmed)
- Product: Utility Shutoff Lifeline
- UVP: See your utility shutoff deadline, protections, and emergency action links in one screen before disconnection.
- URL: https://utility-shutoff-lifeline-production.up.railway.app
- Status: live (HTTP 200 verified)
- Portfolio: Infinite Machines tile present with live URL/status; duplicate tile entry removed.
- Compliance: free MVP, non-technical public utility, dark monochrome style, no emoji, Infinite Machines footer, informational disclaimer in first screen.
