"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";
import { Movement } from "@/modules/movements/movement.types";
import { movimentsService } from "@/services/movements.service";

interface MovementSearchProps {
  editor: Editor | null;
}

export function MovementSearch({ editor }: MovementSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [newMovementName, setNewMovementName] = useState("");
  const debounceTimer = useRef<NodeJS.Timeout>();

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await movimentsService.list({ q });
      setResults(data);
    } catch (err) {
      setError("Erro ao buscar movimentos");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    if (query.trim()) {
      debounceTimer.current = setTimeout(() => search(query), 300);
    } else {
      setResults([]);
    }

    return () => clearTimeout(debounceTimer.current);
  }, [query, search]);

  const handleInsert = (movement: Movement) => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "movement",
          attrs: { id: movement.id, name: movement.name },
        })
        .insertContent(" ")
        .run();
      setQuery("");
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleCreateNew = async () => {
    if (!newMovementName.trim()) return;

    setCreatingNew(true);
    try {
      const newMovement = await movimentsService.create({
        name: newMovementName,
      });
      handleInsert(newMovement);
      setNewMovementName("");
      setCreatingNew(false);
    } catch (err) {
      setError("Erro ao criar movimento");
      setCreatingNew(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-4 text-sm font-medium rounded-lg transition-all bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        + Inserir movimento
      </button>

      {isOpen && (
        <div className="mt-3 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Buscar movimento (ex: Snatch, Deadlift)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border-b border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946]/20"
            autoFocus
          />

          {error && (
            <p className="px-4 py-3 text-sm text-red-600 bg-red-50 border-b border-gray-200">
              {error}
            </p>
          )}

          {loading && (
            <p className="px-4 py-3 text-center text-sm text-gray-500">
              Buscando...
            </p>
          )}

          {!loading && query.trim() && results.length === 0 && !creatingNew && (
            <div className="border-b border-gray-200 p-4">
              <p className="text-sm text-gray-500 mb-2">
                Nenhum movimento encontrado.
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Deseja criar um novo?
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nome do movimento"
                  value={newMovementName}
                  onChange={(e) => setNewMovementName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946]/20 focus:border-[#E63946]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateNew();
                  }}
                />
                <button
                  type="button"
                  onClick={handleCreateNew}
                  disabled={!newMovementName.trim()}
                  className="h-9 px-4 text-sm font-medium rounded bg-[#E63946] text-white hover:bg-red-700 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Criar
                </button>
              </div>
            </div>
          )}

          {creatingNew && (
            <p className="px-4 py-3 text-center text-sm text-gray-500">
              Criando movimento...
            </p>
          )}

          {results.length > 0 && (
            <ul className="max-h-72 overflow-y-auto">
              {results.map((movement) => (
                <li key={movement.id}>
                  <button
                    type="button"
                    onClick={() => handleInsert(movement)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0 flex flex-col gap-1"
                  >
                    <span className="font-medium text-gray-900">
                      {movement.name}
                      {movement.abbreviation && (
                        <span className="text-sm text-gray-500 font-normal">
                          {" "}
                          ({movement.abbreviation})
                        </span>
                      )}
                    </span>
                    {movement.description && (
                      <span className="text-sm text-gray-600">
                        {movement.description}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
