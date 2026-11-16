# Payments research & plan (M9)

Status: **COD live · digital gateways pending merchant onboarding**

## What ships now

- **Cash on Delivery (COD)** — full lifecycle:
  - Checkout places order with `paymentStatus: COD_PENDING`
  - Admin marks `PAID` when cash is collected (orders tab → payment status select)
  - Order status flow: `PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED` (or `CANCELLED`)
- **Digital methods (Card / JazzCash / Easypaisa)** — UI shows “Coming soon”, server rejects with `409` until `PAYMENTS_ONLINE_ENABLED=true`
- Public `GET /api/payments/config` tells the client which methods are live

## Provider research (Nov 2026)

| Route | Pros | Cons | Typical MDR |
| --- | --- | --- | --- |
| **JazzCash direct** | Published rates, no setup/annual fee, sandbox, wallet + cards | Separate app/integration from Easypaisa | ~2% incl. tax (wallet & cards) |
| **Easypaisa direct** | Lower wallet rate (1% MA), daily/instant settlement | Separate onboarding; OTC settles T+7 | 1% mobile account, 2% OTC |
| **Aggregator** (e.g. PayFast, Safepay) | One integration for cards + wallets | Setup fees possible, higher blended rate | ~2–2.9% |

**Common requirements (all routes):** NTN (or sole-proprietor docs), business bank account, CNIC, live site with Refund Policy + Terms + Privacy + Contact + HTTPS.

**Server-side rules (non-negotiable):**
1. Confirm payment only from signed webhook/IPN — never from browser redirect alone
2. Store payment states: `PENDING / PAID / FAILED / REFUNDED / COD_PENDING`
3. Never store raw card data
4. Reconcile settlements daily after go-live

## Decision needed before coding digital checkout

1. **Which route?** Direct JazzCash, direct Easypaisa, both, or an aggregator (cards-only vs multi-method)
2. **Who owns the merchant account?** (business entity / NTN holder)
3. **Hosted redirect vs direct API** — hosted is simpler and keeps PAN off our servers (recommended)

Once credentials (Merchant ID / Store ID + hash key) exist and a sandbox is available:

1. Add `Payment` table or use order `paymentStatus` + `gatewayRef`
2. Implement create-payment → redirect URL + webhook verifier per provider
3. Flip `PAYMENTS_ONLINE_ENABLED=true`
4. Enable methods in `GET /api/payments/config`

## Config

| Env | Default | Meaning |
| --- | --- | --- |
| `PAYMENTS_ONLINE_ENABLED` | `false` | Accept CARD/JAZZCASH/EASYPAISA when `true` |
| `SHIPPING_FLAT_RATE_PKR` | `250` | Flat shipping |
| `SHIPPING_FREE_OVER_PKR` | `5000` | Free shipping threshold |
