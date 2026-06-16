"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef } from "react";
import { Editor } from "@tiptap/react";
import { Input } from "@/components/admin/ui/Input";
import { Select } from "@/components/admin/ui/Select";
import { Textarea } from "@/components/admin/ui/Textarea";
import { Button } from "@/components/admin/ui/Button";
import { Card } from "@/components/admin/ui/Card";
import { RichEditor } from "@/components/admin/ui/rich-editor";
import { MovementSearch } from "@/components/admin/ui/movement-search";
import { extractMovementIdsFromHtml } from "@/lib/html-utils";
import {
  CreateWorkoutDto,
  WorkoutSectionType,
  Workout,
} from "@/modules/workouts/workout.types";
import { workoutsService } from "@/services/workouts.service";

const schema = z.object({
  date: z
    .string()
    .min(1, "Data obrigatória")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido"),
  title: z.string().optional(),
  notes: z.string().optional(),
  warmupType: z.string().optional(),
  warmupDescription: z.string().optional(),
  skillType: z.string().optional(),
  skillDescription: z.string().optional(),
  wodType: z.string().optional(),
  wodDescription: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const SECTION_TYPES = ["AMRAP", "EMOM", "FOR_TIME", "TABATA"];

interface WorkoutFormProps {
  initialData?: Workout;
  isEditing?: boolean;
  onSuccess?: () => void;
}

export function WorkoutForm({
  initialData,
  isEditing = false,
  onSuccess,
}: WorkoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: initialData
        ? initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : new Date(initialData.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      title: initialData?.title || "",
      notes: initialData?.notes || "",
      warmupType: initialData?.warmupType || "",
      warmupDescription: initialData?.warmupDescription || "",
      skillType: initialData?.skillType || "",
      skillDescription: initialData?.skillDescription || "",
      wodType: initialData?.wodType || "",
      wodDescription: initialData?.wodDescription || "",
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const editorRefs = useRef<{
    warmup?: Editor | null;
    skill?: Editor | null;
    wod?: Editor | null;
  }>({});

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const payload: CreateWorkoutDto = {
        date: data.date,
        title: data.title || undefined,
        notes: data.notes || undefined,
        warmupType:
          data.warmupType && data.warmupType !== ""
            ? (data.warmupType as WorkoutSectionType)
            : undefined,
        warmupDescription: data.warmupDescription || undefined,
        warmupMovements: extractMovementIdsFromHtml(
          data.warmupDescription || "",
        ),
        skillType:
          data.skillType && data.skillType !== ""
            ? (data.skillType as WorkoutSectionType)
            : undefined,
        skillDescription: data.skillDescription || undefined,
        skillMovements: extractMovementIdsFromHtml(data.skillDescription || ""),
        wodType:
          data.wodType && data.wodType !== ""
            ? (data.wodType as WorkoutSectionType)
            : undefined,
        wodDescription: data.wodDescription || undefined,
        wodMovements: extractMovementIdsFromHtml(data.wodDescription || ""),
      };

      if (isEditing && initialData) {
        await workoutsService.update(initialData.id, payload);
        setSuccessMsg("✓ Treino atualizado com sucesso!");
      } else {
        await workoutsService.create(payload);
        setSuccessMsg("✓ Treino criado com sucesso!");
      }

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.href = "/admin/treinos";
        }
      }, 2000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro ao salvar treino");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={
            isEditing && initialData
              ? `/admin/treinos/${initialData.id}`
              : "/admin/treinos"
          }
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? "Editar Treino" : "Novo Treino"}
        </h1>
      </div>

      {/* Messages */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <Card title="Informações Básicas">
          <div className="space-y-4">
            <Input
              label="Data do Treino *"
              type="date"
              {...register("date")}
              error={errors.date?.message}
            />

            <Input
              label="Título"
              placeholder="ex: Força + Metcon"
              {...register("title")}
            />

            <Textarea
              label="Observações"
              placeholder="Notas adicionais..."
              rows={3}
              {...register("notes")}
            />
          </div>
        </Card>

        {/* Warmup */}
        <Card title="Aquecimento (Warmup)">
          <div className="space-y-4">
            <Controller
              name="warmupType"
              control={control}
              render={({ field }) => (
                <Select
                  label="Tipo"
                  options={[
                    { value: "", label: "Sem tipo" },
                    ...SECTION_TYPES.map((t) => ({ value: t, label: t })),
                  ]}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Descrição
              </label>
              <Controller
                name="warmupDescription"
                control={control}
                render={({ field }) => (
                  <>
                    <RichEditor
                      value={field.value}
                      onChange={field.onChange}
                      onEditorReady={(editor) =>
                        (editorRefs.current.warmup = editor)
                      }
                      placeholder="Descreva o aquecimento..."
                    />
                    <MovementSearch
                      editor={editorRefs.current.warmup || null}
                    />
                  </>
                )}
              />
            </div>
          </div>
        </Card>

        {/* Skill Work */}
        <Card title="Skill Work (Técnica)">
          <div className="space-y-4">
            <Controller
              name="skillType"
              control={control}
              render={({ field }) => (
                <Select
                  label="Tipo"
                  options={[
                    { value: "", label: "Sem tipo" },
                    ...SECTION_TYPES.map((t) => ({ value: t, label: t })),
                  ]}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Descrição
              </label>
              <Controller
                name="skillDescription"
                control={control}
                render={({ field }) => (
                  <>
                    <RichEditor
                      value={field.value}
                      onChange={field.onChange}
                      onEditorReady={(editor) =>
                        (editorRefs.current.skill = editor)
                      }
                      placeholder="Descreva o skill work..."
                    />
                    <MovementSearch editor={editorRefs.current.skill || null} />
                  </>
                )}
              />
            </div>
          </div>
        </Card>

        {/* WOD */}
        <Card title="WOD (Workout of the Day)">
          <div className="space-y-4">
            <Controller
              name="wodType"
              control={control}
              render={({ field }) => (
                <Select
                  label="Tipo"
                  options={[
                    { value: "", label: "Sem tipo" },
                    ...SECTION_TYPES.map((t) => ({ value: t, label: t })),
                  ]}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Descrição
              </label>
              <Controller
                name="wodDescription"
                control={control}
                render={({ field }) => (
                  <>
                    <RichEditor
                      value={field.value}
                      onChange={field.onChange}
                      onEditorReady={(editor) =>
                        (editorRefs.current.wod = editor)
                      }
                      placeholder="Descreva o WOD..."
                    />
                    <MovementSearch editor={editorRefs.current.wod || null} />
                  </>
                )}
              />
            </div>
          </div>
        </Card>

        {/* Botões */}
        <div className="flex gap-3">
          <Button type="submit" variant="primary" loading={submitting}>
            {isEditing ? "Atualizar Treino" : "Criar Treino"}
          </Button>
          <Link
            href={
              isEditing && initialData
                ? `/admin/treinos/${initialData.id}`
                : "/admin/treinos"
            }
          >
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
