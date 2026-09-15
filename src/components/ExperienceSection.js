import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import { ExperienceList } from "@/const/Experience";

/**
 * ExperienceSection - a vertical timeline of work experience entries.
 * Rendered on the home page between the Skills and Showcase sections.
 */
export default function ExperienceSection() {
  return (
    <Box bg="gray.50" py={{ base: 12, lg: 16 }}>
      <Container maxW="7xl">
        <Text textAlign="center" fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="bold" pb={{ base: 8, lg: 12 }}>
          Work <span style={{ color: "#805AD5" }}>Experience</span>
        </Text>

        <Flex direction="column" maxW="720px" mx="auto">
          {ExperienceList.map((item, index) => {
            const isLast = index === ExperienceList.length - 1;
            return (
              <Flex
                key={item.company}
                gap={4}
                role="group"
                rounded="lg"
                px={3}
                py={2}
                mx={-3}
                cursor="pointer"
                transition="all 0.25s ease"
                _hover={{ bg: "white", boxShadow: "md", transform: "translateX(6px)" }}
              >
                <Flex direction="column" alignItems="center">
                  <Box
                    w={3}
                    h={3}
                    rounded="full"
                    bg="purple.500"
                    flexShrink={0}
                    mt={1.5}
                    transition="all 0.25s ease"
                    _groupHover={{ transform: "scale(1.4)", boxShadow: "0 0 0 4px var(--chakra-colors-purple-100)" }}
                  />
                  {!isLast && <Box w="2px" flex={1} bg="gray.200" my={1} />}
                </Flex>

                <Flex direction="column" gap={1} pb={isLast ? 0 : 8}>
                  <Flex alignItems="center" gap={3}>
                    {item.logo && (
                      <Image src={item.logo} alt={item.company} h={6} objectFit="contain" />
                    )}
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      transition="color 0.25s ease"
                      _groupHover={{ color: "purple.600" }}
                    >
                      {item.role} · {item.company}
                    </Text>
                  </Flex>
                  <Text fontSize="sm" color="purple.500" fontWeight="semibold">
                    {item.period}
                  </Text>
                  <Text color="gray.600">{item.description}</Text>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
}
