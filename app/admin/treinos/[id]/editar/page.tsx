"use client";

import { Workout } from "@/modules/workouts/workout.types";
import { workoutsService } from "@/services/workouts.service";
import { useState, useEffect } from "react";
import { WorkoutForm } from "@/components/admin/WorkoutForm";
import { Card } from "@/components/admin/ui/Card";
import Link from "next/link";
import { Button } from "@/components/admin/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function EditarTreinoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkout = async () => {
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
    };

    fetchWorkout();
  }, [id]);

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
          <Link href={`/admin/treinos/${id}`}>
            <Button variant="secondary" size="sm">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Editar Treino</h1>
        </div>

        <Card className="bg-red-50 border-red-200">
          <p className="text-red-700">{error || "Treino não encontrado"}</p>
        </Card>
      </div>
    );
  }

  return (
    <WorkoutForm
      initialData={workout}
      isEditing={true}
      onSuccess={() => {
        window.location.href = `/admin/treinos/${id}`;
      }}
    />
  );
}
