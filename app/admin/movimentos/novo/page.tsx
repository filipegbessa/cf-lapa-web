"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/admin/ui/Input";
import { Textarea } from "@/components/admin/ui/Textarea";
import { Button } from "@/components/admin/ui/Button";
import { Card } from "@/components/admin/ui/Card";
import { movimentsService } from "@/services/movements.service";

export default function NovoMovimentoPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    abbreviation: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await movimentsService.create({
        name: formData.name,
        abbreviation: formData.abbreviation || undefined,
        description: formData.description || undefined,
      });

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/admin/movimentos";
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar movimento");
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/movimentos"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Novo Movimento</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200">
          ✓ Movimento criado com sucesso!
        </div>
      )}

      {/* Form Card */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <Input
            label="Nome do Movimento"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ex: Snatch, Clean & Jerk, Deadlift"
            required
          />

          {/* Abreviação */}
          <Input
            label="Abreviação"
            name="abbreviation"
            value={formData.abbreviation}
            onChange={handleChange}
            placeholder="ex: SN, C&J, DL"
            helperText="Sigla ou abreviação do movimento (opcional)"
          />

          {/* Descrição */}
          <Textarea
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="ex: Levantamento olímpico explosivo do chão até a cabeça"
            rows={4}
          />

          {/* Botões */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={!formData.name}
            >
              Criar Movimento
            </Button>
            <Link href="/admin/movimentos">
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
