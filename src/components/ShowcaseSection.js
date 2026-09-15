import { Box, Button, Container, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import ProjectBrowserGrid from "@/components/ProjectBrowserCard";

/**
 * The showcase data that drives the section.
 * Each entry has a title, a short description, the tech stack used to build
 * it, and a relative public image path under /images/showcase/.
 *
 * @type {Array<{ title: React.ReactNode, description: string, stack: string[], image: string, url?: string }>}
 */
const showcase = [
  {
    title: <>My <span style={{ color: "#805AD5" }}>Experience</span></>,
    description:
      "An all-in-one HR application with upskilling features. It also includes performance management, attendance management, and payroll management.",
    stack: ["Next.js", "Chakra UI", "SWR"],
    image: "/images/showcase/myexperience.png",
    url: "https://myexperience.id",
  },
  {
    title: <>Sarekat <span style={{ color: "#805AD5" }}>Ticketing</span></>,
    description:
      "A landing page and event management platform for Sarekat Berkah Bersama. It supports creating and managing active events, setting ticketing quotas, processing payments, and scanning tickets on the spot at the venue.",
    stack: ["Next.js", "Chakra UI", "SWR"],
    image: "/images/showcase/sarekat-networks.png",
    url: "https://sarekatnetworks.com",
  },
  {
    title: "Peoplyee",
    description:
      "A job portal dedicated to Indonesian and Japanese talent, listing openings across Indonesia and Japan. It includes user onboarding and full web translation support for English, Indonesian, and Japanese.",
    stack: ["Next.js", "SWR", "Ark UI"],
    image: "/images/showcase/peoplyee.png",
    url: "https://peoplyee.com",
  },
];

/**
 * ShowcaseSection - highlights selected products/projects as browser-style
 * mockup cards in a responsive grid, with a link to the full project list.
 * Rendered below the "About Me" section on the home page.
 *
 * @component
 */
export default function ShowcaseSection() {
  return (
    <Box py={{ base: 12, lg: 20 }}>
      <Container maxW="7xl">
        <Text textAlign="center" fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="bold" pb={{ base: 10, lg: 16 }}>
          Recent <span style={{ color: "#805AD5" }}>Projects</span>
        </Text>

        <ProjectBrowserGrid items={showcase} />

        <Box textAlign="center" pt={{ base: 10, lg: 14 }}>
          <Button as={NextLink} href="/projects" colorScheme="purple" variant="outline" px={8}>
            View All Showcase
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
