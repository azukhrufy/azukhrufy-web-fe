import { extendTheme } from "@chakra-ui/react";

/**
 * Central Chakra UI theme. Keeps the existing purple brand color but
 * centralizes typography, container width, and a couple of component
 * defaults so pages stop hardcoding the same values everywhere.
 */
const theme = extendTheme({
  fonts: {
    heading: "var(--font-poppins), sans-serif",
    body: "var(--font-poppins), sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.800",
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "7xl",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "semibold",
      },
    },
  },
});

export default theme;
