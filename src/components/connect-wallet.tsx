"use client";

import {
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { Copy, ExternalLink, LogOut, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ConnectWallet({ onConnect }: { onConnect?: () => void }) {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const isConnectionRestored = useIsConnectionRestored();
  const [isOpeningModal, setIsOpeningModal] = useState(false);

  useEffect(() => {
    if (address) {
      onConnect?.();
    }
  }, [address, onConnect]);

  const connectWallet = async () => {
    setIsOpeningModal(true);

    try {
      await tonConnectUI.openModal();
    } catch {
      toast.error("Не удалось открыть TON Connect");
    } finally {
      setIsOpeningModal(false);
    }
  };

  const disconnectWallet = async () => {
    await tonConnectUI.disconnect();
    toast.success("TON-кошелек отключен");
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    toast.success("Адрес кошелька скопирован");
  };

  const shortenAddress = (addr: string) => {
    if (addr.length <= 12) return addr;
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 6)}`;
  };

  const openExplorer = () => {
    window.open(`https://tonscan.org/address/${address}`, "_blank", "noopener,noreferrer");
  };

  if (!isConnectionRestored) {
    return (
      <Button variant="outline" className="w-full" disabled>
        Загрузка...
      </Button>
    );
  }

  if (!address) {
    return (
      <Button
        onClick={connectWallet}
        variant="default"
        className="w-full"
        disabled={isOpeningModal}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isOpeningModal ? "Открываем TON Connect..." : "Подключить кошелек"}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          <Wallet className="mr-2 h-4 w-4" />
          {shortenAddress(address)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[220px] bg-zinc-900 border-zinc-800"
      >
        <DropdownMenuLabel className="text-white">
          TON wallet
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem
          onClick={copyAddress}
          className="text-zinc-300 focus:text-white focus:bg-zinc-800"
        >
          <Copy className="mr-2 h-4 w-4" />
          Копировать адрес
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={openExplorer}
          className="text-zinc-300 focus:text-white focus:bg-zinc-800"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Просмотреть в TONScan
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem
          onClick={() => void disconnectWallet()}
          className="text-red-400 focus:text-red-300 focus:bg-zinc-800"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Отключить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



