import HomeLayout from "@/layouts/HomeLayouts";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

MyExperienceStories.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

const storySections = [
  {
    title: "A connected HR experience",
    image: "/images/stories/myexperience/Introduction-Image.png",
    imageAlt: "MyExperience.id introduction",
    imageFirst: true,
    label: "THE PRODUCT",
    paragraphs: [
      "MyExperience.id is an HRIS application by MySkill that supports HR processes from attendance through employee management.",
      "It brings these essential people operations together in one product, giving organizations a shared place to support their employee experience.",
    ],
  },
  {
    title: "A dashboard for everyday needs",
    image: "/images/stories/myexperience/Dashboard-Features.png",
    imageAlt: "MyExperience.id dashboard features",
    imageFirst: true,
    label: "EVERYDAY HR",
    paragraphs: [
      "The dashboard brings together e-learning, attendance, and employment requests. Employees can refer to attendance information and submit requests such as leave and reimbursement.",
      "With these common HR needs represented in the same experience, employees can find the tools they need without treating each process as a separate product.",
    ],
  },
  {
    title: "MySkill e-learning, integrated",
    image: "/images/stories/myexperience/Integrated-eLearning.png",
    imageAlt: "MySkill e-learning integrated with MyExperience.id",
    imageFirst: false,
    label: "LEARNING & DEVELOPMENT",
    paragraphs: [
      "MyExperience.id integrates MySkill e-learning with its HR experience, making learning part of the same product employees use for their day-to-day HR needs.",
      "This connection puts employee learning alongside the wider experience of working, developing, and managing people.",
    ],
  },
  {
    title: "Progress people can share",
    image: "/images/stories/myexperience/Employee-Tracking.png",
    imageAlt: "Employee tracking and progress in MyExperience.id",
    imageFirst: true,
    label: "PERFORMANCE & TASKS",
    paragraphs: [
      "Performance and Tasks help people communicate progress toward specific tasks and targets. Targets can be set for an individual, a team, or the company.",
      "MyExperience.id describes creating and monitoring employee KPI targets, helping teams keep their performance aligned with those goals.",
    ],
  },
];

export default function MyExperienceStories() {
  return (
    <Box as="main" bg="white">
      <Box
        position="relative"
        overflow="hidden"
        bgGradient="linear(125deg, purple.50 0%, white 52%, cyan.50 100%)"
        borderBottom="1px solid"
        borderColor="purple.100"
      >
        <Box
          position="absolute"
          aria-hidden="true"
          w={{ base: "260px", md: "420px" }}
          h={{ base: "260px", md: "420px" }}
          borderRadius="full"
          bg="purple.100"
          opacity={0.45}
          filter="blur(80px)"
          top="-180px"
          right={{ base: "-100px", md: "4%" }}
        />
        <Container maxW="6xl" position="relative" py={{ base: 16, md: 24 }}>
          <Stack maxW="3xl" spacing={{ base: 5, md: 7 }}>
            <Box
              alignSelf="flex-start"
              px={4}
              py={2}
              border="1px solid"
              borderColor="purple.200"
              borderRadius="full"
              bg="whiteAlpha.800"
            >
              <Text
                color="purple.600"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="0.14em"
              >
                PRODUCT STORY · MYEXPERIENCE.ID
              </Text>
            </Box>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              lineHeight={{ base: 1.08, md: 1.04 }}
              letterSpacing="-0.04em"
              color="gray.800"
            >
              Better work starts with a{" "}
              <Text as="span" color="purple.500">
                connected experience.
              </Text>
            </Heading>
            <Text
              maxW="2xl"
              color="gray.600"
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight="tall"
            >
              Meet MyExperience.id: an HRIS that brings everyday people
              operations, learning, and employee progress into one story.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container maxW="6xl">
        <Stack spacing={0}>
          {storySections.map((section, index) => (
            <Grid
              key={section.title}
              as="section"
              alignItems="center"
              columnGap={{ base: 0, md: 16 }}
              rowGap={{ base: 4, md: 0 }}
              templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }}
              aria-labelledby={`myexperience-section-${index}`}
              py={{ base: 10, md: 16 }}
              borderBottom={index < storySections.length - 1 ? "1px solid" : undefined}
              borderColor="gray.100"
            >
              <GridItem
                order={{ base: section.imageFirst ? 0 : 1, md: section.imageFirst ? 0 : 1 }}
              >
                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  w="100%"
                  h="auto"
                  maxH={{ base: "360px", md: "480px" }}
                  borderRadius="xl"
                  objectFit="contain"
                />
              </GridItem>
              <GridItem
                order={{ base: section.imageFirst ? 1 : 0, md: section.imageFirst ? 1 : 0 }}
                px={{ base: 1, md: 2 }}
              >
                <Stack spacing={{ base: 4, md: 6 }}>
                  <Text
                    color="purple.500"
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="0.16em"
                  >
                    {String(index + 1).padStart(2, "0")} / {section.label}
                  </Text>
                  <Heading
                    id={`myexperience-section-${index}`}
                    as="h2"
                    fontSize={{ base: "2xl", md: "4xl" }}
                    lineHeight="1.15"
                    letterSpacing="-0.025em"
                    color="gray.800"
                  >
                    {section.title}
                  </Heading>
                  <Stack spacing={4} maxW="48ch">
                    {section.paragraphs.map((paragraph) => (
                      <Text
                        key={paragraph}
                        color="gray.600"
                        fontSize={{ base: "md", md: "lg" }}
                        lineHeight="tall"
                      >
                        {paragraph}
                      </Text>
                    ))}
                  </Stack>
                </Stack>
              </GridItem>
            </Grid>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}