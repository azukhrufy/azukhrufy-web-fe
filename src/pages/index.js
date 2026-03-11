import HeroTypewriter from "@/components/HeroTypeWriter";
import MovingLogos from "@/components/MovingLogos";
import ProjectCard from "@/components/ProjectCard";
import { ProjectList } from "@/const/Projects";
import HomeLayout from "@/layouts/HomeLayouts";
import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

/**
 * A counter component that animates from a starting value to an ending value when it becomes visible in the viewport.
 * Uses Intersection Observer API to trigger the animation and resets when the component leaves the viewport.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.from=0] - The starting value of the counter
 * @param {number} [props.to=100] - The target value to count up to
 * @param {number} [props.duration=2] - The duration of the animation in seconds
 * @returns {JSX.Element} A Text component displaying the animated counter value with a "+" suffix
 *
 * @example
 * <Counter from={0} to={500} duration={3} />
 */
const Counter = ({ from = 0, to = 100, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animation when visible
            animate(count, to, {
              duration,
              ease: "easeOut",
            });
          } else {
            // Reset counter when not visible
            count.set(from);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [count, from, to, duration]);

  return (
    <Text fontWeight="bold" fontSize="4xl" color="yellow.500" ref={nodeRef}>
      <motion.span>{rounded}</motion.span> +
    </Text>
  );
};

/**
 * Home component - Main landing page for the portfolio website
 *
 * Displays a hero section with animated role titles, an about me section,
 * work experience statistics, company logos, recent projects, and a floating
 * AI chat button.
 *
 * @component
 * @returns {JSX.Element} The home page component with multiple sections including:
 * - Hero section with typewriter effect showing different roles
 * - About me section with experience details
 * - Counter statistics (years of experience, clients served)
 * - Moving company logos carousel
 * - Recent projects grid
 * - Floating "Ask AI" button
 *
 * @example
 * return (
 *   <Home />
 * )
 */
export default function Home() {
  const roles = ["Ananda Zukhruf", "a Frontend Engineer", "a Web Enthusiast"];
  return (
    <>
      <Head>
        <title>Azukhrufy Web | Portfolio</title>
        <meta name="description" content="Ananda Zukhruf Personal Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        style={{
          height: "100vh",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='white'/><path d='M0 0 H100 M0 0 V100' stroke='%23d3d3d3' stroke-dasharray='4,4' stroke-width='3' stroke-opacity='0.5'/></svg>")`,
        }}
      >
        <Container maxW="7xl">
          <Flex
            flexWrap={{ base: "wrap", md: "nowrap" }}
            height={{ base: "fit-content", lg: "calc(100vh - 8rem)" }}
            width="100%"
            gap={4}
            // background="purple.100"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex flexDirection="column" gap={3} order={{ base: 1, md: 0 }}>
              <Box>
                <Text fontWeight="bold" fontSize={{ base: "4xl", lg: "6xl" }}>
                  Hi
                </Text>
                <Flex flexDirection="row" gap={2}>
                  <Text fontWeight="bold" fontSize={{ base: "4xl", lg: "6xl" }}>
                    I am
                  </Text>

                  <Box
                    fontWeight="bold"
                    fontSize={{ base: "4xl", lg: "6xl" }}
                    as="span"
                    style={{ color: "#805AD5" }}
                  >
                    <HeroTypewriter words={roles} />
                  </Box>
                </Flex>
              </Box>

              <Text
                fontSize="1.2rem"
                color="gray.500"
                maxW="60ch"
                textAlign={{ base: "justify", lg: "left" }}
              >
                Currently as a software engineer at{" "}
                <span style={{ fontWeight: "bold" }}>MySkill.id</span>,
                specialize in Front End Development applications with various
                use cases.
              </Text>

              <Flex flexDirection="row" gap={4} alignItems="center">
                <Button colorScheme="purple" as={NextLink} href="/contact-us">
                  Get In Touch
                </Button>
                <Button
                  colorScheme="purple"
                  variant="outline"
                  onClick={() =>
                    window.open(
                      "https://www.cake.me/pdf/s--MGRPwofPYqdYnAIAzUOzeA--/5AnVQo.pdf",
                      "_blank"
                    )
                  }
                >
                  Download CV
                </Button>
              </Flex>
            </Flex>

            <Image
              order={{ base: 0, md: 1 }}
              alt="personal-portrait"
              src="/images/personal_raw.png"
              width={{ base: "100%", lg: "auto" }}
              height={{ base: "auto", lg: "70%" }}
            />
          </Flex>
        </Container>
      </Box>
      <Box background="gray.900" h="fit-content" py={10}>
        <Container maxW="7xl">
          <Flex flexDirection="column" gap={3} py={4}>
            <Text
              color="gray.200"
              textAlign="center"
              fontSize="5xl"
              fontWeight="semibold"
            >
              About Me
            </Text>
            <Text
              color="gray.400"
              textAlign={{ base: "justify", lg: "center" }}
              fontSize={{ base: "normal", lg: "lg" }}
              fontWeight="medium"
            >
              Software Engineer with a solid background in the industry,
              bringing over 5 years of experience to the table. Well-versed in
              both project-based and product-based companies, I have
              successfully delivered scalable solutions while meeting stringent
              deadlines. Adept at handling multinational projects, I have a
              proven ability to navigate diverse cultural dynamics and ensure
              seamless collaboration across teams. I have also thrived in the
              fast-paced environment of a startup, where I honed my adaptability
              and problem-solving skills. Let's connect and discuss how we can
              leverage my expertise to drive innovation and achieve mutual
              success.
            </Text>

            <Flex
              flexDirection="row"
              gap={{ base: 10, lg: 20 }}
              justifyContent="center"
              alignItems="center"
              py={10}
              flexWrap={{ base: "wrap", lg: "nowrap" }}
            >
              <Flex flexDirection="row" gap={4} alignItems="center">
                <Counter to={5} duration={2} />

                <Text color="gray.500" maxWidth="10ch" fontSize="sm">
                  Years of experience
                </Text>
              </Flex>
              <Flex flexDirection="row" gap={4} alignItems="center">
                <Counter to={50} duration={2} />

                <Text color="gray.500" maxWidth="8ch" fontSize="sm">
                  Client served
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box>
        <Container maxW="7xl" py={10}>
          <Text textAlign="center" fontSize="5xl" fontWeight="bold" pb={4}>
            Recent <span style={{ color: "#805AD5" }}>Work Companies</span>
          </Text>
          <MovingLogos />
        </Container>
      </Box>

      <Box background="#805AD5" py={10}>
        <Container maxW="7xl">
          <Text
            textAlign="center"
            fontSize="5xl"
            fontWeight="bold"
            pb={6}
            color="gray.100"
          >
            Recent Works / Projects
          </Text>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }}
            gridGap={6}
          >
            {ProjectList?.map((project, index) => (
              <ProjectCard key={index} projectProps={project} />
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: { base: "5rem", md: "3rem" },
          right: { base: "0.5em", md: "2rem" },
          zIndex: 200,
        }}
      >
        <Button
          as={NextLink}
          colorScheme="purple"
          size="lg"
          borderRadius="full"
          leftIcon={<Icon as={IoChatbubblesOutline} />}
          href="/AskAi"
        >
          Ask AI
        </Button>
      </Box>
    </>
  );
}
