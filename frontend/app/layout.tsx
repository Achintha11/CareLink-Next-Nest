"use client";

import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

// export const metadata: Metadata = {
//   title: "CareLink",
//   description: "A HealthCare Management System",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider store={store}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
