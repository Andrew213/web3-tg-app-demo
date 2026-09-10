"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { AvailableNfts } from "@/components/available-nfts";
import { EarlyMinerStats } from "@/components/early-miner-stats";
import { NftGallery } from "@/components/nft-gallery";
import { TokenomicsChart } from "@/components/tokenomics-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DEMO_CONTRACT_ID,
  DEMO_TOKEN_NAME,
  DEMO_TOKEN_SYMBOL,
} from "@/lib/demo-api";

export default function Main() {
  const [activeTab, setActiveTab] = useState<"my-nfts" | "available">(
    "my-nfts"
  );

  const showDemoContract = () => {
    toast.message("Demo contract", {
      description: "Live contract and explorer links are replaced with mock data.",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <EarlyMinerStats />

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Майнинг Demo Token</CardTitle>
          <CardDescription className="text-zinc-400 text-xs">
            Используйте ваши NFT для demo-майнинга токенов в Web3 Mini App
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <Button
                variant={activeTab === "my-nfts" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("my-nfts")}
              >
                Мои NFT
              </Button>
              <Button
                variant={activeTab === "available" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("available")}
              >
                Доступные NFT
              </Button>
            </div>
          </div>

          {activeTab === "my-nfts" ? <NftGallery /> : <AvailableNfts />}
        </CardContent>
      </Card>

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Информация о токене</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-zinc-400">Название:</span>
              <span className="font-medium">{DEMO_TOKEN_NAME}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Символ:</span>
              <span className="font-medium">{DEMO_TOKEN_SYMBOL}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Общий запас:</span>
              <span className="font-medium">1,000,000,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">В обращении:</span>
              <span className="font-medium">245,678,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Контракт:</span>
              <span className="font-medium text-xs truncate max-w-[180px]">
                {DEMO_CONTRACT_ID}
              </span>
            </div>

            <div className="mt-4">
              <TokenomicsChart />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button variant="outline" className="w-full" onClick={showDemoContract}>
            Показать demo contract
          </Button>
          <Link href="/tokenomics" className="w-full">
            <Button variant="outline" className="w-full">
              Подробнее о токеномике
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
