# Folder Structure & Conventions

Follow this structure exactly. Do not invent new top-level folders unless necessary.

```
src/
├── components/        # Shared, reusable presentational components (CustomModal, RHF*, etc.)
│   └── hook-form/     # RHF FormProvider + field wrappers (RHFInput, RHFSelect, ...)
├── const/             # Pure constants: PATHS (path.js), ProjectList, etc.
├── contexts/          # React Context providers (AuthContext, TimezoneContext)
├── guards/            # Route guards (AuthGuards)
├── hooks/             # Custom React hooks (useDateTimeHelper, useAfterSubmitAuth)
├── layouts/           # Page layout wrappers (HomeLayouts, DashboardLayout/)
├── lib/               # Library wiring (axios instance in lib/axios.js)
├── pages/             # Next.js Pages Router routes + API routes (pages/api)
├── sections/          # Feature-scoped UI grouped by feature/domain (e.g. companies/modals)
├── services/          # API service layer; each has a _factory.js
├── styles/            # globals.css, main.scss, css modules
├── swrs/              # SWR hooks; each has a _factory.js
├── utils/             # Pure helper functions (dateTimeHelper, numberHelper)
└── validators/        # yup schemas (userValidator, ...)
```

## Feature grouping for UI
Feature-specific UI goes under `src/sections/<feature>/`. Nested subfolders define
sub-components (e.g. `sections/companies/modals/CreateUpdateCompaniesModal.js`).

## Naming
- React components & files: **PascalCase** (`CustomModal.js`, `CreateUpdateCompaniesModal.js`).
- Non-component modules (services, hooks, utils): **camelCase** (`companiesService.js`).
- Service instance objects: `<domain>Service` → `companiesService`, `authService`.
- SWR hooks: `use<Domain>` / `useGet<Domain>`. Page components: `<Name>Page`.

## Page layout pattern
Pages needing a layout/guard use the static `getLayout` pattern instead of nesting layout
inside the page:

```js
Page.getLayout = function getLayout(page) {
  return (
    <AuthGuards>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuards>
  );
};

export default function Page() { ... }
```
