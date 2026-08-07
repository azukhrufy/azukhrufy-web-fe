# Code Style & Standards

Odd-looking conventions below are intentional — match the existing code rather than
"fixing" it.

## Syntax & imports
- Single-quoted strings; **no semicolons** in files that use the default prettier config —
  but note `next/font`, Chakra, and some existing files vary. Follow the surrounding file.
- Import order convention seen in the codebase (not enforced by lint): `@/*` project
  imports first (components, then context/guards/hooks/layouts/sections/swrs), then
  external packages (Chakra, next/*, react, react-icons, framer-motion).
- Use `@/` alias for internal imports; relative paths only for same-folder traversal
  (e.g. `./_factory`).

## Components
- **Function components only** — no class components.
- All reusable components and hooks include a **JSDoc comment** documenting props and
  returning `JSX.Element`.
- Use Chakra components (`Box`, `Flex`, `Grid`, `Text`, `Button`, `HStack`, ...) for
  layout and UI. Use `useColorModeValue` for theming where relevant.
- Style props use Chakra's shorthand (`gap`, `p`, `m`, `w`, `colorScheme`, `_hover`).
- Use optional chaining (`company?.name`) when accessing possibly-undefined data.

## State & logic
- Use React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`).
- Chakra's `useDisclosure()` (`{ isOpen, onOpen, onClose }`) for modals/drawers — do not
  hand-roll boolean state for open/close.

## Auth
- Tokens live in **localStorage** under keys: `accessToken`, `refreshToken`, `userId`.
- Interceptors in `src/lib/axios.js` already attach `Authorization: Bearer <accessToken>`
  and auto-refresh on 401. Don't duplicate this logic in new code.
- Consume auth state via `useAuth()` from `@/contexts/AuthContext`.

## Routing/links
- Define/use routes through the `PATHS` constant in `src/const/path.js` — don't hardcode
  route strings in components.
- For client-side nav use `next/link` (`NextLink`) or `useRouter()`.

## Feedback & UX
- Use Chakra `useToast()` for user feedback (`status: "success" | "error" | "info"`).
- Wrap async submit/actions in try/catch and show toast on success and failure.
- Use `<Head>` from `next/head` to set per-page `<title>` and meta.

## Don'ts
- No `any`-style patterns that break lint.
- Avoid leaving stray `console.log` in commits (existing files have some; don't add more
  to newly written code).
