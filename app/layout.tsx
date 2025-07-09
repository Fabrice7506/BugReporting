
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/themeContext";
import HtmlThemeWrapper from "./components/htmlThemeWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapBug",
  description: "Une application qui permet de reporter les bugs",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  return (
    <ClerkProvider  publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""}>
      <ThemeProvider>
        <HtmlThemeWrapper>
          <html lang="en" data-theme='abyss'>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              {children}
              <ToastContainer position="bottom-right" />
            </body>
          </html>
        </HtmlThemeWrapper>
      </ThemeProvider>
    </ClerkProvider>
    
  );
}
