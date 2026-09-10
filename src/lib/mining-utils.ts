import type {
  MiningConfig,
  MiningStage,
  MiningStats,
  NftMiningData,
} from "./mining-types";

// Конфигурация майнинга
export const miningConfig: MiningConfig = {
  earlyMinerMultiplier: 2, // 2x награда для ранних майнеров
  completionBonus: 500, // Бонус за завершение всех циклов
  maxEarlyMinersPercentage: 10, // 10% от общего количества NFT
};

// Начальные стадии майнинга
export const initialStages: MiningStage[] = [
  {
    id: 1,
    name: "Этап 1",
    description: "Начальный этап майнинга",
    reward: 100,
    duration: 30, // 1 месяц
    status: "active",
    progress: 0,
  },
  {
    id: 2,
    name: "Этап 2",
    description: "Промежуточный этап майнинга",
    reward: 250,
    duration: 60, // 2 месяца
    status: "locked",
    progress: 0,
  },
  {
    id: 3,
    name: "Этап 3",
    description: "Продвинутый этап майнинга",
    reward: 500,
    duration: 90, // 3 месяца
    status: "locked",
    progress: 0,
  },
  {
    id: 4,
    name: "Этап 4",
    description: "Финальный этап майнинга",
    reward: 1000,
    duration: 120, // 4 месяца
    status: "locked",
    progress: 0,
  },
];


// Функция для проверки, может ли пользователь стать ранним майнером
export function canBecomeEarlyMiner(stats: MiningStats): boolean {
  return stats.earlyMiners < stats.maxEarlyMiners;
}

// Функция для расчета вознаграждения с учетом статуса раннего майнера
export function calculateReward(
  baseReward: number,
  isEarlyMiner: boolean
): number {
  return isEarlyMiner
    ? baseReward * miningConfig.earlyMinerMultiplier
    : baseReward;
}

// Функция для расчета оставшегося времени стадии в днях
export function calculateRemainingDays(
  startTime: number,
  duration: number
): number {
  const now = Date.now();
  const endTime = startTime + duration * 24 * 60 * 60 * 1000; // Конвертация дней в миллисекунды
  const remainingTime = Math.max(0, endTime - now);
  return Math.ceil(remainingTime / (24 * 60 * 60 * 1000));
}

// Функция для расчета прогресса стадии в процентах
export function calculateStageProgress(
  startTime: number,
  duration: number
): number {
  const now = Date.now();
  const totalDuration = duration * 24 * 60 * 60 * 1000; // Конвертация дней в миллисекунды
  const elapsed = now - startTime;
  const progress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
  return progress;
}

// Функция для проверки завершения стадии
export function isStageCompleted(startTime: number, duration: number): boolean {
  const now = Date.now();
  const endTime = startTime + duration * 24 * 60 * 60 * 1000;
  return now >= endTime;
}

// Функция для обновления статуса стадий майнинга
export function updateMiningStages(nftData: NftMiningData): NftMiningData {
  const updatedStages = [...nftData.stages];
  const currentStage = updatedStages.find(
    (stage) => stage.id === nftData.currentStage
  );

  if (currentStage) {
    // Обновляем прогресс текущей стадии
    currentStage.progress = calculateStageProgress(
      nftData.stageStartTime,
      currentStage.duration
    );

    // Проверяем, завершена ли текущая стадия
    if (isStageCompleted(nftData.stageStartTime, currentStage.duration)) {
      currentStage.status = "completed";

      // Если это не последняя стадия, активируем следующую
      if (nftData.currentStage < 4) {
        const nextStage = updatedStages.find(
          (stage) => stage.id === nftData.currentStage + 1
        );
        if (nextStage) {
          nextStage.status = "active";
          return {
            ...nftData,
            currentStage: nftData.currentStage + 1,
            stageStartTime: Date.now(),
            lastCheckpoint: nftData.currentStage,
            stages: updatedStages,
            totalEarned:
              nftData.totalEarned +
              calculateReward(currentStage.reward, nftData.isEarlyMiner),
          };
        }
      } else {
        // Если это последняя стадия, завершаем цикл и начисляем бонус
        return {
          ...nftData,
          currentStage: 1, // Сбрасываем на первую стадию для нового цикла
          stageStartTime: Date.now(),
          lastCheckpoint: 0,
          stages: initialStages.map((stage) => ({
            ...stage,
            status: stage.id === 1 ? "active" : "locked",
            progress: 0,
          })),
          totalEarned:
            nftData.totalEarned +
            calculateReward(currentStage.reward, nftData.isEarlyMiner) +
            calculateReward(miningConfig.completionBonus, nftData.isEarlyMiner),
          completedCycles: nftData.completedCycles + 1,
        };
      }
    }
  }

  return {
    ...nftData,
    stages: updatedStages,
  };
}

// Функция для создания новых данных майнинга для NFT
export function createNewMiningData(
  tokenId: number,
  owner: string,
  isEarlyMiner: boolean
): NftMiningData {
  return {
    tokenId,
    owner,
    isEarlyMiner,
    currentStage: 1,
    stageStartTime: Date.now(),
    lastCheckpoint: 0,
    stages: initialStages,
    totalEarned: 0,
    completedCycles: 0,
  };
}

// Функция для обработки передачи NFT новому владельцу
export function handleNftTransfer(
  nftData: NftMiningData,
  newOwner: string
): NftMiningData {
  // Если текущая стадия активна, но не завершена, сбрасываем прогресс до последней контрольной точки
  if (nftData.currentStage > nftData.lastCheckpoint + 1) {
    // Возвращаемся к последней контрольной точке
    const updatedStages: MiningStage[] = initialStages.map((stage) => {
      if (stage.id <= nftData.lastCheckpoint) {
        return { ...stage, status: "completed", progress: 100 };
      } else if (stage.id === nftData.lastCheckpoint + 1) {
        return { ...stage, status: "active", progress: 0 };
      } else {
        return { ...stage, status: "locked", progress: 0 };
      }
    });

    return {
      ...nftData,
      owner: newOwner,
      currentStage: nftData.lastCheckpoint + 1,
      stageStartTime: Date.now(),
      stages: updatedStages,
    };
  }

  // Если мы находимся на первой стадии или точно на контрольной точке, просто меняем владельца
  return {
    ...nftData,
    owner: newOwner,
  };
}

// Функция для расчета распределения токенов для стейкинг-пула
export function calculateStakingPoolTokens(stats: MiningStats): number {
  const unusedEarlyMinerSlots = stats.maxEarlyMiners - stats.earlyMiners;
  const unusedRewardPercentage = unusedEarlyMinerSlots / stats.maxEarlyMiners;

  // Предполагаем, что у нас есть какой-то базовый пул токенов для ранних майнеров
  const earlyMinerPoolSize = 1000000; // Пример значения
  const tokensToStakingPool = earlyMinerPoolSize * unusedRewardPercentage;

  return tokensToStakingPool;
}

