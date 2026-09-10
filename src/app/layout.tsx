import "./global.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppProviders } from "@/components/app-providers";
import { DEMO_APP_NAME } from "@/lib/demo-api";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: `${DEMO_APP_NAME} - Web3 Mini App`,
  description: "Portfolio showcase Telegram Mini App with TON Connect wallet flows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
