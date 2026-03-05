import { Flex, Image, Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Flex alignItems="center" gap={2}>
      <Image src="/assets/logo/Logo.png" height={8} alt="logo" />
      <Flex flexDir="column">
        <Text fontSize="xl" fontWeight="bold" color="purple.500" lineHeight={1.2}>
          AZ Web
        </Text>
        <Text fontSize="xs" color="purple.500" lineHeight={1}>
          by Azukhrufy
        </Text>
      </Flex>
    </Flex>
  );
}
