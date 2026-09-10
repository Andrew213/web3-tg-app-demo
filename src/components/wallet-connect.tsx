import { Coins, Layers, Users, Wallet } from "lucide-react";
import { SetStateAction } from "react";

import { ConnectWallet } from "@/components/connect-wallet";
import { DEMO_TOKEN_SYMBOL, demoProjectStats } from "@/lib/demo-api";

interface Props {
  setIsWalletConnected: React.Dispatch<SetStateAction<boolean>>;
}

export default function WalletConnect({ setIsWalletConnected }: Props) {
  const handleWalletConnect = () => {
    setIsWalletConnected(true);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-md mb-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          Статистика проекта
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-white">
              {demoProjectStats.totalMiners}
            </div>
            <div className="text-xs text-zinc-400">Участников</div>
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-2">
              <Layers className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-lg font-bold text-white">
              {demoProjectStats.activeNfts}
            </div>
            <div className="text-xs text-zinc-400">Активных NFT</div>
          </div>

          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-2">
              <Coins className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="text-lg font-bold text-white">
              {(demoProjectStats.totalMined / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-zinc-400">{DEMO_TOKEN_SYMBOL}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-zinc-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Wallet className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">Подключите кошелек</h2>
        <p className="text-zinc-400 mb-6">
          Для доступа к demo Web3-сценариям и просмотра ваших NFT подключите
          локальный demo-кошелек
        </p>
        <ConnectWallet onConnect={handleWalletConnect} />
      </div>
    </div>
  );
}

