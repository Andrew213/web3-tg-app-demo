import { Clock } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { DEMO_TOKEN_SYMBOL } from "@/lib/demo-api";
import { Nft } from "@/lib/mining-types";

type PendingAction = "verify" | "exit" | "transfer";

interface NftCardProps {
  nft: Nft;
  isSelected: boolean;
  isEarlyMiner: boolean;
  pendingAction?: PendingAction;
  onSelect: () => void;
  onStartMining: (id: number) => void;
  onVerify: (id: number) => void;
  onTransfer: (id: number, address: string) => void;
  onClaimReward: (id: number) => void;
  onExitMining: (id: number) => void;
}

export default function NftCard({
  nft,
  isSelected,
  isEarlyMiner,
  pendingAction,
  onSelect,
  onStartMining,
  onVerify,
  onTransfer,
  onClaimReward,
  onExitMining,
}: NftCardProps) {
  const actualReward = isEarlyMiner ? nft.totalTokens * 2 : nft.totalTokens;
  const actualTokensEarned = isEarlyMiner
    ? nft.tokensEarned * 2
    : nft.tokensEarned;

  const getCardBgColor = () => {
    switch (nft.status) {
      case "mining":
        return "bg-gradient-to-b from-blue-950 to-blue-900";
      case "completed":
        return "bg-gradient-to-b from-green-950 to-green-900";
      case "program_completed":
        return "bg-gradient-to-b from-purple-950 to-purple-900";
      default:
        return "bg-gradient-to-b from-zinc-900 to-zinc-800";
    }
  };

  const getStatusBadge = () => {
    if (nft.status === "mining") {
      return (
        <div className="absolute top-2 left-2 bg-blue-500/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] text-blue-300 font-medium">
          Майнинг
        </div>
      );
    }
    if (nft.status === "completed") {
      return (
        <div className="absolute top-2 left-2 bg-green-500/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] text-green-300 font-medium">
          Завершено
        </div>
      );
    }
    if (nft.status === "program_completed") {
      return (
        <div className="absolute top-2 left-2 bg-purple-500/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] text-purple-300 font-medium">
          Программа завершена
        </div>
      );
    }
    return null;
  };

  const getEarlyBadge = () => {
    if (isEarlyMiner) {
      return (
        <div className="absolute top-2 right-2 bg-yellow-500/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] text-yellow-300 font-medium">
          Ранний NFT
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl transition-all duration-200 ${getCardBgColor()} ${
        isSelected ? "ring-2 ring-green-500" : ""
      }`}
      onClick={onSelect}
    >
      {getStatusBadge()}
      {getEarlyBadge()}

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

      <div className="p-3 flex flex-col flex-grow justify-between">
        <div className="mb-1">
          <h3 className="font-bold text-sm text-white">{nft.name}</h3>
          <p className="text-[10px] text-zinc-400">{nft.collection}</p>
        </div>

        {nft.status === "mining" && (
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center text-[10px] text-zinc-400">
              <span>
                Цикл {nft.cycle}/{nft.totalCycles}
              </span>
              <span className="flex items-center">
                <Clock className="h-2.5 w-2.5 mr-0.5" />
                {nft.daysRemaining} дней
              </span>
            </div>

            <div className="w-full bg-zinc-800/50 h-1 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${nft.stageProgress}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-zinc-400">
              <span>Награда:</span>
              <span className="text-green-400">
                {actualTokensEarned}/{actualReward}
              </span>
            </div>
          </div>
        )}

        {nft.status === "completed" && (
          <div className="mt-2 space-y-2">
            <div className="text-[10px] text-green-400 text-center font-medium">
              Цикл {nft.cycle} завершен!
            </div>
            <div className="text-[10px] text-green-400 text-center">
              Награда: {actualReward} {DEMO_TOKEN_SYMBOL}
            </div>
          </div>
        )}

        {nft.status === "program_completed" && (
          <div className="mt-2 space-y-2">
            <div className="text-[10px] text-purple-400 text-center font-medium">
              Программа завершена
            </div>
            <div className="text-[10px] text-zinc-400 text-center">
              Всего получено: {nft.totalRewardsReceived} {DEMO_TOKEN_SYMBOL}
            </div>
          </div>
        )}

        <div className="mt-3 grid gap-2">
          {!nft.verified ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full text-[10px] h-6 bg-zinc-800 border-zinc-700"
              onClick={() => onVerify(nft.id)}
              disabled={pendingAction === "verify"}
            >
              {pendingAction === "verify" ? "Проверка..." : "Верифицировать"}
            </Button>
          ) : nft.status === "not_mining" ? (
            <Button
              variant="default"
              size="sm"
              className="w-full text-[10px] h-6"
              onClick={() => onStartMining(nft.id)}
            >
              Начать майнинг
            </Button>
          ) : nft.status === "completed" ? (
            <Button
              variant="default"
              size="sm"
              className="w-full text-[10px] h-6 bg-green-600 hover:bg-green-700"
              onClick={() => onClaimReward(nft.id)}
            >
              Получить награду
            </Button>
          ) : nft.status === "program_completed" ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full text-[10px] h-6 bg-zinc-800 border-zinc-700"
              disabled
            >
              Программа завершена
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full text-[10px] h-6 bg-zinc-800 border-zinc-700"
              disabled
            >
              В процессе майнинга
            </Button>
          )}

          {isSelected && (
            <>
              {(nft.status === "mining" || nft.status === "completed") && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-[10px] h-6 text-red-400 bg-zinc-800 border-zinc-700 hover:bg-red-900/20"
                  onClick={() => onExitMining(nft.id)}
                  disabled={pendingAction === "exit"}
                >
                  {pendingAction === "exit" ? "Выход..." : "Выйти из программы"}
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="w-full text-[10px] h-6 bg-zinc-800 border-zinc-700"
                onClick={() => onTransfer(nft.id, "demo-recipient-wallet")}
                disabled={pendingAction === "transfer"}
              >
                {pendingAction === "transfer" ? "Передача..." : "Передать NFT"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
