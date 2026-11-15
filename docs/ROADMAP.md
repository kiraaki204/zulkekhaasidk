# Zulfe Khaas — Implementation Roadmap

Master brief → ordered milestones. Each milestone is a feature branch off latest `dev`, verified (lint + build + manual checks), then PR → `dev`.

---

## Dependency graph (high level)

```
M1 Homepage foundation
 └─► M2 Product page + Shopping bag
      └─► M3 Content pages (About, Garden, Journal, Reviews, Contact)
           └─► M4 Checkout UI (guest, client-side)
                └─► M5 Backend foundation (Express + Prisma + PostgreSQL)
                     ├─► M6 Orders & cart API ↔ frontend integration
                     ├─► M7 Reviews API + moderation
                     ├─► M8 Admin dashboard (auth-protected)
                     ├─► M9 Payments (research → COD first, then JazzCash/Easypaisa/cards)
                     └─► M10 Security hardening, a11y, polish
                          └─► M11 Deployment prep → release PR dev → main
```

---

## M1 — Homepage foundation ✅
**Branch:** `feature/homepage-foundation` → PR → `dev`
**Delivers:** Visual identity, shared layout (nav/footer/bag), all homepage sections, routing shell, data models, design tokens.
**Status:** Implemented; merging to `dev`.

---

## M2 — Product page + Shopping bag (NEXT)
**Branch:** `feature/product-page-bag` (from `dev`)
**Depends on:** M1
**Delivers:**
- Full product page: gallery, PKR price, size, description, 3–4 benefits, `− 1 +` qty, Add to Bag, Buy Now, How to Use (3 steps), “Discover the 27 Herbs →”, “Read Customer Reviews →”
- Out-of-stock state (data-driven)
- Sticky mobile Add-to-Bag bar
- Bag drawer polish: accurate totals, qty controls, auto-open on add (already partially built)
- Live bag count (done) verified end-to-end
**Verify:** lint, build, desktop + mobile interaction checks.

---

## M3 — Content pages
**Branches:** split as needed (`feature/about-page`, `feature/botanical-garden`, `feature/journal`, `feature/reviews-page`, `feature/contact-page`) or one `feature/content-pages` if tightly coupled
**Depends on:** M1 (Garden/Journal benefit from herb data in M1)
**Delivers:**
- **About / Our Story:** first-person voice; Beginning, Philosophy, Formulation (confirmed boil-and-strain process), Promise, How We Make It; links to Garden
- **Botanical Garden:** interactive selection of all 27 herbs → profile panels (name, illustration mark, traditional uses, hair relationship, role in formula); provisional content swappable later
- **Botanical Journal:** editorial landing + entry pages with five sections; expandable search; provisional content structure
- **Reviews page:** filters (rating, with photo, most recent); placeholder → real data when backend exists; homepage section stays in sync
- **Contact & Support:** WhatsApp primary, email, form; four help categories with panels/modals
**Verify:** lint, build, route coverage, keyboard/a11y spot-check.

---

## M4 — Checkout UI + Thank-you card
**Branch:** `feature/checkout-thankyou`
**Depends on:** M2 (bag), M3 optional (policies copy)
**Delivers:**
- Guest single-page checkout: details, delivery address, contact, payment method radio (COD / card / JazzCash / Easypaisa — UI only until M9), order summary (subtotal, shipping placeholder, total)
- Client-side validation; shipping constants configurable
- Order success route + **unfolded thank-you card** animation/modal with brief message
- Handoff shape ready for backend order API (M6)
**Verify:** form validation, totals math, reduced-motion card fallback.

---

## M5 — Backend foundation
**Branch:** `feature/backend-foundation`
**Depends on:** none strictly; parallelizable after M1 — but ordered here so checkout can integrate
**Delivers:**
- Monorepo layout: `server/` (Express) alongside `client/` (Vite) — or `apps/*` if cleaner; keep Vite root working
- PostgreSQL + Prisma schema: Product, Order, OrderItem, Review, AdminUser, (later Payment)
- Env-driven config, health route, error middleware, request logging
- Seed script: product 150 ml / PKR price / stock
- CORS, helmet, rate-limit baseline
**Verify:** server boots, prisma migrate, seed, health 200; client still builds.

---

## M6 — Orders & cart API integration
**Branch:** `feature/orders-api`
**Depends on:** M4, M5
**Delivers:**
- POST /api/orders (guest): server-side re-validation of prices, stock, totals
- GET /api/orders/:id (status); confirmation email hook optional/stub
- Frontend checkout submits to API; success → thank-you card + order id
- Stock decrement transactionally
**Verify:** API tests (supertest or manual), invalid payload rejection, total mismatch rejection.

---

## M7 — Reviews API + moderation
**Branch:** `feature/reviews-api`
**Depends on:** M5; reviews UI from M3
**Delivers:**
- Public: list published reviews, submit (requires verified order id from M6)
- Admin: moderate (publish/hide), respond
- Photo upload (size/type limits, stored outside DB or bytea strategy decided here)
- Homepage + reviews page consume API
**Verify:** unauthenticated cannot publish; moderation flow works.

---

## M8 — Admin dashboard
**Branch:** `feature/admin-dashboard`
**Depends on:** M5–M7
**Delivers:**
- Secure login (bcrypt/argon2, httpOnly session or JWT with rotation)
- Orders view: customer info, items, payment + order status updates, **new-order indicator**
- Products CRUD: price, stock, copy, photos
- Reviews moderation + replies
- Basic analytics: order counts, revenue summaries
- Route guard on `/admin`; server-side authorization on every mutation
**Verify:** auth negative tests, protected routes, status transitions.

---

## M9 — Payments
**Branch:** `feature/payments`
**Depends on:** M6, M8 (order status)
**Process:**
1. Research PK providers (JazzCash, Easypaisa, bank cards via suitable aggregator — e.g. local gateways; document merchant requirements)
2. Decide integration path with user only if business choice (provider fees, account ownership) is required
3. Implement COD first (full flow), then host-to-host or hosted-page gateway for digital methods
4. Server-side verification only; never store raw card data
**Verify:** webhook/signature tests in sandbox if available; COD path e2e.

---

## M10 — Security, a11y, polish
**Branch:** `feature/hardening` (may split)
**Depends on:** M6–M9
**Delivers:**
- Security pass: auth sessions, rate limits, input validation, error leakage, HTTPS headers, secrets audit
- Accessibility pass: focus traps in modals/drawer, contrast, labels, reduced motion
- Performance: image sizes, code-split routes, loading states
- Page transitions / branded loader from brief §19
**Verify:** lint, build, axe/manual a11y, dependency audit.

---

## M11 — Deployment & release
**Branch:** `feature/deploy` then release PR `dev` → `main`
**Depends on:** all above
**Delivers:**
- Cloudflare (or equivalent) frontend deploy; backend host + managed Postgres
- Env production checklist, DB backups, monitoring basics
- Final QA checklist vs brief; version tag on `main`
**Verify:** production smoke test, rollback plan noted.

---

## Out of scope until approved
- **“A Little About Your Arrival”** unboxing editorial (brief §20) — ask before adding.

## Working agreements (unchanged)
- Feature branches from latest `dev`; PR → `dev`; no direct commits to `main`
- No force-push / discard of uncommitted work
- Each milestone: lint + build green before merge
- Placeholders are never “done” — tracked as remaining milestones above
