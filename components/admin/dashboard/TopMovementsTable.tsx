"use client";

import { Card } from "@/components/admin/ui/Card";
import { TopMovementsDTO } from "@/modules/analytics/analytics.types";

interface TopMovementsTableProps {
  movements: TopMovementsDTO[];
}

export function TopMovementsTable({ movements }: TopMovementsTableProps) {
  const maxCount = Math.max(...movements.map((m) => m.count));

  return (
    <Card title="Top Movimentos" className="h-full">
      <div className="space-y-4">
        {movements.map((movement) => (
          <div key={movement.id}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                {movement.name}
              </span>
              <span className="text-sm font-semibold text-[#E63946]">
                {movement.count}x
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#E63946] h-full rounded-full transition-all"
                style={{ width: `${(movement.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
