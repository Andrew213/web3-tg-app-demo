import type { MiningStats, Nft } from "./mining-types";

export const DEMO_APP_NAME = "Telegram Wallet Demo";
export const DEMO_TOKEN_NAME = "Demo Token";
export const DEMO_TOKEN_SYMBOL = "DEMO";
export const DEMO_COLLECTION_NAME = "Demo Genesis";
export const DEMO_CONTRACT_ID = "demo-contract-preview";
export const DEMO_TRANSFER_ADDRESS = "demo-recipient-wallet";

const DEMO_DELAY_MS = 700;

export const demoProjectStats = {
  totalMiners: 1247,
  activeNfts: 3689,
  totalMined: 45678000,
};

export const demoMiningStats: MiningStats = {
  totalNfts: 1000,
  activeMiners: 124,
  earlyMiners: 78,
  maxEarlyMiners: 100,
  totalMined: 45678,
  stakingPool: 12345,
};


export const demoNfts: Nft[] = [
  {
    id: 1,
    name: "Demo NFT #001",
    image: "/celestial-flow.png",
    verified: true,
    mining: true,
    collection: DEMO_COLLECTION_NAME,
    cycle: 1,
    totalCycles: 4,
    stage: 2,
    stageProgress: 45,
    daysRemaining: 18,
    totalDays: 30,
    status: "mining",
    tokensEarned: 45,
    totalTokens: 100,
    totalRewardsReceived: 0,
  },
  {
    id: 2,
    name: "Demo NFT #042",
    image: "/verdant-aurora.png",
    verified: true,
    mining: true,
    collection: DEMO_COLLECTION_NAME,
    cycle: 3,
    totalCycles: 4,
    stage: 3,
    stageProgress: 100,
    daysRemaining: 0,
    totalDays: 90,
    status: "completed",
    tokensEarned: 500,
    totalTokens: 500,
    totalRewardsReceived: 350,
  },
  {
    id: 3,
    name: "Demo NFT #107",
    image: "/fiery-flow.png",
    verified: false,
    mining: false,
    collection: DEMO_COLLECTION_NAME,
    cycle: 0,
    totalCycles: 4,
    stage: 0,
    stageProgress: 0,
    daysRemaining: 0,
    totalDays: 0,
    status: "not_mining",
    tokensEarned: 0,
    totalTokens: 0,
    totalRewardsReceived: 0,
  },
  {
    id: 4,
    name: "Demo NFT #255",
    image: "/amethyst-bloom.png",
    verified: true,
    mining: false,
    collection: DEMO_COLLECTION_NAME,
    cycle: 4,
    totalCycles: 4,
    stage: 4,
    stageProgress: 100,
    daysRemaining: 0,
    totalDays: 0,
    status: "program_completed",
    tokensEarned: 0,
    totalTokens: 0,
    totalRewardsReceived: 3850,
  },
  {
    id: 5,
    name: "Demo NFT #128",
    image: "/celestial-flow.png",
    verified: true,
    mining: false,
    collection: DEMO_COLLECTION_NAME,
    cycle: 0,
    totalCycles: 4,
    stage: 0,
    stageProgress: 0,
    daysRemaining: 0,
    totalDays: 0,
    status: "not_mining",
    tokensEarned: 0,
    totalTokens: 100,
    totalRewardsReceived: 0,
  },
];

export const availableDemoNfts = [
  {
    id: 101,
    name: "Demo NFT #101",
    image: "/celestial-flow.png",
    collection: DEMO_COLLECTION_NAME,
    isEarly: true,
  },
  {
    id: 102,
    name: "Demo NFT #102",
    image: "/verdant-aurora.png",
    collection: DEMO_COLLECTION_NAME,
    isEarly: true,
  },
  {
    id: 103,
    name: "Demo NFT #103",
    image: "/fiery-flow.png",
    collection: DEMO_COLLECTION_NAME,
    isEarly: false,
  },
  {
    id: 104,
    name: "Demo NFT #104",
    image: "/amethyst-bloom.png",
    collection: DEMO_COLLECTION_NAME,
    isEarly: false,
  },
];

export async function delayDemoResponse(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, DEMO_DELAY_MS));
}


export async function getEarlyMinerStatus(): Promise<boolean> {
  await delayDemoResponse();
  return true;
}

export async function verifyDemoNft(): Promise<{ verified: true }> {
  await delayDemoResponse();
  return { verified: true };
}

export async function startDemoMining(): Promise<Partial<Nft>> {
  await delayDemoResponse();
  return {
    mining: true,
    verified: true,
    status: "mining",
    cycle: 1,
    stage: 1,
    stageProgress: 0,
    daysRemaining: 30,
    totalDays: 30,
    totalTokens: 100,
  };
}

export async function claimDemoReward(): Promise<{ success: true }> {
  await delayDemoResponse();
  return { success: true };
}

export async function exitDemoMining(): Promise<{ success: true }> {
  await delayDemoResponse();
  return { success: true };
}

export async function transferDemoNft(): Promise<{ recipient: string }> {
  await delayDemoResponse();
  return { recipient: DEMO_TRANSFER_ADDRESS };
}

export async function purchaseDemoNft(): Promise<{ success: true }> {
  await delayDemoResponse();
  return { success: true };
}

