import PATHS from "@/const/path";
import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FiChevronDown, FiHome, FiMenu } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import SidebarContents from "./SidebarContents";

const LinkItems = [
  { name: "Dashboard", icon: FiHome, link: PATHS.app.dashboard.root },
  { name: "Companies", icon: FaBuilding, link: PATHS.app.companies.root },
];

export default function DashboardLayout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.50")}>
      <SidebarContents
        linkItems={LinkItems} // Assuming LinkItems is defined elsewhere in the code
        onClose={() => onClose} // Function to close the sidebar
        display={{ base: "none", md: "block" }} // Show the sidebar on md and above screen sizes
      />

      {/* Drawer component is used as a sidebar menu for mobile use */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose} // Function to close the drawer (sidebar on mobile)
        returnFocusOnClose={false}
        onOverlayClick={onClose} // Function to close the drawer when overlay (outside) is clicked
        size="full"
      >
        <DrawerContent>
          {/* Sidebar content for mobile view */}
          <SidebarContents onClose={onClose} linkItems={LinkItems} />
        </DrawerContent>
      </Drawer>

      {/* Mobile navigation component */}
      <MobileNav onOpen={onOpen} />

      {/* Main content section */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Suspense is used to render a fallback (LoadingOverlay) while loading the main content */}
        {/* <Suspense fallback={<LoadingOverlay />}> */}
        {children} {/* Render the main content passed as children */}
        {/* </Suspense> */}
      </Box>
    </Box>
  );
}

/**
 * MobileNav component renders the mobile navigation bar with user profile and menu options.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onOpen - Function to open the mobile menu (sidebar).
 * @param {Object} props.rest - Additional props to be spread on the Flex component.
 *
 * @returns {JSX.Element} The rendered MobileNav component.
 *
 * @example
 * <MobileNav onOpen={handleOpen} />
 */
const MobileNav = ({ onOpen, ...rest }) => {
  const { user, logout } = useAuth();
  const toast = useToast();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      toast({
        title: "Logged out successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Logout failed!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      position="sticky"
      top={0}
      zIndex={8}
      {...rest}
    >
      {/* Menu icon to open the mobile menu (sidebar) */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen} // Function to open the mobile menu (sidebar)
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/* Brand logo (shown only on mobile view) */}
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="xl"
        fontWeight="bold"
        color="purple.500"
        lineHeight={1}
      >
        AZ Web
      </Text>

      {/* Header icons and user profile */}
      <HStack spacing={{ base: "0", md: "6" }}>
        {/* User profile menu */}
        <Flex alignItems="center">
          {/* User profile dropdown menu */}
          <Menu>
            {/* Menu button */}
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {/* User profile avatar */}
                <Avatar
                  size="sm"
                  src="https://z-m-scontent.fcgk9-2.fna.fbcdn.net/v/t1.18169-9/12670484_1695308580757387_5879267640628321681_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=104&ccb=1-7&_nc_sid=85a577&_nc_ohc=LyJ0_l6dzw4AX-lrgi_&_nc_ad=z-m&_nc_cid=1225&_nc_eh=c201384f5ea0b048a3f72f81853832bb&_nc_rml=0&_nc_ht=z-m-scontent.fcgk9-2.fna&oh=00_AfD9l7xxzeBftPtrLm-_dDDRlAkOIvSMJhBDIHFHW29-ZQ&oe=64B5660C"
                />

                {/* User profile details */}
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.role}
                  </Text>
                </VStack>

                {/* Dropdown icon */}
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>

            {/* Dropdown menu options */}
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {/* <MenuItem>Profile</MenuItem> */}
              <MenuItem onClick={(e) => handleLogout(e)}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
