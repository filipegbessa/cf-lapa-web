"use client";

import { Workout } from "@/modules/workouts/workout.types";
import { workoutsService } from "@/services/workouts.service";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import { Card } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { formatDate } from "@/utils/date";

export default function EditTreinoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkout = useCallback(async () => {
    setLoading(true);
    try {
      const response = await workoutsService.getById(id);
      setWorkout(response);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar treino");
      setWorkout(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchWorkout();
  }, [fetchWorkout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E63946]" />
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/treinos">
            <Button variant="secondary" size="sm">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Treino</h1>
        </div>

        <Card className="bg-red-50 border-red-200">
          <p className="text-red-700">{error || "Treino não encontrado"}</p>
        </Card>
      </div>
    );
  }

  const sections = [
    { name: "Warmup", type: workout.warmupType, description: workout.warmupDescription, blocks: workout.warmup },
    { name: "Skill", type: workout.skillType, description: workout.skillDescription, blocks: workout.skill },
    { name: "WOD", type: workout.wodType, description: workout.wodDescription, blocks: workout.wod },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/treinos">
            <Button variant="secondary" size="sm">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {workout.title || "Treino"}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {formatDate(workout.date)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/treinos/${id}/editar`}>
            <Button variant="primary" size="sm">
              <Edit2 size={18} />
              Editar
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm("Deseja deletar este treino?")) {
                // TODO: Implement delete
              }
            }}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      {/* Notes */}
      {workout.notes && (
        <Card title="📝 Observações">
          <div className="text-gray-700 whitespace-pre-wrap">
            {workout.notes}
          </div>
        </Card>
      )}

      {/* Sections */}
      {sections.map((section) => (
        <Card
          key={section.name}
          title={`${section.name}${section.type ? ` - ${section.type}` : ""}`}
        >
          {section.description && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div
                className="text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            </div>
          )}

          {section.blocks && section.blocks.length > 0 ? (
            <div className="space-y-3">
              {section.blocks.map((block) => (
                <div
                  key={block.id}
                  className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {block.movement?.name || block.name || "Bloco sem nome"}
                    </p>
                    <div className="flex gap-4 mt-1 text-sm text-gray-600">
                      {block.reps && <span>Reps: {block.reps}</span>}
                      {block.sets && <span>Sets: {block.sets}</span>}
                      {block.duration && <span>Duração: {block.duration}</span>}
                    </div>
                  </div>
                  <Badge type="secondary">#{block.order + 1}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Sem blocos nesta seção</p>
          )}
        </Card>
      ))}

      {/* Bottom Actions */}
      <div className="flex gap-3">
        <Link href={`/admin/treinos/${id}/editar`} className="flex-1">
          <Button variant="primary" className="w-full">
            <Edit2 size={18} />
            Editar Treino
          </Button>
        </Link>
        <Link href="/admin/treinos" className="flex-1">
          <Button variant="secondary" className="w-full">
            Voltar para Lista
          </Button>
        </Link>
      </div>
    </div>
  );
}
