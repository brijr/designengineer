import "./globals.css";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";

const font = FontSans({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "designengineer.fyi / Resources for Design Engineers",
  description:
    "A collection of learning resources, tools, and guides for design engineers.",
};

export const revalidate = 3600; // revalidate at most every hour

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
