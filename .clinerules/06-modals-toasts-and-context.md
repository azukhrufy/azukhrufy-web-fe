# Modals, Toasts & UX Patterns

## Modals
Reusable modal shell: `CustomModal` (plus `CustomModalContainer`) in
`src/components/CustomModal.js`. Do not re-implement Chakra `Modal` for shared flows.

### Modal component props convention
`<domain>/modals/*Modal.js` components follow a consistent prop contract:
- `openState` — boolean, controls open/close.
- `onClose` — callback to close.
- `mutate` — the SWR `mutate` fn to refresh the list after create/update/delete.
- `currentData` / `data` — optional existing record when editing.

Example:
```jsx
<CreateUpdateCompaniesModal
  openState={handleUpdateCompany.isOpen}
  onClose={handleUpdateCompany.onClose}
  mutate={mutateCompanies}
  currentData={selectedData}
/>
```

### Handlers
Open/close the page-level modal from the parent using `useDisclosure()`:
```js
const handleUpdateCompany = useDisclosure();
// onOpen(), onClose(), handleUpdateCompany.isOpen
```
Inside the modal, wrap `onClose` to also `reset()` the form before closing.

## Toasts
- Use Chakra `useToast()` for all user feedback.
- Success: `status: "success"`, `duration: 3000`, `isClosable: true`.
- Error: `status: "error"`, `description: error?.message || "An error occurred"`,
  `duration: 5000`.
- Default toast position is `top-right` (set globally in `_app.js`).

## Async actions
Wrap service calls in try/catch inside `onSubmit`/handlers; mutate/refresh data on success
and always toast the outcome.

## Contexts & hooks
- Auth: `useAuth()` → `{ user, loading, login, logout }`.
- Timezone/date formatting: `useDateTimeHelper()` (from `useDateTimeHelper` hook) →
  `dateTimeHelper.client.formatDate(...)`. Must be used inside `TimezoneProvider`.
- Custom shared hooks live in `src/hooks/`.
