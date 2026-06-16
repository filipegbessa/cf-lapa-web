"use client";

import Link from "next/link";
import { Card } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useListPageState } from "@/hooks/useListPageState";
import { Table } from "@/components/admin/ui/Table";
import { Input } from "@/components/admin/ui/Input";
import { Pagination } from "@/components/admin/ui/Pagination";
import { formatDate } from "@/utils/date";
import { Workout } from "@/modules/workouts/workout.types";
import { workoutsService } from "@/services/workouts.service";

export default function TreinosPage() {
  const fetchFn = useCallback(
    (q: string, page: number, pageSize: number) =>
      workoutsService.list({ q, page, limit: pageSize }),
    [],
  );

  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    sortOrder,
    loading,
    error,
    handlePageChange,
    handleSort,
    sortedData,
    onPageSizeChange,
    results,
  } = useListPageState<Workout>({
    fetchFn,
    errorMessage: "Erro ao buscar treinos",
  });

  const pagination = usePagination(sortedData, {
    pageSize: 10,
    serverPagination: results?.pagination
      ? {
          total: results.pagination.total,
          page: results.pagination.page,
          limit: results.pagination.limit,
          totalPages: results.pagination.totalPages,
        }
      : undefined,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Treinos</h1>
        <Link href="/admin/treinos/novo">
          <Button variant="primary" size="md">
            <Plus size={18} /> Novo Treino
          </Button>
        </Link>
      </div>

      <Card title="Lista de Treinos">
        <div className="space-y-6">
          <Input
            placeholder="Buscar por nome, abreviação ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <Table<Workout>
            columns={[
              {
                key: "date",
                label: "Data",
                sortable: true,
                render: (value) => (
                  <span className="font-medium">{formatDate(value)}</span>
                ),
              },
              {
                key: "title",
                label: "Name",
                sortable: true,
                render: (value) => value || "-",
              },
              // {
              //   key: "description",
              //   label: "Descrição",
              //   sortable: true,
              //   render: (value) => (
              //     <span className="text-gray-600 line-clamp-2">
              //       {value || "-"}
              //     </span>
              //   ),
              // },
            ]}
            data={pagination.paginatedData}
            loading={loading}
            empty={!loading && pagination.totalItems === 0}
            emptyMessage={
              searchTerm
                ? "Nenhum treino encontrado com esse termo"
                : "Nenhum treino cadastrado"
            }
            rowKey="id"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <Link href={`/admin/treinos/${row.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Edit2 size={16} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    if (confirm(`Deseja deletar o movimento "${row.title}"?`)) {
                      // TODO: Implement delete
                    }
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            )}
          />

          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </Card>
    </div>
  );
}
