import { Box, Text } from "@chakra-ui/react";

export default function CustomTag({ text }) {
  return (
    <Box rounded="xl" border="1px solid black" py={1} px={2}>
      <Text fontSize="xs" fontWeight="semibold">
        {text}
      </Text>
    </Box>
  );
}
