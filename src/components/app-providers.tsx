"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { DemoToaster } from "@/components/demo-toaster";
import { ThemeProvider } from "@/components/theme-provider";

const FALLBACK_MANIFEST_URL =
  "https://telegram-wallet-demo.example.com/tonconnect-manifest.json";

function getManifestUrl(): string {
  if (process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST_URL) {
    return process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST_URL;
  }

  if (typeof window !== "undefined") {
    return `${window.location.origin}/tonconnect-manifest.json`;
  }

  return FALLBACK_MANIFEST_URL;
}

export function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <TonConnectUIProvider manifestUrl={getManifestUrl()}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <DemoToaster />
      </ThemeProvider>
    </TonConnectUIProvider>
  );
}
