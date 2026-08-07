# Data Fetching: Services + SWR

All backend communication goes through two paired layers: **services** (network) and
**swrs** (SWR hooks). Follow these patterns for any new resource.

## 1) Service layer — `src/services/<domain>Service.js`
- Import helpers from the local factory via `require("./_factory")`:
  `serviceGet`, `servicePost`, `servicePatch`, `serviceDelete`.
- Define each endpoint as an arrow function returning the appropriate helper.
- Export a single default object of the shape `<domain>Service = { method, ... }`.

Example (`authService.js`):
```js
const { servicePost } = require("./_factory");

const authService = {
  loginWithPassword: (email, password) =>
    servicePost(`/v1/auth/login`, { email, password }),
  logout: () => servicePost(`/v1/auth/logout`),
  getNewToken: () => servicePost(`/v1/auth/refresh-token`),
};

export default authService;
```

Note: existing calls pass a trailing `token` arg that the factory currently ignores —
keep signatures but don't rely on it.

## 2) Factory — `src/services/_factory.js`
Already provides `getEndpointUrl`, `serviceGet|Post|Patch|Delete`. Reuse it; don't create
a second axios layer.

## 3) SWR layer — `src/swrs/<domain>.js`
- Import `createSWRHook` from `./_factory` and the service object.
- Create named hook exports of the form `useGet<Domain>` / `use<Domain>`.

Example (`companies.js`):
```js
import companiesService from "@/services/companiesService";
import { createSWRHook } from "./_factory";

export const useGetCompanies = createSWRHook({
  key: "use-companies",
  fetcher: companiesService.getListCompanies,
});
```

The returned hook exposes `{ data, isLoading, isError, mutate }` and accepts a params
object that is passed to the fetcher.

## Using SWR in pages
```js
const { data, isLoading, mutate } = useGetCompanies({ order: "desc", orderBy: "startDate" });
```
Call the exposed `mutate()` after create/update/delete to refresh the list (see
`CreateUpdateCompaniesModal`).
