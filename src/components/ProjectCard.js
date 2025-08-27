import {
  Card,
  CardBody,
  Text,
  Stack,
  Flex,
  Button,
  CardFooter,
  Tag,
} from "@chakra-ui/react";
import NextLink from "next/link";
import CustomTag from "./CustomTag";

export default function ProjectCard({ projectProps }) {
  const { name, description, link, stack, type } = projectProps || {};
  return (
    <Card>
      <CardBody>
        <Stack spacing="4">
          <Text fontSize="xl" fontWeight="semibold" color="#805AD5">
            {name}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal" minHeight='8rem'>
            {description}
          </Text>
          <Flex flexDirection="row" gap={3} flexWrap="wrap">
            {stack?.map((item, index) => (
              <CustomTag text={item} key={index} />
            ))}
          </Flex>
          <Tag width="fit-content" colorScheme={type === 'Product' ? 'green' : 'blue'}>{type}</Tag>
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex
          width="100%"
          justifyContent="flex-end"
          alignItems="flex-end"
          height="100%"
        >
          <Button
            variant="ghost"
            as={NextLink}
            href={link}
            size="sm"
            colorScheme="purple"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Product
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}
