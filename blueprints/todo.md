# Todo — Companies: Sinkronisasi Model Backend + Validasi Yup

## 1. Ringkasan

Ada 3 pekerjaan pada fitur **Companies** (halaman admin `/app/companies`):

1. Menyesuaikan susunan field/value pada modal create/update agar sama dengan model backend.
2. Membuat validator Yup untuk create & update Companies (sekaligus error handling).
3. Memasang validator tersebut ke dalam form di modal create/update.

Tujuan akhir: field form hanya berisi field yang dikenali backend, dan setiap input
punya validasi + pesan error yang jelas sebelum dikirim ke API.

---

## 2. Spesifikasi

### 2.1 Model Backend (source of truth)

```js
const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
})
```

| Field         | Tipe   | Wajib | Catatan                              |
| ------------- | ------ | ----- | ------------------------------------ |
| `name`        | String | Ya    | `unique`, `trim`                     |
| `role`        | String | Tidak | `trim`                               |
| `description` | String | Tidak | `trim`                               |
| `startDate`   | Date   | Tidak | —                                    |
| `endDate`     | Date   | Tidak | Kosong = masih berjalan ("Sekarang") |

### 2.2 File yang Disentuh

| No | File                                                         | Aksi                                            |
| -- | ------------------------------------------------------------ | ----------------------------------------------- |
| 1  | `src/sections/companies/modals/CreateUpdateCompaniesModal.js` | Sesuaikan field form + pasang resolver validasi |
| 2  | `src/validators/companiesValidators.js` **(baru)**            | Buat schema Yup create/update                   |

Catatan: di todo lama tertulis `CreateCompaniesModal.js`. Nama file yang benar di repo
adalah `CreateUpdateCompaniesModal.js` (dipakai untuk create **dan** update dari
`src/pages/app/companies/index.js`).

### 2.3 Dependency

Sudah tersedia di `package.json`, tidak perlu install baru:

- `yup` `^1.4.0`
- `@hookform/resolvers` `^3.9.0` → `import { yupResolver } from "@hookform/resolvers/yup"`

### 2.4 Aturan Validasi yang Diharapkan

- `name`: wajib (required), string, otomatis di-`trim`.
- `role`: opsional, string.
- `description`: opsional, string.
- `startDate`: opsional, harus tanggal valid.
- `endDate`: opsional, harus tanggal valid, dan **tidak boleh lebih awal dari `startDate`**.
- Pesan error ditulis singkat dalam Bahasa Inggris mengikuti gaya `userValidator.js`
  (mis. `"Company name is required"`), karena komponen RHF menampilkan pesan apa adanya.
- Cek `unique` pada `name` tidak bisa dilakukan di FE — serahkan ke backend, lalu
  tampilkan pesan error dari API lewat toast.

---

## 3. Langkah-langkah

### Langkah 1 — Samakan field/value modal dengan model backend

File: `src/sections/companies/modals/CreateUpdateCompaniesModal.js`

- [ ] Pastikan `defaultValues` hanya memuat: `name`, `role`, `description`,
      `startDate`, `endDate`.
- [ ] **Hapus `projects`** dari `defaultValues`, karena tidak ada di `companySchema`
      (konfirmasi dulu bila di backend ternyata disimpan lewat endpoint terpisah).
- [ ] Pastikan hanya 5 field yang dirender: `name` (input text), `role` (input text),
      `description` (textarea), `startDate` (`type="date"`), `endDate` (`type="date"`).
- [ ] Nilai kosong tetap di-`|| ""` agar input tidak `undefined` (menghindari warning
      controlled/uncontrolled pada React).
- [ ] Kirim payload apa adanya (`values`) ke
      `companiesService.createCompany(values)` / `updateCompany(currentData.id, values)`.

### Langkah 2 — Buat validator Yup

File baru: `src/validators/companiesValidators.js`

- [ ] Ikuti pola `src/validators/userValidator.js`: ambil modul lewat `require("yup")`,
      definisikan schema, lalu `export default` satu objek.
- [ ] Buat schema `createUpdateCompanies` (dipakai untuk create dan update sekaligus).

Contoh kerangka:

