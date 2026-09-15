import { Box, Flex, Grid, Heading, Icon, Image, Tag, Text, Wrap } from "@chakra-ui/react";
import { IoArrowForward } from "react-icons/io5";
import CustomTag from "@/components/CustomTag";

/** Extracts a short "domain.com" label from a project URL for the browser mockup bar. */
function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Builds initials from a project name, used as a placeholder when no screenshot is available. */
function getInitials(name) {
  return (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * ProjectBrowserCard - a single project rendered as a browser-window style
 * card: traffic-light dots + fake url bar, a screenshot (or a gradient
 * placeholder with initials when no image is available), description, tech
 * stack tags, an optional badge, and a link to the live site.
 *
 * @component
 */
export function ProjectBrowserCard({ title, description, image, url, stack, badge }) {
  const label = typeof title === "string" ? title : undefined;

  return (
    <Box
      as={url ? "a" : "div"}
      href={url}
      target={url ? "_blank" : undefined}
      rel={url ? "noopener noreferrer" : undefined}
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
      {/* Browser mockup title bar */}
      <Flex alignItems="center" gap={3} bg="gray.50" borderBottom="1px solid" borderColor="gray.100" px={4} py={2.5}>
        <Flex gap={1.5}>
          <Box w={2.5} h={2.5} rounded="full" bg="red.300" />
          <Box w={2.5} h={2.5} rounded="full" bg="yellow.300" />
          <Box w={2.5} h={2.5} rounded="full" bg="green.300" />
        </Flex>
        <Flex
          flex={1}
          justifyContent="center"
          fontSize="xs"
          color="gray.400"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          rounded="full"
          px={3}
          py={0.5}
          isTruncated
        >
          {url ? getDomain(url) : "project"}
        </Flex>
      </Flex>

      {/* Screenshot or placeholder */}
      <Box position="relative" overflow="hidden" bg="gray.50">
        {image ? (
          <Image
            src={image}
            alt={label || "project showcase"}
            w="100%"
            h="220px"
            objectFit="cover"
            objectPosition="top"
            transition="transform 0.4s ease"
            _groupHover={{ transform: "scale(1.05)" }}
          />
        ) : (
          <Flex
            h="220px"
            alignItems="center"
            justifyContent="center"
            fontSize="4xl"
            fontWeight="bold"
            color="white"
            bgGradient="linear(135deg, purple.500, purple.300)"
          >
            {getInitials(label)}
          </Flex>
        )}
        {badge && (
          <Tag
            position="absolute"
            top={3}
            right={3}
            colorScheme={badge === "Product" ? "green" : "blue"}
            fontWeight="semibold"
          >
            {badge}
          </Tag>
        )}
      </Box>

      {/* Card body */}
      <Flex direction="column" gap={3} p={5} flex={1}>
        <Heading as="h3" size="md" color="gray.700">
          {title}
        </Heading>
        <Text color="gray.500" fontSize="sm" noOfLines={3}>
          {description}
        </Text>
        <Wrap mt="auto" pt={2}>
          {stack?.map((tech) => (
            <CustomTag key={tech} text={tech} />
          ))}
        </Wrap>
        {url && (
          <Flex alignItems="center" gap={1.5} color="purple.500" fontWeight="semibold" fontSize="sm" pt={1}>
            Visit Website
            <Icon as={IoArrowForward} transition="transform 0.2s ease" _groupHover={{ transform: "translateX(3px)" }} />
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

/**
 * ProjectBrowserGrid - responsive grid wrapper for a list of
 * {@link ProjectBrowserCard} items.
 *
 * @component
 */
export default function ProjectBrowserGrid({ items }) {
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
      {items.map((item, index) => (
        <ProjectBrowserCard key={index} {...item} />
      ))}
    </Grid>
  );
}
