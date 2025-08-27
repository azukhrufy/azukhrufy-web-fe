import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import "@/styles/main.scss";
import { ChakraProvider } from "@chakra-ui/react";
// swr
import { SWRConfig } from "swr";

const SWRConfigValue = {
  refreshInterval: 0,
  shouldRetryOnError: false,
  revalidateOnFocus: false,
};

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SWRConfig value={SWRConfigValue}>
      <ChakraProvider
        // theme={CHAKRA_THEME}
        // colorModeManager={colorModeManager}
        toastOptions={{ defaultOptions: { position: "top-right" } }}
      >
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </ChakraProvider>
    </SWRConfig>
  );
}
