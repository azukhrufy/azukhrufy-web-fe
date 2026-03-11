import HomeLayout from "@/layouts/HomeLayouts";
import { Box, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Head from "next/head";

ContactUs.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Kontak | Azukhrufy</title>
        <meta name="description" content="Ananda Zukhruf Personal Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="7xl">
        <Flex
          flexDir="column"
          gap={6}
          alignItems="center"
          h="80vh"
          justifyContent="center"
          style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='white'/><path d='M0 0 H100 M0 0 V100' stroke='%23d3d3d3' stroke-dasharray='4,4' stroke-width='3' stroke-opacity='0.5'/></svg>")`,
        }}
        >
          <Text fontSize="3xl" fontWeight="bold" color="purple.500">
            Contact Us
          </Text>
          <Grid
            templateColumns="repeat(3, 1fr)"
            gridGap={4}
            alignItems="center"
          >
            <Box rounded="lg" background="purple.50" h="100%" p={4}>
              <Text fontWeight="bold" color="purple.500" fontSize="xl">
                Current Employer & Position
              </Text>
              <Text color="purple.500">
                PT. Linimuda Inspirasi Negeri | MySkill.id
              </Text>
              <Text color="purple.300">Frontend Engineer</Text>
            </Box>
            <Box rounded="lg" background="purple.50" h="100%" p={4}>
              <Text fontWeight="bold" color="purple.500" fontSize="xl">
                Email
              </Text>
              <Text color="purple.500">anandazukhruf@gmail.com</Text>
              <Text color="purple.500">anandazukhrufawalwi@gmail.com</Text>
            </Box>
            <Box rounded="lg" background="purple.50" h="100%" p={4}>
              <Text fontWeight="bold" color="purple.500" fontSize="xl">
                Social Media
              </Text>
              <Text color="purple.500">
                https://www.linkedin.com/in/azukhrufy/
              </Text>
              <Text color="purple.500">https://github.com/azukhrufy</Text>
              <Text color="purple.500">https://gitlab.com/azukhrufy</Text>
            </Box>
            <GridItem colSpan={3}>
              <Box rounded="lg" background="purple.50" h="100%" p={4}>
                <Text fontWeight="bold" color="purple.500" fontSize="xl">
                  Address
                </Text>
                <Text color="purple.500">Bandung</Text>
                <Text color="purple.300">
                  Jl Ir H Juanda, Kec. Coblong, Kota Bandung, 40135
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Flex>
      </Container>
    </>
  );
}
