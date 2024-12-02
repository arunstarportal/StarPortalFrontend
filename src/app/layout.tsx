"use client";
import "./globals.css";
import { motion } from "framer-motion";

import { Buffer } from "buffer";

import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/Config/Wagmi";
import Sidebar from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { usePathname } from "next/navigation";

import { store } from "./redux/store";
import { Provider } from "react-redux";

globalThis.Buffer = Buffer;
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSignupRoute = pathname === "/signup";

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}>
              <Provider store={store}>
                <div
                  className={`antialiased flex h-screen ${isSignupRoute ? "" : "overflow-hidden"}`}
                >
                  {!isSignupRoute && <Sidebar />}
                  <main className={`flex-1 ${isSignupRoute ? "" : "p-6"}`}>
                    {!isSignupRoute && <Header />}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={
                        isSignupRoute
                          ? ""
                          : "mt-1 max-h-[90vh] overflow-y-scroll"
                      }
                    >
                      {children}
                    </motion.div>
                  </main>
                </div>
              </Provider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
