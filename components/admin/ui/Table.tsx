'use client';

import { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export type SortOrder = 'asc' | 'desc' | null;

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
  className?: string;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => ReactNode;
  className?: string;
  sortBy?: keyof T | null;
  sortOrder?: SortOrder;
  onSort?: (key: keyof T, order: SortOrder) => void;
}

export function Table<T extends object>({
  columns,
  data,
  loading = false,
  empty = false,
  emptyMessage = 'Nenhum resultado encontrado',
  rowKey,
  onRowClick,
  actions,
  className = '',
  sortBy,
  sortOrder,
  onSort,
}: TableProps<T>) {
  const handleHeaderClick = (column: TableColumn<T>) => {
    if (!onSort || column.sortable === false) return;

    let newOrder: SortOrder = 'asc';
    if (sortBy === column.key) {
      if (sortOrder === 'asc') {
        newOrder = 'desc';
      } else {
        newOrder = null;
      }
    }
    onSort(column.key, newOrder);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E63946]" />
      </div>
    );
  }

  if (empty || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-base">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((column) => {
              const isSortable = column.sortable !== false && onSort;
              const isSorted = sortBy === column.key && sortOrder;
              return (
                <th
                  key={String(column.key)}
                  onClick={() => handleHeaderClick(column)}
                  className={`px-6 py-3 text-left font-semibold text-gray-700 ${column.className || ''} ${
                    isSortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {isSorted && (
                      <>
                        {sortOrder === 'asc' ? (
                          <ArrowUp size={16} className="text-[#E63946]" />
                        ) : (
                          <ArrowDown size={16} className="text-[#E63946]" />
                        )}
                      </>
                    )}
                  </div>
                </th>
              );
            })}
            {actions && <th className="px-6 py-3 text-left font-semibold text-gray-700">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={String(row[rowKey])}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={`px-6 py-4 text-gray-900 ${column.className || ''}`}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : (row[column.key] as ReactNode)}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-gray-900">
                  <div onClick={(e) => e.stopPropagation()}>{actions(row)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
