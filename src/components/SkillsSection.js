import { Box, Container, Flex, Icon, Text } from "@chakra-ui/react";
import { SkillGroups } from "@/const/Skills";
import IconMarqueeRow from "@/components/IconMarqueeRow";

const allSkills = SkillGroups.flatMap((group) => group.skills);

function SkillChip({ skill }) {
  return (
    <Flex
      alignItems="center"
      gap={3}
      rounded="full"
      border="1px solid"
      borderColor="purple.200"
      bg="purple.50"
      color="purple.600"
      px={6}
      py={3}
      fontSize="lg"
      fontWeight="semibold"
      whiteSpace="nowrap"
    >
      <Icon as={skill.icon} boxSize={6} />
      <Text>{skill.name}</Text>
    </Flex>
  );
}

/**
 * SkillsSection - two infinite marquee rows of tech-stack chips. The top row
 * drifts right-to-left, the bottom row left-to-right; both idle at a slow
 * constant pace and speed up (same direction) the faster the page is
 * scrolled. Rendered on the home page between About Me and Experience.
 */
export default function SkillsSection() {
  return (
    <Box py={{ base: 12, lg: 16 }} overflow="hidden">
      <Container maxW="7xl">
        <Text textAlign="center" fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="bold" pb={{ base: 8, lg: 12 }}>
          Skills <span style={{ color: "#805AD5" }}>& Tech Stack</span>
        </Text>
      </Container>

      <Flex direction="column" gap={6}>
        <IconMarqueeRow
          items={allSkills}
          baseVelocity={-30}
          gap={32}
          renderItem={(skill) => <SkillChip skill={skill} />}
        />
        <IconMarqueeRow
          items={[...allSkills].reverse()}
          baseVelocity={30}
          gap={32}
          renderItem={(skill) => <SkillChip skill={skill} />}
        />
      </Flex>
    </Box>
  );
}
