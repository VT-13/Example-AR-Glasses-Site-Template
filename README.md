# BLANK — Beyond the screen

An interactive launch website for **BLANK 1O**, a fictional premium AR eyewear product.

## Experience

- Scroll-driven product reveal and pointer-responsive product presentation.
- Coastal AR workspace with Create, Focus, and Explore modes.
- Live focus timer, digital-layer toggle, and expanded view.
- Interactive product details, responsive layouts, and reduced-motion support.
- Server-backed waitlist with email validation and duplicate protection.

## Stack

React 19, TypeScript, Vinext/Vite, Tailwind CSS, Radix UI, Lucide icons, Cloudflare Workers, Cloudflare D1, and Drizzle migrations.

## Local development

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by the development server.

## Preview with a working local waitlist

```sh
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_brown_tomas.sql
npm start
```

Apply the migration once per new local database. The built preview normally runs at http://127.0.0.1:8787.

## Deployment

The site needs a Cloudflare Workers-compatible runtime and a D1 database bound as `DB`. Apply the checked-in Drizzle migration before accepting waitlist submissions. The original Sites integration remains in the build configuration, but account-specific project identity is intentionally omitted from this repository.

GitHub hosts this source code. GitHub Pages alone cannot run the server-backed waitlist.

## Assets and data

Product and environment imagery is included in `public/` and was generated for this fictional concept. See `DESIGN-NOTES.md` for design and image-generation details. Local waitlist records, environment files, dependency directories, and generated build output are excluded.

No real eyewear specifications, launch date, or commercial availability are represented.