```js
const { object, string, date } = require("yup");

const createUpdateCompanies = object().shape({
  name: string().trim().required("Company name is required"),
  role: string().trim(),
  description: string().trim(),
  startDate: date()
    .typeError("Start date must be a valid date")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  endDate: date()
    .typeError("End date must be a valid date")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .test(
      "after-start-date",
      "End date cannot be earlier than start date",
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true;
        return new Date(value) >= new Date(startDate);
      },
    ),
});

const companiesValidators = {
  createUpdateCompanies,
};

export default companiesValidators;
```

Poin penting:

- [ ] `transform` dipakai supaya string kosong dari input `type="date"` menjadi `null`
      dan tidak gagal validasi saat field opsional dikosongkan.
- [ ] Test `endDate >= startDate` hanya berjalan bila keduanya terisi.

### Langkah 3 — Pasang validator ke form modal

File: `src/sections/companies/modals/CreateUpdateCompaniesModal.js`

- [ ] Tambah import:

```js
import { yupResolver } from "@hookform/resolvers/yup";
import companiesValidators from "@/validators/companiesValidators";
```

- [ ] Daftarkan resolver di `useForm`:

```js
const methods = useForm({
  defaultValues,
  resolver: yupResolver(companiesValidators.createUpdateCompanies),
});
```

- [ ] Pastikan `reset(defaultValues)` di `handleClose()` dan `useEffect` tetap ada,
      agar error lama ikut hilang saat modal dibuka/ditutup.
- [ ] Tidak perlu penanganan error manual: `RHFInput` / `RHFTextarea` sudah menampilkan
      `error.message` lewat `FormErrorMessage` + `isInvalid`.
- [ ] Beri `isRequired` pada field wajib agar label menampilkan tanda bintang.
- [ ] Error dari API tetap ditangani lewat `try/catch` + `useToast()` seperti sekarang.

### Langkah 4 — Verifikasi

- [ ] `yarn lint` — pastikan tidak ada error/warning baru.
- [ ] `yarn build` — pastikan kompilasi sukses.
- [ ] `yarn dev` (port `3008`), uji manual di `/app/companies`:
  - [ ] Submit form kosong → `name` wajib diisi, muncul pesan error.
  - [ ] Isi `endDate` lebih awal dari `startDate` → muncul pesan error.
  - [ ] Create company baru → sukses + list ter-refresh (`mutate()`).
  - [ ] Edit company → data lama terisi di form, simpan sukses.
  - [ ] Kosongkan `endDate` → tersimpan, list menampilkan "Sekarang".
- [ ] Hapus `console.log` / `console.error` debug yang ada di
      `CreateUpdateCompaniesModal.js` (aturan housekeeping repo).

---

## 4. Acceptance Criteria

1. Form modal hanya mengirim field yang ada di `companySchema`
   (`name`, `role`, `description`, `startDate`, `endDate`).
2. `src/validators/companiesValidators.js` ada dan mengekspor `createUpdateCompanies`
   sebagai bagian dari default export objek `companiesValidators`.
3. `CreateUpdateCompaniesModal.js` memakai
   `resolver: yupResolver(companiesValidators.createUpdateCompanies)`.
4. Pesan error validasi tampil di bawah field yang bermasalah.
5. Create & update tetap berhasil dan list ter-refresh setelah submit.
6. `yarn lint` dan `yarn build` lolos.

---

## 5. Hal yang Perlu Dikonfirmasi

- **Nama file validator**: todo memakai `companiesValidators.js`, sedangkan konvensi repo
  adalah `<domain>Validator.js` (camelCase, tunggal) seperti `userValidator.js`.
  Disarankan `companiesValidator.js`; pakai `companiesValidators.js` bila itu yang diminta.
- **Field `projects`**: sudah tidak ada di model backend. Konfirmasi apakah masih dipakai
  sebelum dihapus permanen.
- **Format tanggal di payload**: input `type="date"` menghasilkan string `"YYYY-MM-DD"`.
  Backend (Mongoose `Date`) umumnya meng-cast otomatis, tapi konfirmasi bila API
  mengharapkan ISO datetime.
- **`unique` pada `name`**: hanya bisa divalidasi backend; pastikan pesan error dari API
  cukup jelas untuk ditampilkan lewat toast.