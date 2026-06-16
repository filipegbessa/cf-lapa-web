'use client';

import { Card } from '@/components/admin/ui/Card';
import { Badge } from '@/components/admin/ui/Badge';
import { TopWorkoutTypesDTO } from '@/modules/analytics/analytics.types';
import { WorkoutSectionType } from '@/modules/workouts/workout.types';

interface TopTypesTableProps {
  types: TopWorkoutTypesDTO[];
}

const typeBadgeMap: Record<WorkoutSectionType, string> = {
  AMRAP: 'amrap',
  EMOM: 'emom',
  FOR_TIME: 'for-time',
  TABATA: 'tabata',
};

export function TopTypesTable({ types }: TopTypesTableProps) {
  const maxCount = Math.max(...types.map(t => t.count));

  return (
    <Card title="Top Tipos WOD" className="h-full">
      <div className="space-y-4">
        {types.map((type) => (
          <div key={type.type}>
            <div className="flex items-center justify-between mb-2 gap-4">
              <Badge type={typeBadgeMap[type.type]}>{type.type}</Badge>
              <span className="text-sm font-semibold text-gray-900">{type.count}x</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all"
                style={{ width: `${(type.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
