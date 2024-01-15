import ComponentNavbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import { repositorySession } from "@/lib/data/repositories/session";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Notenite",
  description: "Made with love by rizalanggoro in Magelang, 2024",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await repositorySession.read();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ComponentNavbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
