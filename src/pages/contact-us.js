import HomeLayout from "@/layouts/HomeLayouts";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import Head from "next/head";
import {
  IoBriefcaseOutline,
  IoCheckmarkOutline,
  IoCopyOutline,
  IoLocationOutline,
  IoLogoGithub,
  IoLogoGitlab,
  IoLogoLinkedin,
  IoMailOutline,
} from "react-icons/io5";

ContactUs.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

const PRIMARY_EMAIL = "anandazukhruf@gmail.com";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/azukhrufy/", icon: IoLogoLinkedin },
  { label: "GitHub", href: "https://github.com/azukhrufy", icon: IoLogoGithub },
  { label: "GitLab", href: "https://gitlab.com/azukhrufy", icon: IoLogoGitlab },
];

const CONTACT_CARDS = [
  {
    icon: IoBriefcaseOutline,
    title: "Current Employer & Position",
    lines: ["PT. Linimuda Inspirasi Negeri | MySkill.id", "Frontend Engineer"],
  },
  {
    icon: IoLogoLinkedin,
    title: "Social Media",
    lines: [
      "linkedin.com/in/azukhrufy",
      "github.com/azukhrufy",
      "gitlab.com/azukhrufy",
    ],
    links: [
      "https://www.linkedin.com/in/azukhrufy/",
      "https://github.com/azukhrufy",
      "https://gitlab.com/azukhrufy",
    ],
    icons: [IoLogoLinkedin, IoLogoGithub, IoLogoGitlab],
  },
];

function ContactCard({ icon, title, lines, links, icons }) {
  return (
    <Box
      rounded="xl"
      bg="white"
      h="100%"
      p={6}
      border="1px solid"
      borderColor="gray.100"
      boxShadow="sm"
      transition="all 0.2s ease"
      _hover={{ boxShadow: "md", borderColor: "purple.200" }}
    >
      <Flex alignItems="center" gap={3} mb={3}>
        <Flex
          alignItems="center"
          justifyContent="center"
          w={10}
          h={10}
          rounded="full"
          bg="purple.500"
          color="white"
          flexShrink={0}
        >
          <Icon as={icon} boxSize={5} />
        </Flex>
        <Text fontWeight="bold" color="gray.700" fontSize="lg">
          {title}
        </Text>
      </Flex>
      <Flex flexDirection="column" gap={1}>
        {lines.map((line, index) =>
          links?.[index] ? (
            <Text
              as="a"
              key={line}
              href={links[index]}
              target="_blank"
              rel="noopener noreferrer"
              color="purple.500"
              _hover={{ textDecoration: "underline" }}
              display="flex"
              alignItems="center"
              gap={2}
            >
              {icons?.[index] && <Icon as={icons[index]} boxSize={4} />}
              {line}
            </Text>
          ) : (
            <Text key={line} color={index === 0 ? "gray.600" : "gray.500"}>
              {line}
            </Text>
          ),
        )}
      </Flex>
    </Box>
  );
}

function EmailCard() {
  const { hasCopied, onCopy } = useClipboard(PRIMARY_EMAIL);

  return (
    <Box
      rounded="xl"
      bg="white"
      h="100%"
      p={6}
      border="1px solid"
      borderColor="gray.100"
      boxShadow="sm"
      transition="all 0.2s ease"
      _hover={{ boxShadow: "md", borderColor: "purple.200" }}
    >
      <Flex alignItems="center" gap={3} mb={3}>
        <Flex
          alignItems="center"
          justifyContent="center"
          w={10}
          h={10}
          rounded="full"
          bg="purple.500"
          color="white"
          flexShrink={0}
        >
          <Icon as={IoMailOutline} boxSize={5} />
        </Flex>
        <Text fontWeight="bold" color="gray.700" fontSize="lg">
          Email
        </Text>
      </Flex>
      <Flex flexDirection="column" gap={1}>
        {[PRIMARY_EMAIL, "anandazukhrufawalwi@gmail.com"].map((email, index) => (
          <Flex key={email} alignItems="center" gap={2}>
            <Text
              as="a"
              href={`mailto:${email}`}
              color={index === 0 ? "purple.500" : "gray.500"}
              _hover={{ textDecoration: "underline" }}
            >
              {email}
            </Text>
            {index === 0 && (
              <IconButton
                aria-label="Copy email"
                icon={<Icon as={hasCopied ? IoCheckmarkOutline : IoCopyOutline} boxSize={3.5} />}
                size="xs"
                variant="ghost"
                colorScheme="purple"
                onClick={onCopy}
              />
            )}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Kontak | Azukhrufy</title>
        <meta name="description" content="Ananda Zukhruf Personal Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        py={{ base: 16, lg: 20 }}
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='white'/><path d='M0 0 H100 M0 0 V100' stroke='%23d3d3d3' stroke-dasharray='4,4' stroke-width='3' stroke-opacity='0.5'/></svg>")`,
        }}
      >
        <Container maxW="7xl">
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 10, lg: 16 }}
            alignItems="center"
            mb={{ base: 12, lg: 16 }}
          >
            <Flex flex={1} flexDir="column" gap={4} alignItems={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }}>
              <Flex w="fit-content" alignItems="center" gap={2} px={3} py={1} rounded="full" bg="purple.50">
                <Box w={2} h={2} rounded="full" bg="purple.500" />
                <Text fontSize="sm" fontWeight="semibold" color="purple.500">
                  Contact
                </Text>
              </Flex>

              <Text fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="bold">
                Let&apos;s Get In Touch
              </Text>
              <Text color="gray.500" maxW="50ch">
                Have a project in mind or just want to say hi? Reach out
                through any of the channels below - I usually reply within
                1-2 business days.
              </Text>

              <Flex gap={4} alignItems="center" flexWrap="wrap" pt={2}>
                <Button as="a" href={`mailto:${PRIMARY_EMAIL}`} colorScheme="purple">
                  Send an Email
                </Button>
                <Flex gap={2}>
                  {SOCIAL_LINKS.map((item) => (
                    <IconButton
                      key={item.label}
                      as="a"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      icon={<Icon as={item.icon} boxSize={5} />}
                      variant="ghost"
                      colorScheme="purple"
                      rounded="full"
                    />
                  ))}
                </Flex>
              </Flex>
            </Flex>

            <Flex flex={1} justifyContent="center" display={{ base: "none", lg: "flex" }}>
              <Flex
                w="240px"
                h="240px"
                rounded="full"
                bgGradient="linear(135deg, purple.500, purple.300)"
                alignItems="center"
                justifyContent="center"
                boxShadow="xl"
              >
                <Icon as={IoMailOutline} boxSize={20} color="white" />
              </Flex>
            </Flex>
          </Flex>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gridGap={4} alignItems="stretch">
            {CONTACT_CARDS[0] && <ContactCard {...CONTACT_CARDS[0]} />}
            <EmailCard />
            {CONTACT_CARDS[1] && <ContactCard {...CONTACT_CARDS[1]} />}
            <GridItem colSpan={{ base: 1, md: 3 }}>
              <ContactCard
                icon={IoLocationOutline}
                title="Address"
                lines={["Bandung", "Jl Ir H Juanda, Kec. Coblong, Kota Bandung, 40135"]}
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
