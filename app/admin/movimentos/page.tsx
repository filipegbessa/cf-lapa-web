"use client";

import Link from "next/link";
import { Card } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Input } from "@/components/admin/ui/Input";
import { Table } from "@/components/admin/ui/Table";
import { Pagination } from "@/components/admin/ui/Pagination";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useListPageState } from "@/hooks/useListPageState";
import { movimentsService } from "@/services/movements.service";
import { Movement } from "@/modules/movements/movement.types";

export default function MovimentosPage() {
  const fetchFn = useCallback(
    (q: string, page: number, pageSize: number) =>
      q
        ? movimentsService.list({ q, page, limit: 10 })
        : movimentsService.list({ page, limit: pageSize }),
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
  } = useListPageState<Movement>({
    fetchFn,
    errorMessage: "Erro ao buscar movimentos",
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
        <h1 className="text-3xl font-bold text-gray-900">Movimentos</h1>
        <Link href="/admin/movimentos/novo">
          <Button variant="primary" size="md">
            <Plus size={18} /> Novo Movimento
          </Button>
        </Link>
      </div>

      <Card title="Lista de Movimentos">
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

          <Table<Movement>
            columns={[
              {
                key: "name",
                label: "Nome",
                sortable: true,
                render: (value) => <span className="font-medium">{value}</span>,
              },
              {
                key: "abbreviation",
                label: "Abreviação",
                sortable: true,
                render: (value) => value || "-",
              },
              {
                key: "description",
                label: "Descrição",
                sortable: true,
                render: (value) => (
                  <span className="text-gray-600 line-clamp-2">
                    {value || "-"}
                  </span>
                ),
              },
            ]}
            data={pagination.paginatedData}
            loading={loading}
            empty={!loading && pagination.totalItems === 0}
            emptyMessage={
              searchTerm
                ? "Nenhum movimento encontrado com esse termo"
                : "Nenhum movimento cadastrado"
            }
            rowKey="id"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <Link href={`/admin/movimentos/${row.id}`}>
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
                    if (confirm(`Deseja deletar o movimento "${row.name}"?`)) {
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
