"use client";

import { Movement } from "@/modules/movements/movement.types";
import { movimentsService } from "@/services/movements.service";
import { useState, useCallback, useEffect } from "react";

export default function EditMovimentoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [results, setResults] = useState<Movement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovements = useCallback(async () => {
    setLoading(true);
    try {
      const response = await movimentsService.getById(id);
      setResults(response);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar movimentos");
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return <div>hi</div>;
}
