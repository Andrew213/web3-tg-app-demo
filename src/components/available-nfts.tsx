"use client";

import { Info, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  availableDemoNfts,
  DEMO_COLLECTION_NAME,
  DEMO_TOKEN_SYMBOL,
  purchaseDemoNft,
} from "@/lib/demo-api";

export function AvailableNfts() {
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseNftId, setPurchaseNftId] = useState<number | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handleNftClick = (nftId: number) => {
    setPurchaseNftId(nftId);
    setIsPurchaseModalOpen(true);
  };

  const handleDemoPurchase = async () => {
    if (!purchaseNftId) return;

    setIsPurchasing(true);
    await purchaseDemoNft();
    setIsPurchasing(false);
    setIsPurchaseModalOpen(false);
    toast.success(`Demo NFT #${purchaseNftId} added to local showcase flow`);
  };

  return (
    <div className="space-y-4">
      <div className="bg-zinc-800/50 rounded-lg p-3 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-zinc-300">
          <p>
            Здесь представлены NFT, доступные для покупки и участия в demo
            mining flow. Приобретите NFT, чтобы начать майнинг токенов{" "}
            {DEMO_TOKEN_SYMBOL}.
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Первые 100 NFT из коллекции имеют статус &quot;ранних&quot; и
            приносят удвоенное вознаграждение за майнинг.
          </p>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="all">Все NFT</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availableDemoNfts.map((nft) => (
              <AvailableNftCard
                key={nft.id}
                nft={nft}
                isSelected={selectedNft === nft.id}
                onSelect={() =>
                  setSelectedNft(nft.id === selectedNft ? null : nft.id)
                }
                onNftClick={handleNftClick}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">Demo NFT purchase</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Локальный сценарий покупки NFT #{purchaseNftId} для участия в
              майнинге
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-sm">Шаг 1: Demo marketplace</h3>
              <p className="text-xs text-zinc-400">
                В showcase-версии marketplace заменен локальным mock response.
              </p>
            </div>

            <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-sm">
                Шаг 2: Коллекция {DEMO_COLLECTION_NAME}
              </h3>
              <p className="text-xs text-zinc-400">
                Выбранный NFT будет добавлен в локальный demo flow без внешних
                запросов.
              </p>
            </div>

            <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-sm">Шаг 3: Подтверждение</h3>
              <p className="text-xs text-zinc-400">
                После короткой задержки приложение покажет успешный результат.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="w-full"
              onClick={handleDemoPurchase}
              disabled={isPurchasing}
            >
              {isPurchasing ? "Покупка..." : "Запустить demo purchase"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface AvailableNftCardProps {
  nft: {
    id: number;
    name: string;
    image: string;
    collection: string;
    isEarly: boolean;
  };
  isSelected: boolean;
  onSelect: () => void;
  onNftClick: (id: number) => void;
}

function AvailableNftCard({
  nft,
  isSelected,
  onSelect,
  onNftClick,
}: AvailableNftCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl transition-all duration-200 bg-gradient-to-b from-zinc-900 to-zinc-800 ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onSelect}
    >
      {nft.isEarly && (
        <div className="absolute top-2 right-2 bg-yellow-500/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] text-yellow-300 font-medium">
          Ранний NFT
        </div>
      )}

      <div className="aspect-square w-full overflow-hidden">
        <Image
          width="0"
          height="0"
          sizes="100%"
          src={nft.image || "/placeholder.svg"}
          alt={nft.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-3">
        <div className="mb-1">
          <h3 className="font-bold text-sm text-white">{nft.name}</h3>
          <p className="text-[10px] text-zinc-400">{nft.collection}</p>
        </div>

        <div className="mt-3">
          <Button
            variant="default"
            size="sm"
            className="w-full text-[10px] h-6 bg-green-600 hover:bg-green-700"
            onClick={() => onNftClick(nft.id)}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Приобрести NFT
          </Button>
        </div>
      </div>
    </div>
  );
}
