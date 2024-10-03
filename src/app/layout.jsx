'use client'
import localFont from "next/font/local";
import "./globals.css";
import GlobalProvider from "@/context/global";
import SideBar from "@/components/SideBar/SideBar";
import { usePathname } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <GlobalProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextUIProvider>
            <div className="flex flex-row w-full h-full">

              {pathname !== "/" && <SideBar />}

              {children}

            </div>
          </NextUIProvider>
        </body>
      </html>
    </GlobalProvider>
  );
}
