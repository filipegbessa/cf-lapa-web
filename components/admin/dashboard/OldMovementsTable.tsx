"use client";

import { Card } from "@/components/admin/ui/Card";
import {
  OldestMovementsDTO,
  TopMovementsDTO,
} from "@/modules/analytics/analytics.types";
import { formatDate } from "@/utils/date";

interface OldMovementsTableProps {
  movements: OldestMovementsDTO[];
}

export function getDaysWithoutUse(lastUsed?: string | Date): number {
  if (!lastUsed) {
    return 0;
  }

  const lastUsedDate = new Date(lastUsed);
  const today = new Date();

  // Zera horário para comparar apenas datas
  lastUsedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - lastUsedDate.getTime();

  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function OldMovementsTable({ movements }: OldMovementsTableProps) {
  return (
    <Card title="Movimentos Mais Antigos" className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900">
                Movimento
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900">
                Último Uso
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900">
                Dias Sem Usar
              </th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr
                key={movement.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-sm text-gray-900">
                  {movement.name}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {movement.lastUsed ? formatDate(movement.lastUsed) : "Nunca"}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {getDaysWithoutUse(movement.lastUsed)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
