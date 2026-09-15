import { Box, Button, Container, Flex, Grid, Icon, Image, Tag, Text, Wrap } from "@chakra-ui/react";
import { IoArrowForward, IoDocumentTextOutline } from "react-icons/io5";

const MEDIUM_PROFILE_URL = "https://medium.com/@azukhrufy";

function BlogCard({ title, excerpt, date, thumbnail, categories, link }) {
  return (
    <Box
      as="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      role="group"
      display="flex"
      flexDirection="column"
      rounded="xl"
      overflow="hidden"
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      boxShadow="md"
      transition="all 0.25s ease"
      _hover={{ transform: "translateY(-6px)", boxShadow: "xl", borderColor: "purple.200" }}
    >
      <Box overflow="hidden" bg="gray.50">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            w="100%"
            h="180px"
            objectFit="cover"
            transition="transform 0.4s ease"
            _groupHover={{ transform: "scale(1.05)" }}
          />
        ) : (
          <Flex h="180px" alignItems="center" justifyContent="center" bgGradient="linear(135deg, purple.500, purple.300)">
            <Icon as={IoDocumentTextOutline} boxSize={12} color="white" />
          </Flex>
        )}
      </Box>

      <Flex direction="column" gap={3} p={5} flex={1}>
        {categories?.length > 0 && (
          <Wrap>
            {categories.map((category) => (
              <Tag key={category} size="sm" colorScheme="purple" rounded="full">
                {category}
              </Tag>
            ))}
          </Wrap>
        )}
        <Text fontWeight="bold" fontSize="lg" color="gray.700" noOfLines={2}>
          {title}
        </Text>
        <Text color="gray.500" fontSize="sm" noOfLines={3}>
          {excerpt}
        </Text>
        <Flex mt="auto" pt={2} alignItems="center" justifyContent="space-between">
          {date && (
            <Text fontSize="xs" color="gray.400">
              {date}
            </Text>
          )}
          <Flex alignItems="center" gap={1.5} color="purple.500" fontWeight="semibold" fontSize="sm">
            Read Article
            <Icon as={IoArrowForward} transition="transform 0.2s ease" _groupHover={{ transform: "translateX(3px)" }} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

/**
 * BlogSection - showcases the latest Medium posts fetched server-side via
 * {@link getMediumPosts}, with a link to the full Medium profile. Rendered
 * on the home page after the Recent Work Companies section.
 *
 * @component
 * @param {{ posts: Array<{ title: string, excerpt: string, date: string|null, thumbnail: string|null, categories: string[], link: string }> }} props
 */
export default function BlogSection({ posts = [] }) {
  if (posts.length === 0) return null;

  return (
    <Box py={{ base: 12, lg: 20 }}>
      <Container maxW="7xl">
        <Text textAlign="center" fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="bold" pb={{ base: 10, lg: 16 }}>
          Blog <span style={{ color: "#805AD5" }}>& Articles</span>
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </Grid>

        <Box textAlign="center" pt={{ base: 10, lg: 14 }}>
          <Button as="a" href={MEDIUM_PROFILE_URL} target="_blank" rel="noopener noreferrer" colorScheme="purple" variant="outline" px={8}>
            View All Articles
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
