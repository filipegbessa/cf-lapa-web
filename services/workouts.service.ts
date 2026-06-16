import { api } from "./client";

import {
  Workout,
  WorkoutFilters,
  CreateWorkoutDto,
} from "@/modules/workouts/workout.types";

import { PaginatedResponse } from "@/types/pagination.types";

export const workoutsService = {
  async list(filters?: WorkoutFilters) {
    const response = await api.get<PaginatedResponse<Workout>>("/workouts", {
      params: filters,
    });

    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Workout>(`/workouts/${id}`);

    return response.data;
  },

  async create(data: CreateWorkoutDto) {
    const response = await api.post<Workout>("/workouts", data);

    return response.data;
  },

  async update(id: string, data: Partial<CreateWorkoutDto>) {
    const response = await api.patch<Workout>(`/workouts/${id}`, data);

    return response.data;
  },

  async remove(id: string) {
    await api.delete(`/workouts/${id}`);
  },
};
