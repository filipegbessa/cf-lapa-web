import { useState, useCallback, useEffect, useMemo } from "react";
import type { SortOrder } from "@/components/admin/ui/Table";
import { PaginatedResponse } from "@/types/pagination.types";

interface UseListPageStateOptions {
  fetchFn: (q: string, page: number, pageSize?: number) => Promise<any>;
  errorMessage?: string;
  defaultPageSize?: number;
}

export function useListPageState<T extends object>({
  fetchFn,
  errorMessage = "Erro ao buscar dados",
  defaultPageSize = 10,
}: UseListPageStateOptions) {
  const [results, setResults] = useState<PaginatedResponse<T> | null>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performFetch = async () => {
      setLoading(true);
      try {
        const response = searchTerm
          ? await fetchFn(searchTerm, 1, 10)
          : await fetchFn(searchTerm, 1, defaultPageSize);
        setResults(response);
        setError(null);
      } catch (err) {
        setError(errorMessage);
        setResults(null);
      } finally {
        setLoading(false);
      }
    };

    performFetch();
    setCurrentPage(1);
  }, [searchTerm, fetchFn, errorMessage, defaultPageSize]);

  const fetchData = useCallback(
    async (q: string, page: number, pageSize: number = defaultPageSize) => {
      setLoading(true);
      try {
        const response = q
          ? await fetchFn(q, page, 10)
          : await fetchFn(q, page, pageSize);
        setResults(response);
        setError(null);
      } catch (err) {
        setError(errorMessage);
        setResults(null);
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, errorMessage, defaultPageSize],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      fetchData(searchTerm, page);
    },
    [searchTerm, fetchData],
  );

  const handleSort = useCallback((key: keyof T, order: SortOrder) => {
    setSortBy(order ? key : null);
    setSortOrder(order);
  }, []);

  const sortedData = useMemo(() => {
    if (!results?.data || !sortBy || !sortOrder) {
      return results?.data || [];
    }

    const sorted = [...results.data].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.toLowerCase().localeCompare(bVal.toLowerCase())
          : bVal.toLowerCase().localeCompare(aVal.toLowerCase());
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    return sorted;
  }, [results?.data, sortBy, sortOrder]);

  const onPageSizeChange = (size: number) => {
    fetchData(searchTerm, 1, size);
  };

  return {
    results,
    searchTerm,
    setSearchTerm,
    currentPage,
    sortBy,
    sortOrder,
    loading,
    error,
    fetchData,
    handlePageChange,
    handleSort,
    sortedData,
    onPageSizeChange,
  };
}
