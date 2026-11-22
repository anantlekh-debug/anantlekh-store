# ANANTLEKH

Digital bookstore project for ANANTLEKH.

## Current foundation

- Static storefront is served from `public/`.
- Cloudflare Worker API entry point is `src/index.js`.
- API routes are reserved under `/api/*`.
- D1 schema is in `schema.sql`.
- No payment credentials, customer data, or private PDF files belong in this repository.

## API

- `GET /api/health` — reports whether the D1 binding is present.
- `GET /api/products` — returns published catalogue records from D1.

The API intentionally reports that the database is not configured until a D1 database is created and bound. The public storefront continues to load without the database.

## Database setup (when ready)

1. Create a Cloudflare D1 database named `anantlekh-db`.
2. Add its database ID to the `DB` binding in `wrangler.jsonc`.
3. Apply `schema.sql` using Wrangler.
4. Add products through a protected admin workflow (not yet enabled).

## Security roadmap

- Keep book PDFs in a private R2 bucket, never in `public/`.
- Verify payment signatures server-side before marking an order paid.
- Issue short-lived, limited-use download tokens only for paid orders.
- Protect admin routes with authenticated access.
- Collect only customer details required to fulfil an order.

## Current limitations

Checkout, payment processing, customer accounts, admin panel, real reviews, and secure PDF delivery are not active yet. Do not accept payments until payment verification and fulfilment are implemented and tested.
