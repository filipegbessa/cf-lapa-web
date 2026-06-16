"use client";

import Link from "next/link";
import { Card } from "@/components/admin/ui/Card";
import { Check, X } from "lucide-react";
import { formatDate } from "@/utils/date";
import { DashboardWeekDay } from "@/modules/analytics/analytics.types";

function getWeekRange(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  const sunday = new Date(today.setDate(diff + 6));

  const formatMonthDay = (date: Date) => `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;

  return `Semana Atual (${formatMonthDay(monday)} - ${formatMonthDay(sunday)})`;
}

export function WeekGrid({ days }: { days: DashboardWeekDay[] }) {
  return (
    <Card title={getWeekRange()} className="mb-6">
      <div className="grid grid-cols-7 gap-4">
        {days?.map((day) => (
          <Link
            href={
              day.workoutId
                ? `/admin/treinos/${day.workoutId}`
                : `/admin/treinos/novo?date=${day.date}`
            }
            key={day.day}
            className={`
            p-4 rounded-lg border-2 transition-all cursor-pointer text-center
            ${
              day.workoutId
                ? "border-green-500 bg-green-50 hover:bg-green-100"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            }
            `}
          >
            <div className="text-sm font-semibold text-gray-900 capitalize mb-2">
              {day.day}
            </div>
            <div className="text-xs text-gray-500 mb-4">
              {formatDate(day.date, true)}
            </div>
            <div className="flex justify-center">
              {day.workoutId ? (
                <Check className="text-green-500" size={24} />
              ) : (
                <X className="text-gray-400" size={24} />
              )}
            </div>
            {/* {day.title && (
                <div className="text-xs text-gray-600 mt-2 truncate">
                  {day.title}
                </div>
              )} */}
          </Link>
        ))}
      </div>
    </Card>
  );
}
