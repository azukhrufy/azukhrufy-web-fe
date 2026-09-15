import { AuthProvider } from "@/contexts/AuthContext";
import { TimezoneProvider } from "@/contexts/TimezoneContext";
import theme from "@/theme";
import "@/styles/globals.css";
import "@/styles/main.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
// swr
import { SWRConfig } from "swr";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const SWRConfigValue = {
  refreshInterval: 0,
  shouldRetryOnError: false,
  revalidateOnFocus: false,
};

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SWRConfig value={SWRConfigValue}>
      <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: "top-right" } }}>
        <AuthProvider>
          <TimezoneProvider>
            <div className={poppins.variable}>
              {getLayout(<Component {...pageProps} />)}
            </div>
          </TimezoneProvider>
        </AuthProvider>
      </ChakraProvider>
    </SWRConfig>
  );
}
