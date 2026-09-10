"use client";

import { Award, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { demoMiningStats } from "@/lib/demo-api";

export function EarlyMinerStats() {
  const [stats, setStats] = useState(demoMiningStats);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        earlyMiners: Math.min(prev.earlyMiners + 1, prev.maxEarlyMiners),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const earlyMinerPercentage = (stats.earlyMiners / stats.maxEarlyMiners) * 100;
  const earlyMinerText = `${stats.earlyMiners} из ${stats.maxEarlyMiners}`;

  return (
    <Card className="bg-zinc-800/50 border-zinc-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-yellow-500" />
          Программа ранних участников
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Заполнено мест:</span>
            <span>{earlyMinerText}</span>
          </div>
          <Progress value={earlyMinerPercentage} className="h-2" />
        </div>

        <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-lg">
          <Users className="h-4 w-4 text-zinc-400" />
          <div>
            <div className="text-sm font-medium">
              Активных участников: {stats.activeMiners}
            </div>
            <div className="text-xs text-zinc-400">
              Из них ранних: {stats.earlyMiners}
            </div>
          </div>
        </div>

        <div className="text-xs text-zinc-400">
          <p>
            <strong>Первые {stats.maxEarlyMiners} пользователей</strong>{" "}
            получают удвоенное вознаграждение и бонусы. Статус привязан к
            demo-адресу кошелька.
          </p>
          <p className="mt-1">
            Если места не будут заполнены, оставшиеся токены будут отправлены в
            demo staking pool.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
