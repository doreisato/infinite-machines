# CHANGELOG — Infinite Machines Site

## 2026-03-08 08:38 — Loop #1

**Issue:** Project names/descriptions didn't match live deployments

**Changes:**
- Fixed "FastPath Benefits Screener" → "Benefits Navigator" to match actual site title
- Updated Benefits Navigator description to lead with "Find government benefits you qualify for"
- Updated WageShield description to lead with "Find out if your paycheck is missing money"

**Impact:** Eliminated confusion for first-time visitors seeing mismatched project names

**Commit:** 13c6d2f

## 2026-03-08 11:27 — Hourly Launch: FairBill

**Checks:**
- Verified FairBill Railway URL returns HTTP 200: `https://fairbill-production.up.railway.app`
- Portfolio tile already present and marked `live` with production URL in `app/page.tsx`

**Outcome:** Hourly winner is publicly reachable and represented in Infinite Machines project grid.

## 2026-03-08 15:26 — Hourly Launch: Utility Shutoff Lifeline (Live Finalization)

**Checks:**
- Verified Railway URL returns HTTP 200: `https://utility-shutoff-lifeline-production.up.railway.app`
- Removed duplicate Utility Shutoff Lifeline tile entry in `app/page.tsx` (resolved id collision + thread drift risk)
- Confirmed tile remains in project grid with `live` status and production URL

**Outcome:** Portfolio now shows a single canonical live tile for Utility Shutoff Lifeline.

## 2026-03-08 17:25 — Hourly Launch: Benefits Deadline Radar (Live Finalization)

**Checks:**
- Verified Railway URL returns HTTP 200: `https://benefits-deadline-radar-production.up.railway.app`
- Confirmed Infinite Machines tile is present with `live` status and correct production URL
- Updated launch log status from `deploying` to `live`

**Outcome:** Latest compliant hourly winner is live and correctly represented in portfolio.

## 2026-03-08 16:54 — Loop #2

**Issue:** Homepage project discovery was JS-dependent and hidden behind click-to-open tiles, so first-time visitors and non-JS fetch/readability clients saw little usable project detail.

**Changes:**
- Refactored `app/page.tsx` from client state modal flow to server-rendered project catalog cards
- Exposed project names, statuses, and descriptions directly in initial HTML
- Added direct per-project outbound links without modal interaction
- Updated footer link target to `https://infinitemachines.ai` per design system

**Validation:**
- Production fetch with cache-busting query now returns full project list + descriptions in readable content
- Build passed locally (`next build`) before push

**Impact:** First-time visitors can immediately scan all projects and click through in one step; crawl/readability visibility improved materially.

**Commit:** 1d0aff5

## 2026-03-08 18:27 — Hourly Launch: Calm Minute tile update

**Changes:**
- Replaced WageShield tile with Calm Minute in `app/page.tsx`
- Updated name, UVP, and kept Railway URL `https://roastmysite-production-a490.up.railway.app`
- Set status to `live` after HTTP 200 reachability check

**Outcome:** Portfolio now reflects a happiness-first product category (calm/daily delight) on the main project grid.

## 2026-03-08 20:20 CDT — Hourly launch: MicroAdventure Roulette
- Updated project tile: Calm Minute -> MicroAdventure Roulette
- UVP updated for happiness-first instant micro-adventures
- URL set to https://calm-minute-production.up.railway.app
- Status: live (URL reachable)
