import { api } from "./client";

import {
  Movement,
  MovementFilters,
  CreateMovementDto,
} from "@/modules/movements/movement.types";

import { PaginatedResponse } from "@/types/pagination.types";

export const movimentsService = {
  async list(filters?: MovementFilters) {
    const response = await api.get<PaginatedResponse<Movement>>("/movements", {
      params: filters,
    });

    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Movement>(`/movements/${id}`);

    return response.data;
  },

  async create(data: CreateMovementDto) {
    const response = await api.post<Movement>("/movements", data);

    return response.data;
  },

  async update(id: string, data: Partial<CreateMovementDto>) {
    const response = await api.patch<Movement>(`/movements/${id}`, data);

    return response.data;
  },

  async remove(id: string) {
    await api.delete(`/movements/${id}`);
  },
};
