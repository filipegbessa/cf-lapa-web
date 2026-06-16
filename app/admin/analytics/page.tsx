'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/admin/ui/Card';
import { Button } from '@/components/admin/ui/Button';
import { BarChart3, TrendingUp } from 'lucide-react';
import { TopMovementsTable } from '@/components/admin/dashboard/TopMovementsTable';
import { TopTypesTable } from '@/components/admin/dashboard/TopTypesTable';
import { OldMovementsTable } from '@/components/admin/dashboard/OldMovementsTable';
import { DashboardDTO } from '@/modules/analytics/analytics.types';
import { analyticsService } from '@/services/analytics.service';

export default function AnalyticsPage() {
  const [results, setResults] = useState<DashboardDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topMovementsLimit, setTopMovementsLimit] = useState(5);
  const [topTypesLimit, setTopTypesLimit] = useState(4);
  const [oldMovementsLimit, setOldMovementsLimit] = useState(10);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await analyticsService.getDashboard();
      setResults(response);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar dados de analytics');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 text-sm mt-1">
              Análise detalhada de movimentos e treinos
            </p>
          </div>
        </div>

        <Card>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E63946]" />
          </div>
        </Card>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 text-sm mt-1">
              Análise detalhada de movimentos e treinos
            </p>
          </div>
        </div>

        <Card className="bg-red-50 border-red-200">
          <div className="text-center py-8">
            <p className="text-red-700 font-medium">{error || 'Erro ao carregar dados'}</p>
            <Button
              variant="primary"
              size="sm"
              onClick={fetchAnalytics}
              className="mt-4"
            >
              Tentar Novamente
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 size={32} className="text-[#E63946]" />
            Analytics
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Análise detalhada de movimentos e treinos
          </p>
        </div>
        <Button
          variant="secondary"
          size="md"
          onClick={fetchAnalytics}
        >
          Atualizar Dados
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Total de Movimentos</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {results.topMovements.length}
              </p>
            </div>
            <TrendingUp size={32} className="text-blue-500 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Tipos de Workout</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {results.topWorkoutTypes.length}
              </p>
            </div>
            <TrendingUp size={32} className="text-green-500 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium">Treinos Esta Semana</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {results.week.filter((d) => d.workoutId).length}
              </p>
            </div>
            <TrendingUp size={32} className="text-purple-500 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Top Movements & Types */}
      <div className="grid grid-cols-2 gap-6">
        <Card title="🏋️ Top Movimentos" className="h-full">
          <TopMovementsTable movements={results.topMovements.slice(0, topMovementsLimit)} />
          {results.topMovements.length > topMovementsLimit && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setTopMovementsLimit(topMovementsLimit + 5)}
                className="text-sm text-[#E63946] hover:text-red-700 font-medium"
              >
                Ver mais {results.topMovements.length - topMovementsLimit} movimentos →
              </button>
            </div>
          )}
        </Card>

        <Card title="📊 Top Tipos de Workout" className="h-full">
          <TopTypesTable types={results.topWorkoutTypes.slice(0, topTypesLimit)} />
          {results.topWorkoutTypes.length > topTypesLimit && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setTopTypesLimit(topTypesLimit + 4)}
                className="text-sm text-[#E63946] hover:text-red-700 font-medium"
              >
                Ver mais {results.topWorkoutTypes.length - topTypesLimit} tipos →
              </button>
            </div>
          )}
        </Card>
      </div>

      {/* Old Movements */}
      <Card title="🌙 Movimentos Mais Antigos" className="bg-gray-50">
        <div className="text-sm text-gray-600 mb-4">
          Movimentos que não foram usados recentemente. Use-os para diversificar seus treinos!
        </div>
        <OldMovementsTable movements={results.oldestMovements.slice(0, oldMovementsLimit)} />
        {results.oldestMovements.length > oldMovementsLimit && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setOldMovementsLimit(oldMovementsLimit + 10)}
              className="text-sm text-[#E63946] hover:text-red-700 font-medium"
            >
              Ver mais {results.oldestMovements.length - oldMovementsLimit} movimentos →
            </button>
          </div>
        )}
      </Card>

      {/* Insights */}
      <Card title="💡 Insights" className="border-yellow-200 bg-yellow-50">
        <div className="space-y-3 text-sm">
          {results.topMovements.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-lg">📌</span>
              <p className="text-gray-700">
                <strong>{results.topMovements[0].name}</strong> é o movimento mais usado ({results.topMovements[0].count}x)
              </p>
            </div>
          )}

          {results.topWorkoutTypes.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-lg">⚡</span>
              <p className="text-gray-700">
                <strong>{results.topWorkoutTypes[0].type}</strong> é o tipo de workout favorito ({results.topWorkoutTypes[0].count}x)
              </p>
            </div>
          )}

          {results.oldestMovements.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-lg">⏰</span>
              <p className="text-gray-700">
                <strong>{results.oldestMovements[0].name}</strong> não foi usado há muito tempo. Considere incluir nos próximos treinos!
              </p>
            </div>
          )}

          {results.week.filter((d) => !d.workoutId).length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-lg">📅</span>
              <p className="text-gray-700">
                <strong>{results.week.filter((d) => !d.workoutId).length} dias</strong> sem treino esta semana. Que tal adicionar alguns?
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
