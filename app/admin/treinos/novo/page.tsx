"use client";

import { WorkoutForm } from "@/components/admin/WorkoutForm";

export default function NovoTreinoPage({
  searchParams,
}: {
  searchParams?: { date?: string };
}) {
  const date = searchParams?.date;

  return (
    <WorkoutForm
      initialData={
        date
          ? ({
              id: "",
              date: new Date(date),
              title: "",
              notes: "",
              warmupType: undefined,
              warmupDescription: "",
              skillType: undefined,
              skillDescription: "",
              wodType: undefined,
              wodDescription: "",
              warmup: [],
              skill: [],
              wod: [],
              authorId: "",
              createdAt: new Date(),
              updatedAt: new Date(),
            } as any)
          : undefined
      }
      isEditing={false}
    />
  );
}
