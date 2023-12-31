"use client";
import Providers from "./components/Providers/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};
const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
  config,
});

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ChakraProvider theme={theme}>
            <RecoilRoot>{children}</RecoilRoot>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
