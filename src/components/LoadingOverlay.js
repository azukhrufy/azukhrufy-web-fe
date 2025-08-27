// @chakra-ui

import {
  Box,
  Center,
  Container,
  Flex,
  Image,
  Progress,
  Text,
} from "@chakra-ui/react";

// ----------------------------------------------------------------------

/**
 * @returns {JSX.Element}
 */
export default function LoadingOverlay() {
  return (
    <Box pos="fixed" zIndex="overlay" inset={0} w="100vw" h="100vh" bg="white">
      <Container w="100%" h="100%">
        <Center w="100%" h="100%">
          <div>
            <Flex flexDir="column" mb={2} gap={3}>
              <Flex flexDirection="row" gap={3} alignItems="center">
                <Image
                  alt="SBB_LOGO"
                  src="/assets/logo/Logo.png"
                  width="40px"
                  height="auto"
                />
                <Box>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="purple.500"
                    lineHeight={1}
                  >
                    Azukhrufy Web
                  </Text>
                  <Text fontSize="sm" color="purple.500" lineHeight={1}>
                    by Azukhrufy
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Progress size="xs" isIndeterminate w="100%" mx="auto" />
          </div>
        </Center>
      </Container>
    </Box>
  );
}
