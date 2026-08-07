# Blueprint — Showcase Section (Home Page)

## Status
Draft — ready for implementation.

## Overview
Build a new **Showcase** section on the public portfolio home page that highlights three
selected products/projects in an alternating text/image layout. The section is rendered
immediately **below the existing "Recent Work Companies" section** (see
`src/pages/index.js`).

## Requirements

### Placement
- Rendered under the "Recent Work Companies" block (the `MovingLogos` section on
  `src/pages/index.js`).
- The whole section is wrapped in a Chakra `Container` with `maxW="7xl"` to match the
  surrounding home page sections.

### Layout & display
- The section displays **three items** (`showcase` array below).
- The layout alternates between two patterns:
  - **Item 1 (My Experience):** text on the **left**, image on the **right**.
  - **Item 2 (Sarekat Ticketing):** image on the **left**, text on the **right**.
  - **Item 3 (Peoplyee):** same layout as **Item 1** (text left, image right).
- Each item is split into two sides (text / image) laid out side-by-side with:
  - `gap = 10` between items (vertical space separating each showcase row).
  - `gap = 6` horizontally between the left and right content within an item.
  - `alignItems="center"` so the text and image are vertically centered within each item.
- **Typography:**
  - Title rendered with a heading 1 (`as="h1"` / `fontSize="5xl"`) style.
  - Description rendered with the `TextWithSoftBreaks` component
    (`src/components/TextWithSoftBreaks.js`) so multi-line descriptions preserve line
    breaks.
- **Images:** each item's image is displayed with Chakra UI's `<Image>` component
  (`import { Image } from "@chakra-ui/react"`), using `src={item.image}` and
  `alt={item.title}`.

## Data

A constant array named `showcase` is used to drive the section. Each entry has:
- `title` — display heading for the item.
- `description` — multi-line copy (second paragraph lists the tech stack).
- `image` — relative public assets path under `/images/showcase/`.

```js
const showcase = [
  {
    title: "My Experience",
    description: [
      "An all-in-one HR application with upskilling features. It also includes",
      "performance management, attendance management, and payroll management.",
      "",
      "Built with Next.js, SWR, and Chakra UI.",
    ].join("\n"),
    image: "/images/showcase/myexperience.png",
  },
  {
    title: "Sarekat Ticketing",
    description: [
      "A landing page and event management platform for Sarekat Berkah Bersama.",
      "It supports creating and managing active events, setting ticketing quotas,",
      "processing payments, and scanning tickets on the spot at the venue.",
      "",
      "Built with Next.js, SWR, and Chakra UI.",
    ].join("\n"),
    image: "/images/showcase/sarekat-networks.png",
  },
  {
    title: "Peoplyee",
    description: [
      "A job portal dedicated to Indonesian and Japanese talent, listing openings",
      "across Indonesia and Japan. It includes user onboarding and full web",
      "translation support for English, Indonesian, and Japanese.",
      "",
      "Built with Next.js, SWR, and Ark UI.",
    ].join("\n"),
    image: "/images/showcase/peoplyee.png",
  },
]
```

## Implementation reference (JSX sketch)

Component lives in `src/components/` (e.g. `ShowcaseSection.js`) and is imported into
`src/pages/index.js` below the "Recent Work Companies" block.

```jsx
import { Box, Container, Flex, Heading, Image } from "@chakra-ui/react"
import TextWithSoftBreaks from "@/components/TextWithSoftBreaks"

const showcase = [ /* array defined above */ ]

export default function ShowcaseSection() {
  return (
    <Box py={10}>
      <Container maxW="7xl">
        {showcase.map((item, index) => {
          const flip = index % 2 === 1 // reverse for even items
          return (
            <Flex
              key={item.title}
              flexDirection={{ base: "column", lg: "row" }}
              gap={10}
              alignItems="center"
              pb={10}
            >
              <Flex
                flex={1}
                flexDirection="column"
                gap={6}
                order={flip ? 2 : 1}
              >
                <Heading as="h1" size="xl">
                  {item.title}
                </Heading>
                <TextWithSoftBreaks color="gray.400">
                  {item.description}
                </TextWithSoftBreaks>
              </Flex>
              <Flex flex={1} order={flip ? 1 : 2} justifyContent="center">
                <Image src={item.image} alt={item.title} />
              </Flex>
            </Flex>
          )
        })}
      </Container>
    </Box>
  )
}
```

## Acceptance criteria
- [ ] Showcase section renders below "Recent Work Companies" on the home page.
- [ ] Exactly three items are displayed using the `showcase` data.
- [ ] Item 1 and Item 3 show text-left/image-right; Item 2 shows image-left/text-right.
- [ ] Section uses `Container maxW="7xl"`; each item uses `gap={10}`; left/right content
      uses `gap={6}` with `alignItems="center"`.
- [ ] Titles use a heading-1 style and descriptions render via `TextWithSoftBreaks`.
- [ ] Descriptions use the paraphrased, grammatically correct copy from the data section.
- [ ] Images resolve from the `/images/showcase/` public assets.
- [ ] Layout is responsive (stacks vertically on small screens, side-by-side on large).
