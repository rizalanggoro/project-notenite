import ComponentNavbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import { repositorySession } from "@/lib/data/repositories/session";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import StoreProvider from "./store-provider";
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
        <StoreProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ComponentNavbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
