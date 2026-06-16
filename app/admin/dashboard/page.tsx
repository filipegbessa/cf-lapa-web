"use client";

import { WelcomeCard } from "@/components/admin/dashboard/WelcomeCard";
import { WeekGrid } from "@/components/admin/dashboard/WeekGrid";
import { TopMovementsTable } from "@/components/admin/dashboard/TopMovementsTable";
import { TopTypesTable } from "@/components/admin/dashboard/TopTypesTable";
import { OldMovementsTable } from "@/components/admin/dashboard/OldMovementsTable";
import { DashboardDTO } from "@/modules/analytics/analytics.types";
import { analyticsService } from "@/services/analytics.service";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/admin/ui/Button";

function getWeekDates(offset = 0) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff + offset * 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    monday,
    sunday,
    startDate: monday.toISOString().split('T')[0],
    endDate: sunday.toISOString().split('T')[0],
  };
}

function formatWeekRange(monday: Date, sunday: Date) {
  const formatDate = (date: Date) =>
    `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;
  return `${formatDate(monday)} - ${formatDate(sunday)}`;
}

export default function DashboardPage() {
  const [results, setResults] = useState<DashboardDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  const currentWeek = getWeekDates(weekOffset);

  const getDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const response = await analyticsService.getDashboard({
        startDate: currentWeek.startDate,
        endDate: currentWeek.endDate,
      });
      setResults(response);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar dados da semana");
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, [currentWeek.startDate, currentWeek.endDate]);

  useEffect(() => {
    getDashboard();
  }, [getDashboard]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E63946]" />
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error || "Erro ao carregar dados"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com navegação de semanas */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">
            Semana de {formatWeekRange(currentWeek.monday, currentWeek.sunday)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setWeekOffset(weekOffset - 1)}
          >
            <ChevronLeft size={18} />
            Semana Anterior
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setWeekOffset(0)}
            disabled={weekOffset === 0}
          >
            Esta Semana
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setWeekOffset(weekOffset + 1)}
          >
            Próxima Semana
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Welcome Card */}
      <WelcomeCard
        name="Professor"
        workoutsThisWeek={results.week.filter((m) => m.workoutId).length}
      />

      {/* Week Grid */}
      <WeekGrid days={results.week} />

      {/* Top Movements & Types */}
      <div className="grid grid-cols-2 gap-6">
        <TopMovementsTable movements={results.topMovements} />
        <TopTypesTable types={results.topWorkoutTypes} />
      </div>

      {/* Old Movements */}
      <OldMovementsTable movements={results.oldestMovements} />
    </div>
  );
}
