# Forms & Validation

Forms use **react-hook-form** with **yup** schemas and the project's RHF wrapper
components.

## Validators — `src/validators/<domain>Validator.js`
- Build a yup schema object per use case and export a single default object.

Example (`userValidator.js`):
```js
const { object, string } = require("yup");

const login = object().shape({
  email: string().email().required("Email is required"),
  password: string().required("Password is required"),
});

const userValidator = { login };
export default userValidator;
```

## Form fields — `src/components/hook-form/`
Use the provided wrappers instead of raw Chakra inputs inside forms:
- `RHFFormProvider` — wraps `<FormProvider>` + `<form onSubmit>`.
- `RHFInput`, `RHFTextarea`, `RHFSelect`, `RHFNumberInput`.

They read/write to the form via `useFormContext` + `useController`; pass `name`, `label`,
and other Chakra-style props (e.g. `type="date"`).

`RHFFormProvider` usage:
```jsx
const methods = useForm({ defaultValues });
const { handleSubmit, reset, formState: { isSubmitting } } = methods;

<RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
  <RHFInput name="name" label="Company Name" />
  <Button type="submit" isLoading={isSubmitting} colorScheme="purple">Simpan</Button>
</RHFFormProvider>
```

## Rules
- Compose the whole form with `useForm` + `RHFFormProvider`; don't mix raw fields and RHF
  fields in the same form.
- Reset default values on open / when editing data changes:
  ```js
  useEffect(() => { reset(defaultValues); }, [defaultValues]);
  ```
- Use `isSubmitting` on the submit `Button` while awaiting the service call.
- Labels/buttons may be in Indonesian (existing UI uses e.g. "Simpan", "Batal") — follow the
  language already used in the surrounding UI.
