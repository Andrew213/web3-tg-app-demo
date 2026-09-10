import { ArrowLeft, Award, Coins, Lock, Unlock, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DEMO_TOKEN_NAME, DEMO_TOKEN_SYMBOL } from "@/lib/demo-api";

export default function TokenomicsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Токеномика {DEMO_TOKEN_NAME}
          </h1>
          <p className="text-zinc-400 mt-1">
            Демо-распределение токена для Web3 Mini App showcase
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle>Распределение токенов</CardTitle>
              <CardDescription>
                Общий запас: 1,000,000,000 {DEMO_TOKEN_SYMBOL}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span>Майнинг</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">769,000,000</span>
                    <span className="text-xs text-zinc-400">76.9%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500" />
                    <span>Первые участники</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">77,000,000</span>
                    <span className="text-xs text-zinc-400">7.7%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                    <span>Стейкинг</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">77,000,000</span>
                    <span className="text-xs text-zinc-400">7.7%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500" />
                    <span>Команда demo</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">77,000,000</span>
                    <span className="text-xs text-zinc-400">7.7%</span>
                  </div>
                </div>

                <div className="h-8 w-full overflow-hidden rounded-full mt-4 flex">
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: "76.9%" }}
                  />
                  <div
                    className="bg-yellow-500 h-full"
                    style={{ width: "7.7%" }}
                  />
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: "7.7%" }}
                  />
                  <div
                    className="bg-purple-500 h-full"
                    style={{ width: "7.7%" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle>Механизм разблокировки</CardTitle>
              <CardDescription>
                Как токены поступают в обращение
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg">
                  <Lock className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">Demo supply</h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Вся эмиссия {DEMO_TOKEN_SYMBOL} показана как локальные
                      mock data и не связана с production-контрактом.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg">
                  <Unlock className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">
                      Разблокировка через майнинг
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Основной demo-сценарий разблокировки токенов — майнинг
                      через NFT. Пользователи получают токены за участие в
                      программе майнинга.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg">
                  <Award className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">Первые участники</h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Ранние участники получают удвоенное вознаграждение за
                      майнинг. Количество мест ограничено.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg">
                  <Coins className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">
                      Стейкинг (demo roadmap)
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Showcase оставляет экран будущего стейкинга как часть
                      исходного frontend-сценария.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg">
                  <Users className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">Demo allocation</h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Командная доля разблокируется пропорционально добытым
                      токенам в локальной модели.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-zinc-800/50 border-zinc-700 mb-8">
          <CardHeader>
            <CardTitle>Текущее состояние</CardTitle>
            <CardDescription>Статистика разблокировки токенов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-900/50 p-4 rounded-lg">
                <div className="text-xs text-zinc-400">Добыто майнингом</div>
                <div className="text-xl font-medium mt-1">45,678,000</div>
                <div className="text-xs text-zinc-400 mt-1">
                  5.94% от выделенных
                </div>
              </div>

              <div className="bg-zinc-900/50 p-4 rounded-lg">
                <div className="text-xs text-zinc-400">Первые участники</div>
                <div className="text-xl font-medium mt-1">12,345,000</div>
                <div className="text-xs text-zinc-400 mt-1">
                  16.03% от выделенных
                </div>
              </div>

              <div className="bg-zinc-900/50 p-4 rounded-lg">
                <div className="text-xs text-zinc-400">Стейкинг</div>
                <div className="text-xl font-medium mt-1">0</div>
                <div className="text-xs text-zinc-400 mt-1">Еще не запущен</div>
              </div>

              <div className="bg-zinc-900/50 p-4 rounded-lg">
                <div className="text-xs text-zinc-400">Команда demo</div>
                <div className="text-xl font-medium mt-1">4,567,800</div>
                <div className="text-xs text-zinc-400 mt-1">
                  5.94% от выделенных
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium mb-2">
                Общий прогресс разблокировки
              </div>
              <div className="h-4 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: "6.25%" }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-400 mt-1">
                <span>0%</span>
                <span>6.25% разблокировано</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
