import HomeLayout from "@/layouts/HomeLayouts";
import ProjectBrowserGrid from "@/components/ProjectBrowserCard";
import { ProjectList } from "@/const/Projects";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useMemo, useState } from "react";

ProjectsPage.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

const FILTERS = ["All", ...new Set(ProjectList.map((project) => project.type))];

/**
 * ProjectsPage - lists every project from const/Projects.js as browser-style
 * mockup cards, filterable by type. Linked from the homepage Showcase
 * section's "View All Showcase" button.
 */
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const productCount = useMemo(
    () => ProjectList.filter((project) => project.type === "Product").length,
    [],
  );

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? ProjectList
        : ProjectList.filter((project) => project.type === activeFilter),
    [activeFilter],
  );

  return (
    <>
      <Head>
        <title>Projects | Azukhrufy</title>
        <meta name="description" content="All projects by Ananda Zukhruf" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='white'/><path d='M0 0 H100 M0 0 V100' stroke='%23d3d3d3' stroke-dasharray='4,4' stroke-width='3' stroke-opacity='0.5'/></svg>")`,
        }}
        py={{ base: 12, lg: 16 }}
      >
        <Container maxW="7xl">
          <Flex direction="column" alignItems="center" textAlign="center" pb={{ base: 10, lg: 14 }} gap={3}>
            <Flex
              w="fit-content"
              alignItems="center"
              gap={2}
              px={3}
              py={1}
              rounded="full"
              bg="purple.50"
            >
              <Box w={2} h={2} rounded="full" bg="purple.500" />
              <Text fontSize="sm" fontWeight="semibold" color="purple.500">
                Portfolio
              </Text>
            </Flex>

            <Text fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="bold">
              All <span style={{ color: "#805AD5" }}>Projects</span>
            </Text>
            <Text color="gray.500" maxW="60ch">
              A complete list of products and projects I&apos;ve worked on.
            </Text>
            <Text fontSize="sm" color="gray.400">
              {ProjectList.length} projects · {productCount} shipped as products
            </Text>

            <Flex gap={2} pt={4} flexWrap="wrap" justifyContent="center">
              {FILTERS.map((filter) => (
                <Button
                  key={filter}
                  size="sm"
                  rounded="full"
                  onClick={() => setActiveFilter(filter)}
                  colorScheme="purple"
                  variant={activeFilter === filter ? "solid" : "outline"}
                >
                  {filter}
                </Button>
              ))}
            </Flex>
          </Flex>

          <ProjectBrowserGrid
            items={filteredProjects.map((project) => ({
              title: project.name,
              description: project.description,
              stack: project.stack,
              image: project.image,
              url: project.link,
              badge: project.type,
            }))}
          />

          <Flex
            direction="column"
            alignItems="center"
            textAlign="center"
            gap={3}
            mt={{ base: 14, lg: 20 }}
            pt={{ base: 10, lg: 12 }}
            borderTop="1px solid"
            borderColor="gray.100"
          >
            <Text fontSize={{ base: "xl", lg: "2xl" }} fontWeight="bold">
              Have a project in mind?
            </Text>
            <Text color="gray.500">Let&apos;s talk about how I can help bring it to life.</Text>
            <Button as={NextLink} href="/contact-us" colorScheme="purple" mt={2}>
              Get In Touch
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
