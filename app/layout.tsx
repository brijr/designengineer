import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const metadata: Metadata = {
  title: "designengineer.fyi / Resources for Design Engineers",
  description:
    "A collection of learning resources, tools, and guides for design engineers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        ...
      </body>
    </html>
  );
}
