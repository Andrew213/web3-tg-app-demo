"use client";

import { Award, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ClaimRewardModal } from "@/components/claim-reward-modal";
import NftCard from "@/components/nft-card";
import { StartMiningModal } from "@/components/start-mining-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  claimDemoReward,
  demoNfts,
  exitDemoMining,
  getEarlyMinerStatus,
  startDemoMining,
  transferDemoNft,
  verifyDemoNft,
} from "@/lib/demo-api";
import { Nft } from "@/lib/mining-types";

type PendingAction = "verify" | "exit" | "transfer";

type PendingState = {
  id: number;
  action: PendingAction;
} | null;

export function NftGallery() {
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [nftList, setNftList] = useState<Nft[]>(demoNfts);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimingNftId, setClaimingNftId] = useState<number | null>(null);
  const [isEarlyMiner, setIsEarlyMiner] = useState(false);
  const [startMiningModalOpen, setStartMiningModalOpen] = useState(false);
  const [startMiningNftId, setStartMiningNftId] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [pendingAction, setPendingAction] = useState<PendingState>(null);

  useEffect(() => {
    let isMounted = true;

    const checkEarlyMinerStatus = async () => {
      const result = await getEarlyMinerStatus();
      if (isMounted) {
        setIsEarlyMiner(result);
      }
    };

    void checkEarlyMinerStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStartMining = (nftId: number) => {
    setStartMiningNftId(nftId);
    setStartMiningModalOpen(true);
  };

  const startMining = async (nftId: number) => {
    const miningUpdate = await startDemoMining();

    setNftList((prev) =>
      prev.map((nft) =>
        nft.id === nftId
          ? {
              ...nft,
              ...miningUpdate,
            }
          : nft
      )
    );
    toast.success(`Demo mining started for NFT #${nftId}`);
  };

  const verifyNft = async (nftId: number) => {
    setPendingAction({ id: nftId, action: "verify" });

    try {
      await verifyDemoNft();
      setNftList((prev) =>
        prev.map((nft) =>
          nft.id === nftId ? { ...nft, verified: true } : nft
        )
      );
      toast.success(`NFT #${nftId} verified in demo mode`);
    } finally {
      setPendingAction(null);
    }
  };

  const openClaimModal = (nftId: number) => {
    setClaimingNftId(nftId);
    setClaimModalOpen(true);
  };

  const claimReward = async (nftId: number, continueNextCycle: boolean) => {
    await claimDemoReward();

    setNftList((prev) =>
      prev.map((nft) => {
        if (nft.id === nftId) {
          const isLastCycle = nft.cycle === nft.totalCycles;
          const reward = isEarlyMiner ? nft.totalTokens * 2 : nft.totalTokens;
          const newTotalRewards = nft.totalRewardsReceived + reward;

          if (isLastCycle || !continueNextCycle) {
            return {
              ...nft,
              status: isLastCycle ? "program_completed" : "not_mining",
              mining: false,
              totalRewardsReceived: newTotalRewards,
            };
          }

          return {
            ...nft,
            status: "mining",
            cycle: nft.cycle + 1,
            stage: 1,
            stageProgress: 0,
            daysRemaining: 30,
            totalDays: 30,
            tokensEarned: 0,
            totalRewardsReceived: newTotalRewards,
          };
        }
        return nft;
      })
    );
    toast.success(`Demo reward claimed for NFT #${nftId}`);
  };

  const exitMining = async (nftId: number) => {
    setPendingAction({ id: nftId, action: "exit" });

    try {
      await exitDemoMining();
      setNftList((prev) =>
        prev.map((nft) =>
          nft.id === nftId
            ? {
                ...nft,
                status: "not_mining",
                mining: false,
              }
            : nft
        )
      );
      toast.success(`NFT #${nftId} exited demo mining`);
    } finally {
      setPendingAction(null);
    }
  };

  const handleTransfer = async (nftId: number) => {
    setPendingAction({ id: nftId, action: "transfer" });

    try {
      const response = await transferDemoNft();
      toast.success(`NFT #${nftId} transferred to ${response.recipient}`);
    } finally {
      setPendingAction(null);
    }
  };

  const claimingNft = nftList.find((nft) => nft.id === claimingNftId);
  const startMiningNft = nftList.find((nft) => nft.id === startMiningNftId);

  const getFilteredNfts = () => {
    switch (filter) {
      case "mining":
        return nftList.filter((nft) => nft.status === "mining");
      case "completed":
        return nftList.filter((nft) => nft.status === "program_completed");
      case "claim":
        return nftList.filter((nft) => nft.status === "completed");
      case "inactive":
        return nftList.filter((nft) => nft.status === "not_mining");
      default:
        return nftList;
    }
  };

  const filteredNfts = getFilteredNfts();

  const getFilterName = () => {
    switch (filter) {
      case "mining":
        return "Участвуют в майнинге";
      case "completed":
        return "Завершили все стадии";
      case "claim":
        return "Готовы к Claim";
      case "inactive":
        return "Не участвуют";
      default:
        return "Все NFT";
    }
  };

  const getPendingAction = (nftId: number) => {
    if (pendingAction?.id !== nftId) return undefined;
    return pendingAction.action;
  };

  return (
    <div className="space-y-4">
      {isEarlyMiner && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-center gap-3">
          <Award className="h-5 w-5 text-yellow-500 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm text-yellow-500">
              У вас ранний NFT!
            </h3>
            <p className="text-xs text-zinc-300">
              Ваш NFT имеет статус раннего. Вы получаете удвоенное
              вознаграждение за майнинг с этим NFT.
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Мои NFT</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-4 w-4" />
              {getFilterName()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-zinc-900 border-zinc-800"
          >
            <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
              <DropdownMenuRadioItem
                value="all"
                className="text-zinc-300 focus:text-white focus:bg-zinc-800"
              >
                Все NFT
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="mining"
                className="text-zinc-300 focus:text-white focus:bg-zinc-800"
              >
                Участвуют в майнинге
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="completed"
                className="text-zinc-300 focus:text-white focus:bg-zinc-800"
              >
                Завершили все стадии
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="claim"
                className="text-zinc-300 focus:text-white focus:bg-zinc-800"
              >
                Готовы к Claim
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="inactive"
                className="text-zinc-300 focus:text-white focus:bg-zinc-800"
              >
                Не участвуют
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filteredNfts.length > 0 ? (
          filteredNfts.map((nft) => (
            <NftCard
              key={nft.id}
              nft={nft}
              isSelected={selectedNft === nft.id}
              isEarlyMiner={isEarlyMiner}
              pendingAction={getPendingAction(nft.id)}
              onSelect={() =>
                setSelectedNft(nft.id === selectedNft ? null : nft.id)
              }
              onStartMining={handleStartMining}
              onVerify={(id) => void verifyNft(id)}
              onTransfer={(id) => void handleTransfer(id)}
              onClaimReward={openClaimModal}
              onExitMining={(id) => void exitMining(id)}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-8 bg-zinc-800/30 rounded-lg">
            <p className="text-zinc-400">
              Нет NFT, соответствующих выбранному фильтру
            </p>
          </div>
        )}
      </div>

      {claimingNft && (
        <ClaimRewardModal
          nftId={claimingNft.id}
          nftName={claimingNft.name}
          reward={claimingNft.totalTokens}
          cycle={claimingNft.cycle}
          totalCycles={claimingNft.totalCycles}
          isLastCycle={claimingNft.cycle === claimingNft.totalCycles}
          isEarlyMiner={isEarlyMiner}
          onClaim={claimReward}
          isOpen={claimModalOpen}
          setIsOpen={setClaimModalOpen}
        />
      )}

      {startMiningNft && (
        <StartMiningModal
          nftId={startMiningNft.id}
          nftName={startMiningNft.name}
          isOpen={startMiningModalOpen}
          setIsOpen={setStartMiningModalOpen}
          onSuccess={() => void startMining(startMiningNft.id)}
        />
      )}
    </div>
  );
}
