import { useState, useCallback, useMemo } from "react";

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UsePaginationOptions {
  pageSize?: number;
  initialPage?: number;
  serverPagination?: PaginationInfo;
}

export interface UsePaginationReturn<T> {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (size: number) => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  startItem: number;
  endItem: number;
}

export function usePagination<T>(
  data: T[],
  options: UsePaginationOptions = {},
): UsePaginationReturn<T> {
  const { pageSize = 10, initialPage = 1, serverPagination } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSizeState, setPageSizeState] = useState(pageSize);

  // Se há paginação server-side, usa aqueles valores; caso contrário, usa client-side
  const isServerPaginated = !!serverPagination;
  const totalItems = isServerPaginated ? serverPagination.total : data.length;
  const totalPages = isServerPaginated
    ? serverPagination.totalPages
    : Math.ceil(totalItems / pageSizeState) || 1;

  const goToPage = useCallback(
    (page: number) => {
      const clampedPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(clampedPage);
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const paginatedData = useMemo(() => {
    // Se é server-paginated, o data já vem paginado, retorna como está
    if (isServerPaginated) {
      return data;
    }

    // Caso contrário, faz paginação client-side
    const startIndex = (currentPage - 1) * pageSizeState;
    const endIndex = startIndex + pageSizeState;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSizeState, isServerPaginated]);

  const activePage = isServerPaginated ? serverPagination.page : currentPage;
  const pageLimit = isServerPaginated ? serverPagination.limit : pageSizeState;
  const startItem = totalItems === 0 ? 0 : (activePage - 1) * pageLimit + 1;
  const endItem = Math.min(activePage * pageLimit, totalItems);

  return {
    currentPage: activePage,
    pageSize: pageLimit,
    totalItems,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    setPageSize: setPageSizeState,
    canGoPrev: activePage > 1,
    canGoNext: activePage < totalPages,
    startItem,
    endItem,
  };
}
