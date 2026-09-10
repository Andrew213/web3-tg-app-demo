"use client";

import { Award, CheckCircle2, Coins, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DEMO_TOKEN_SYMBOL } from "@/lib/demo-api";

interface ClaimRewardModalProps {
  nftId: number;
  nftName: string;
  reward: number;
  cycle: number;
  totalCycles: number;
  isLastCycle: boolean;
  isEarlyMiner: boolean;
  onClaim: (id: number, continueNextCycle: boolean) => void | Promise<void>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function ClaimRewardModal({
  nftId,
  nftName,
  reward,
  cycle,
  totalCycles,
  isLastCycle,
  isEarlyMiner,
  onClaim,
  isOpen,
  setIsOpen,
}: ClaimRewardModalProps) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const actualReward = isEarlyMiner ? reward * 2 : reward;

  const handleClaim = (continueNextCycle: boolean) => {
    setIsClaiming(true);

    setTimeout(() => {
      setIsClaiming(false);
      setIsSuccess(true);

      setTimeout(() => {
        void onClaim(nftId, continueNextCycle);
        setIsSuccess(false);
        setIsOpen(false);
      }, 1200);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Coins className="h-5 w-5 text-green-500" />
            Получение награды
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isLastCycle
              ? `Поздравляем! Вы завершили последний цикл майнинга для NFT ${nftName}.`
              : `Вы завершили цикл ${cycle} из ${totalCycles} для NFT ${nftName}.`}
          </DialogDescription>
        </DialogHeader>

        {isClaiming ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-20 h-20 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-zinc-700 opacity-25"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
              <Loader2 className="absolute inset-0 m-auto h-10 w-10 text-green-500" />
            </div>
            <p className="text-center text-zinc-400">Получение награды...</p>
          </div>
        ) : isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <p className="text-center text-green-500 font-medium">
              Награда получена!
            </p>
            <p className="text-center text-zinc-400 mt-2">
              {actualReward} {DEMO_TOKEN_SYMBOL} отправлено на ваш кошелек
            </p>
          </div>
        ) : (
          <>
            <div className="py-4">
              <div className="bg-zinc-800 rounded-lg p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <Coins className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-500">
                  {actualReward} {DEMO_TOKEN_SYMBOL}
                  {isEarlyMiner && (
                    <span className="text-sm text-yellow-500 ml-2 flex items-center justify-center mt-1">
                      <Award className="h-4 w-4 mr-1" />
                      Бонус раннего участника x2
                    </span>
                  )}
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                  Ваша награда за цикл {cycle}
                </p>
              </div>

              {!isLastCycle && (
                <p className="text-sm text-zinc-400 mt-4">
                  После получения награды вы можете продолжить майнинг и перейти
                  к следующему циклу или выйти из программы.
                </p>
              )}

              {isLastCycle && (
                <p className="text-sm text-zinc-400 mt-4">
                  Вы завершили все циклы майнинга для этого NFT. После получения
                  награды программа майнинга будет завершена.
                </p>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {!isLastCycle && (
                <>
                  <Button
                    variant="outline"
                    className="sm:flex-1 bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300"
                    onClick={() => handleClaim(false)}
                  >
                    Получить и выйти
                  </Button>
                  <Button
                    variant="default"
                    className="sm:flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleClaim(true)}
                  >
                    Получить и продолжить
                  </Button>
                </>
              )}

              {isLastCycle && (
                <Button
                  variant="default"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleClaim(false)}
                >
                  Получить награду
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
