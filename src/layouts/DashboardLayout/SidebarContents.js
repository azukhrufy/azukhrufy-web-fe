import {
    Box,
    CloseButton,
    Flex,
    useColorModeValue,
    Text
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
  import NavItem from "./NavItem.js";
  import Logo from "@/components/Logo";
  
  /**
   * SidebarContent component renders the sidebar with navigation links and event menu.
   *
   * @component
   * @param {Object} props - The component props.
   * @param {function} props.onClose - Function to handle the close action.
   * @param {Array} props.linkItems - Array of link items for the dashboard menu.
   * @param {Array} props.eventMenu - Array of link items for the event menu.
   * @param {Object} props.rest - Additional props to be passed to the Box component.
   * @returns {JSX.Element} The rendered SidebarContent component.
   */
  export default function SidebarContents({
    onClose,
    linkItems,
    ...rest
  }) {
    const router = useRouter();
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        zIndex={50}
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Logo />
  
          <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
        </Flex>
        <Box>
          <Text
            px={4}
            pt={3}
            pb={2}
            fontWeight="semibold"
            fontSize="sm"
            color="purple.500"
          >
            Menu Dashboard
          </Text>
          
          {linkItems?.map((link, index) => (
            <NavItem
              key={index}
              icon={link.icon}
              active={router.asPath === link.link}
              href={link.link}
              submenu={link.submenu}
            >
              {link.name}
            </NavItem>
          ))}
        </Box>
      </Box>
    );
  }
  