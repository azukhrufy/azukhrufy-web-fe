import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

/**
 * NavItem component renders a navigation item which can be a link or an accordion with submenus.
 *
 * @param {Object} props - The properties object.
 * @param {React.ElementType} [props.icon] - The icon component to be displayed.
 * @param {React.ReactNode} props.children - The content to be displayed inside the navigation item.
 * @param {boolean} [props.active] - Indicates if the navigation item is active.
 * @param {string} [props.href] - The URL to navigate to when the item is clicked.
 * @param {Array} [props.submenu] - An array of submenu items, each containing `name` and `link`.
 * @param {Object} [props.rest] - Additional properties to be passed to the Flex component.
 *
 * @returns {JSX.Element} The rendered navigation item.
 */
const NavItem = ({ icon, children, active, href, submenu, ...rest }) => {
  const router = useRouter();
  return (
    <>
      {submenu ? (
        <Accordion allowMultiple>
          <AccordionItem border={0}>
            <Flex
              align="center"
              mx="4"
              mb="2"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "purple.500",
                color: "white",
              }}
              bg={router.asPath.indexOf(href) > -1 ? "purple.50" : "unset"}
              color={router.asPath.indexOf(href) > -1 ? "purple.500" : "unset"}
              {...rest}
            >
              <AccordionButton p="4">
                {icon && (
                  <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                      color: "white",
                    }}
                    as={icon}
                  />
                )}
                {children}
                <AccordionIcon ml="4" />
              </AccordionButton>
            </Flex>
            {submenu.map((s, index) => (
              <AccordionPanel py={0} key={index}>
                <Link
                  href={s.link ?? "#"}
                  style={{ textDecoration: "none" }}
                  _focus={{ boxShadow: "none" }}
                >
                  <Flex
                    align="center"
                    px="4"
                    py="2"
                    ml="8"
                    mb="2"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                      bg: "purple.500",
                      color: "white",
                    }}
                    bg={router.asPath === s.link ? "purple.50" : "unset"}
                    color={router.asPath === s.link ? "purple.500" : "unset"}
                    {...rest}
                  >
                    <Text fontSize="sm">{s.name}</Text>
                  </Flex>
                </Link>
              </AccordionPanel>
            ))}
          </AccordionItem>
        </Accordion>
      ) : (
        <Link
          href={href ?? "#"}
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "purple.500",
              color: "white",
            }}
            bg={active ? "purple.50" : "unset"}
            color={active ? "purple.500" : "unset"}
            {...rest}
          >
            {icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </Link>
      )}
    </>
  );
};

export default NavItem;
