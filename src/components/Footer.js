import NextLink from "next/link";
import { Box, Container, Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";
import { IoLogoGithub, IoLogoLinkedin, IoLogoGitlab, IoMailOutline } from "react-icons/io5";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/azukhrufy/", icon: IoLogoLinkedin },
  { label: "GitHub", href: "https://github.com/azukhrufy", icon: IoLogoGithub },
  { label: "GitLab", href: "https://gitlab.com/azukhrufy", icon: IoLogoGitlab },
  { label: "Email", href: "mailto:anandazukhruf@gmail.com", icon: IoMailOutline },
];

/**
 * Site-wide footer shown at the bottom of every public page rendered through
 * HomeLayout. Provides quick navigation and social/contact links.
 */
export default function Footer() {
  return (
    <Box as="footer" borderTop="1px solid" borderColor="gray.100" py={8}>
      <Container maxW="7xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex direction="column" gap={0.5} textAlign={{ base: "center", md: "left" }}>
            <Text fontWeight="bold" fontSize="lg">
              AZ<Text as="span" color="purple.500">.</Text>
            </Text>
            <Text fontSize="sm" color="gray.500">
              &copy; {new Date().getFullYear()} Ananda Zukhruf. All rights reserved.
            </Text>
          </Flex>

          <HStack spacing={3}>
            {SOCIAL_LINKS.map((item) => (
              <Link
                key={item.label}
                as={item.href.startsWith("mailto:") ? "a" : NextLink}
                href={item.href}
                isExternal={!item.href.startsWith("mailto:")}
                aria-label={item.label}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w={9}
                h={9}
                rounded="full"
                bg="gray.50"
                color="gray.600"
                _hover={{ bg: "purple.500", color: "white" }}
                transition="all 0.2s ease"
              >
                <Icon as={item.icon} boxSize={4} />
              </Link>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
