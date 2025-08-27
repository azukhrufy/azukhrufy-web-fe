"use client";
import NextLink from "next/link";
import LoadingOverlay from "@/components/LoadingOverlay";
import CustomPopover from "@/components/CustomPopover";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  // useBreakpointValue,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

/**
 * HomeLayout component that provides the layout structure for the home page.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The main content to be rendered within the layout.
 *
 * @returns {JSX.Element} The HomeLayout component.
 *
 * @example
 * <HomeLayout>
 *   <MainContent />
 * </HomeLayout>
 */
export default function HomeLayout({ children }) {
  const { isOpen } = useDisclosure();

  return (
    <Box border={0}>
      <Box
        className="sarekat-navbar"
        p={0}
        position="sticky"
        background='white'
        top={0}
        zIndex={20}
      >
        <Container maxW={{ base: "container.sm", md: "7xl" }}>
          <Flex minH="60px" py={{ base: 2 }} px={{ base: 0 }} align="center">
            <Flex flex={{ base: 1 }} justify={{ base: "start", md: "start" }}>
              <Text fontSize="4xl" fontWeight="bold">
                AZ
              </Text>
            </Flex>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
            <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
              justify="flex-end"
            >
              <CustomPopover
                width="200px"
                content={() => (
                  <Box
                    width="200px"
                    marginInlineEnd={-3}
                    marginInlineStart={-3}
                    marginTop={-2}
                    marginBottom={-2}
                    px={4}
                    py={4}
                    height="100%"
                    background="white"
                    overflow="clip"
                  >
                    {NAV_ITEMS.map((navItem) => (
                      <MobileNavItem key={navItem.label} {...navItem} />
                    ))}
                  </Box>
                )}
              >
                <IconButton
                  color="black"
                  icon={
                    isOpen ? (
                      <IoCloseCircleOutline w={3} h={3} />
                    ) : (
                      <RxHamburgerMenu w={5} h={5} />
                    )
                  }
                  variant="ghost"
                  aria-label="Toggle Navigation"
                />
              </CustomPopover>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>

      {/* Main content section */}
      <Box>
        {/* Suspense is used to render a fallback (LoadingOverlay) while loading the main content */}
        <Suspense fallback={<LoadingOverlay />}>
          {children} {/* Render the main content passed as children */}
        </Suspense>
      </Box>
    </Box>
  );
}

/**
 * DesktopNav component renders the navigation bar for desktop view.
 * It displays navigation items with optional sub-navigation items in a popover.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <DesktopNav />
 *
 * @description
 * The DesktopNav component uses Chakra UI components such as Stack, Box, Popover, PopoverTrigger, PopoverContent, and Flex.
 * It maps through the NAV_ITEMS array to create navigation links. If a navigation item has children, it renders them inside a PopoverContent.
 * The current active link is highlighted with a bold font weight and a yellow underline.
 *
 * @see https://chakra-ui.com/docs/components/popover
 */
const DesktopNav = () => {
  const linkColor = "black";
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const router = useRouter();

  return (
    <Stack direction="row" spacing={6}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Box
                p={2}
                as={NextLink}
                href={navItem.href}
                fontSize="md"
                fontWeight={router.asPath === navItem.href ? "bold" : "normal"}
                color={linkColor}
                role="group"
                _hover={{
                  textDecoration: "none",
                  fontWeight: "semibold",
                }}
                cursor="pointer" // Ubah kursor
              >
                <Flex
                  flexDirection="column"
                  gap={0.5}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>{navItem.label}</Text>
                  {router.asPath === navItem.href && (
                    <Box
                      background="purple.500"
                      h={0.5}
                      w="24px"
                      rounded="lg"
                    />
                  )}
                </Flex>
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

/**
 * DesktopSubNav component renders a navigation link with a label, sub-label, and an icon.
 * It provides hover effects for better user experience.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.label - The main label text for the navigation link.
 * @param {string} props.href - The URL that the navigation link points to.
 * @param {string} props.subLabel - The sub-label text for additional information.
 * @returns {JSX.Element} The rendered DesktopSubNav component.
 */
const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize="sm">{subLabel}</Text>
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color="pink.400" w={5} h={5} as={HiChevronRight} />
        </Flex>
      </Stack>
    </Box>
  );
};

/**
 * MobileNav component renders a stack of navigation items for mobile view.
 *
 * @returns {JSX.Element} A stack component containing mobile navigation items.
 */
const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

/**
 * MobileNavItem component renders a navigation item for mobile view with optional sub-items.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the navigation item.
 * @param {Array<Object>} [props.children] - The sub-items for the navigation item.
 * @param {string} [props.children[].label] - The label for the sub-item.
 * @param {string} [props.children[].href] - The href for the sub-item.
 * @param {string} [props.href] - The href for the navigation item.
 * @returns {JSX.Element} The rendered MobileNavItem component.
 *
 */
const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as={NextLink}
        href={href}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
        cursor="pointer"
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={HiChevronDown}
            transition="all .25s ease-in-out"
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Event",
    href: "/events",
  },
  {
    label: "Tentang Kami",
    href: "/about-us",
  },
  {
    label: "Kontak",
    href: "/contact-us",
  },
];
