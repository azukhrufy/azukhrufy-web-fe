# Commands & Quality Checks

## Development
| Task | Command |
|------|---------|
| Dev server (runs on **port 3008**) | `yarn dev` |
| Build | `yarn build` |
| Start production server | `yarn start` |
| Lint | `yarn lint` |

## Before finishing work
1. **Lint** your changes: `yarn lint` (uses `next lint`, config in `.eslintrc.json`
   extending `standard`, `next/core-web-vitals`, and `prettier`).
2. **Build** to verify: `yarn build`.
3. Run the dev server if needed to sanity-check behavior on `http://localhost:3008`.

## Housekeeping
- Do not commit `.next/`, `node_modules/`, `.env*.local`, or other gitignored paths.
- Avoid leaving new `console.log`/`console.error` debug statements behind.
- No new frameworks/dependencies without being asked.
- Keep components, services, and hooks in the folders described in
  `02-architecture-and-structure.md`.
