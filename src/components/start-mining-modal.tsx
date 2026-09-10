"use client";

import { AlertTriangle, CheckCircle2, Shield } from "lucide-react";
import { useEffect, useState } from "react";

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

interface StartMiningModalProps {
  nftId: number;
  nftName: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: () => void;
  simulateError?: boolean;
}

export function StartMiningModal({
  nftId,
  nftName,
  isOpen,
  setIsOpen,
  onSuccess,
  simulateError = false,
}: StartMiningModalProps) {
  const [status, setStatus] = useState<"verifying" | "success" | "failed">(
    "verifying"
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && status === "verifying") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus(simulateError ? "failed" : "success");
            return 100;
          }
          return prev + 10;
        });
      }, 120);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setStatus(simulateError ? "failed" : "success");
        setProgress(100);
      }, 1400);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isOpen, status, simulateError]);

  const handleClose = () => {
    if (status === "success") {
      onSuccess();
    }
    setIsOpen(false);
    setTimeout(() => {
      setStatus("verifying");
      setProgress(0);
    }, 300);
  };

  const getTitle = () => {
    switch (status) {
      case "verifying":
        return "Подтверждение владения";
      case "success":
        return "Майнинг запущен";
      case "failed":
        return "Ошибка подтверждения";
    }
  };

  const getDescription = () => {
    switch (status) {
      case "verifying":
        return `Demo-проверка владения NFT ${nftName} перед началом майнинга`;
      case "success":
        return `NFT ${nftName} успешно прошел demo-проверку и начал майнинг`;
      case "failed":
        return `Не удалось подтвердить владение NFT ${nftName}. Майнинг не был начат`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {status === "failed" ? (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            ) : (
              <Shield className="h-5 w-5 text-blue-500" />
            )}
            {getTitle()}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {getDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col items-center justify-center">
          {status === "verifying" ? (
            <>
              <div className="relative w-24 h-24 mb-4">
                <div
                  className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"
                  style={{ animationDuration: "1.5s" }}
                ></div>
              </div>
              <p className="text-center text-zinc-300 font-medium mb-1">
                Подтверждение владения NFT
              </p>
              <p className="text-center text-zinc-400 text-sm mb-4">
                Demo API обрабатывает запрос. Пожалуйста, не закрывайте окно.
              </p>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-1000 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center text-zinc-400 text-xs mt-2">
                Проверка mock ownership...
              </p>
            </>
          ) : status === "success" ? (
            <>
              <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <p className="text-center text-green-500 font-medium mb-1">
                Майнинг успешно запущен!
              </p>
              <p className="text-center text-zinc-400 text-sm mb-4">
                Ваш NFT начал майнинг токенов {DEMO_TOKEN_SYMBOL}. Вы можете
                отслеживать прогресс в разделе &quot;Активные&quot;.
              </p>
              <div className="bg-zinc-800/50 p-3 rounded-lg w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">Текущий этап:</span>
                  <span className="text-white">Этап 1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Ожидаемая награда:</span>
                  <span className="text-green-500">
                    100 {DEMO_TOKEN_SYMBOL}
                    {simulateError === false && nftId === 5 && (
                      <span className="text-yellow-500 ml-1">
                        (Ранний NFT x2)
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>
              <p className="text-center text-red-500 font-medium mb-1">
                Ошибка подтверждения
              </p>
              <p className="text-center text-zinc-400 text-sm mb-4">
                Не удалось подтвердить владение NFT. Майнинг не был начат.
              </p>
              <div className="bg-red-900/20 border border-red-900/20 p-3 rounded-lg w-full">
                <div className="text-sm text-red-400">
                  <p className="font-medium mb-1">Возможные причины:</p>
                  <ul className="list-disc list-inside text-xs space-y-1">
                    <li>NFT не найден в demo wallet</li>
                    <li>Mock response вернул ошибку</li>
                    <li>Demo ownership check не прошел</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          {status === "verifying" ? (
            <Button variant="outline" className="w-full" disabled>
              Пожалуйста, подождите...
            </Button>
          ) : status === "success" ? (
            <Button
              variant="default"
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleClose}
            >
              Закрыть
            </Button>
          ) : (
            <Button
              variant="default"
              className="w-full bg-zinc-700 hover:bg-zinc-600"
              onClick={handleClose}
            >
              Понятно
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
