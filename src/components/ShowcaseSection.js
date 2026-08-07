import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import TextWithSoftBreaks from "@/components/TextWithSoftBreaks";

/**
 * The showcase data that drives the section.
 * Each entry has a title, a multi-line description (second paragraph lists the
 * tech stack), and a relative public image path under /images/showcase/.
 *
 * @type {Array<{ title: string, description: string, image: string }>}
 */
const showcase = [
  {
    title: <>My <span style={{ color: "#805AD5" }}>Experience</span></>,
    description: [
      "An all-in-one HR application with upskilling features. It also includes performance management, attendance management, and payroll management.",
      "Built with Next.js, SWR, and Chakra UI.",
    ].join("\n"),
    image: "/images/showcase/myexperience.png",
    url: "https://myexperience.id",
  },
  {
    title: <>Sarekat <span style={{ color: "#805AD5" }}>Ticketing</span></>,
    description: [
      "A landing page and event management platform for Sarekat Berkah Bersama. It supports creating and managing active events, setting ticketing quotas, processing payments, and scanning tickets on the spot at the venue.",
      "Built with Next.js, SWR, and Chakra UI.",
    ].join("\n"),
    image: "/images/showcase/sarekat-networks.png",
    url: "https://sarekatnetworks.com",
  },
  {
    title: "Peoplyee",
    description: [
      "A job portal dedicated to Indonesian and Japanese talent, listing openings across Indonesia and Japan. It includes user onboarding and full web translation support for English, Indonesian, and Japanese.",
      "Built with Next.js, SWR, and Ark UI.",
    ].join("\n"),
    image: "/images/showcase/peoplyee.png",
    url: "https://peoplyee.com",
  },
];

/**
 * ShowcaseSection - highlights three selected products/projects in an
 * alternating text/image layout. Rendered below the "Recent Work Companies"
 * section on the home page.
 *
 * @component
 * @returns {JSX.Element} The showcase section with three items:
 * - Item 1: text on the left, image on the right
 * - Item 2: image on the left, text on the right
 * - Item 3: same layout as item 1
 *
 * On small screens each item stacks vertically with the text always appearing
 * above the image; on large screens the columns sit side-by-side and alternate.
 */
export default function ShowcaseSection() {
  return (
    <Box py={10}>
      <Container maxW="7xl">
        <Text textAlign="center" fontSize="5xl" fontWeight="bold" pb={10}>
          Recent <span style={{ color: "#805AD5" }}>Projects</span>
        </Text>
        {showcase.map((item, index) => {
          const flip = index % 2 !== 0; // reverse columns for even items
          return (
            <Flex
              key={item.title}
              flexDirection={{ base: "column", lg: "row" }}
              gap="50px"
              alignItems="center"
              pb="150px"
            >
              <Flex
                flex={1}
                flexDirection="column"
                gap={4}
                order={{ base: 1, lg: flip ? 2 : 1 }}
              >
                <Heading
                  as="h3"
                  size="xl"
                  color="gray.600"
                  textAlign={!flip ? "right" : undefined}
                >
                  {item.title}
                </Heading>
                <TextWithSoftBreaks
                  color="gray.600"
                  textAlign={!flip ? "right" : undefined}
                >
                  {item.description}
                </TextWithSoftBreaks>
                {item.url && (
                  <Flex w="100%" justifyContent="center">
                    <Button
                      width="fit-content"
                      rounded="none"
                      variant="outline"
                      colorScheme="black"
                      px={6}
                      mt={4}
                    >
                      Visit Website
                    </Button>
                  </Flex>
                )}
              </Flex>
              <Flex
                flex={1}
                order={{ base: 2, lg: flip ? 1 : 2 }}
                justifyContent="center"
              >
                <Box rounded="xl" overflow="hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width="100%"
                    maxW={{ base: "100%", md: "600px", lg: "520px" }}
                    maxH="420px"
                    objectFit="contain"
                    mx="auto"
                  />
                </Box>
              </Flex>
            </Flex>
          );
        })}
      </Container>
    </Box>
  );
}
