# Launch Log

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
