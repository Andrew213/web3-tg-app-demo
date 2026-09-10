"use client";

import { useTonAddress } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

import Main from "@/components/main";
import WalletConnect from "@/components/wallet-connect";
import { DEMO_APP_NAME } from "@/lib/demo-api";
import { initTelegramMiniApp } from "@/lib/telegram";

export default function Home() {
  const address = useTonAddress();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    initTelegramMiniApp();
  }, []);

  useEffect(() => {
    setIsWalletConnected(Boolean(address));
  }, [address]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 py-6">
        <header className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-center">
            {DEMO_APP_NAME}
          </h1>
          <p className="text-zinc-400 mt-1 text-center text-sm">
            Демо-кошелек, NFT и Web3-сценарии для Telegram Mini App
          </p>
        </header>
        {isWalletConnected ? (
          <Main />
        ) : (
          <WalletConnect setIsWalletConnected={setIsWalletConnected} />
        )}
      </div>
    </main>
  );
}
