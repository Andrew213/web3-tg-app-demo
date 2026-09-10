"use client";

const tokenomicsData = [
  { name: "Майнинг", percentage: 76.9, color: "bg-green-500" },
  { name: "Первые участники", percentage: 7.7, color: "bg-yellow-500" },
  { name: "Стейкинг", percentage: 7.7, color: "bg-blue-500" },
  { name: "Команда demo", percentage: 7.7, color: "bg-purple-500" },
];

export function TokenomicsChart() {
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium mb-2">Распределение токенов</div>

      <div className="flex h-6 w-full overflow-hidden rounded-full">
        {tokenomicsData.map((item, index) => (
          <div
            key={index}
            className={`${item.color} h-full`}
            style={{ width: `${item.percentage}%` }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {tokenomicsData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span>
              {item.name}: {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
