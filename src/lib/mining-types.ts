// Типы данных для майнинга

export interface MiningStage {
  id: number;
  name: string;
  description: string;
  reward: number;
  duration: number; // в днях
  status: "locked" | "active" | "completed" | "failed";
  progress: number;
}

export interface NftMiningData {
  tokenId: number;
  owner: string;
  isEarlyMiner: boolean;
  currentStage: number;
  stageStartTime: number;
  lastCheckpoint: number; // Последняя сохраненная точка между стадиями
  stages: MiningStage[];
  totalEarned: number;
  completedCycles: number;
}

export interface MiningStats {
  totalNfts: number;
  activeMiners: number;
  earlyMiners: number;
  maxEarlyMiners: number;
  totalMined: number;
  stakingPool: number;
}

export interface MiningConfig {
  earlyMinerMultiplier: number; // Множитель для ранних майнеров (2x)
  completionBonus: number; // Бонус за завершение всех циклов
  maxEarlyMinersPercentage: number; // Максимальный процент ранних майнеров (10%)
}

export interface Nft {
  id: number;
  name: string;
  image: string;
  verified: boolean;
  mining: boolean;
  collection: string;
  cycle: number;
  totalCycles: number;
  stage: number;
  stageProgress: number;
  daysRemaining: number;
  totalDays: number;
  status: "mining" | "completed" | "not_mining" | "program_completed";
  tokensEarned: number;
  totalTokens: number;
  totalRewardsReceived: number;
}
