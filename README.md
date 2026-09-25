# BLANK 1O — Interactive AR Product Experience

[View the live experience](https://blank-1o-vt13.netlify.app)

An interactive product-launch concept for a fictional premium augmented-reality eyewear brand. BLANK explores how motion, spatial interface design, and restrained visual storytelling can explain an unfamiliar product and guide visitors toward a waitlist signup.

## Experience

- Scroll-driven product reveal and pointer-responsive presentation.
- Simulated AR workspace with Create, Focus, and Explore modes.
- Working focus timer, digital-layer toggle, and expanded viewing mode.
- Interactive product hotspots, responsive layouts, keyboard controls, and reduced-motion support.
- Server-validated email signup with persistent storage and duplicate protection.

The AR interface is a browser-based simulation. This project does not include physical eyewear, optical tracking, or a shipping product.

## Technical approach

React 19 and TypeScript manage the interactive state. CSS, requestAnimationFrame, and IntersectionObserver coordinate motion. Tailwind CSS, Radix UI, and Lucide support styling and interface elements.

The Netlify deployment uses a Vite client build, a serverless signup function, and Netlify Blobs storage. The original Vinext/Cloudflare implementation is retained separately with a D1 database and Drizzle migration.

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev:netlify
```

This starts the visual experience. To exercise the Netlify signup function locally, use `npx netlify-cli dev` after linking a Netlify project. A standalone Vite server does not provide the signup API.

## Build and deploy to Netlify

```sh
npm run build:netlify
npx netlify-cli login
npx netlify-cli deploy --prod --dir dist-netlify --functions netlify/functions --no-build
```

`netlify.toml` defines the publish directory, build command, and API routing. Netlify provisions access to the site's Blobs store for deployed functions. Emails are stored server-side; there is no public endpoint for reading signups. Automated email delivery, administrative tools, and advanced abuse prevention are outside the current scope.

## Original Cloudflare preview

```sh
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_brown_tomas.sql
npm start
```

Apply the migration once per new local database. This path uses the original Cloudflare runtime and is independent of the Netlify build.

## Project context and assets

This is an AI-assisted design and development project. Product and environment imagery was AI-generated for the concept; design notes are in [DESIGN-NOTES.md](DESIGN-NOTES.md). The repository documents implemented behavior without claiming measured conversion improvements or real hardware capabilities.

BLANK is fictional. No commercial availability, technical eyewear specifications, or launch date is represented. Submitted emails are saved for this concept's waitlist demonstration; the application does not send marketing emails.
