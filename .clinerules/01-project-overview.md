# Project Overview

## What this is
`azukhrufy-web-fe` is the personal portfolio + admin CMS frontend for Ananda Zukhruf
("Azukhrufy"). It has both a public-facing portfolio (home, Ask AI, contact) and an
authenticated admin area (`/app`) for managing content such as Work Companies.

## Tech stack (do not add unlisted frameworks)
- **Next.js 14.2** using the **Pages Router** (`src/pages`) — NOT the App Router.
- **React 18**.
- **Chakra UI** (`@chakra-ui/react@^2`) as the primary component library.
- **Tailwind CSS 4** (via `@tailwindcss/postcss`) + **SCSS** (`src/styles/main.scss`).
- **react-hook-form** + **yup** for forms and validation.
- **SWR** for server-state / data fetching.
- **Axios** for HTTP (single instance in `src/lib/axios.js`).
- **framer-motion** & **gsap** for animation.
- **luxon** for dates/times (TimezoneContext).
- **react-icons** for icons.

## JS not TS
This codebase is **plain JavaScript** (`.js`) with JSDoc type annotations. Do not introduce
TypeScript, `.tsx`, or `next-env.d.ts` without explicit user approval.

## Package manager
**yarn** (`yarn.lock` present). Prefer `yarn add` over `npm install`.

## Path alias
`@/*` maps to `./src/*` (see `jsconfig.json`). Use `@/` for all src imports.
