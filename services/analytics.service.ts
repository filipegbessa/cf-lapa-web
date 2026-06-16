import {
  DashboardDTO,
  DashboardWeekDay,
  OldestMovementsDTO,
  TopMovementsDTO,
  TopWorkoutTypesDTO,
  WeekDTO,
} from "@/modules/analytics/analytics.types";
import { api } from "./client";
import { mapWorkoutsToWeekDays } from "@/modules/analytics/analytics.utils";

export const analyticsService = {
  async getWeek(): Promise<DashboardWeekDay[]> {
    const response = await api.get<WeekDTO[]>("/analytics/week");
    return mapWorkoutsToWeekDays(response.data);
  },

  async getTopMovements() {
    const response = await api.get<TopMovementsDTO[]>(
      "/analytics/top-movements",
    );
    return response.data;
  },

  async getTopWorkoutTypes() {
    const response = await api.get<TopWorkoutTypesDTO[]>(
      "/analytics/top-workout-types",
    );
    return response.data;
  },

  async getOldestMovements() {
    const response = await api.get<OldestMovementsDTO[]>(
      "/analytics/oldest-movements",
    );
    return response.data;
  },

  async getDashboard(params?: { startDate?: string; endDate?: string }) {
    const response = await api.get<DashboardDTO>("/analytics/dashboard", {
      params,
    });
    return {
      ...response.data,
      week: mapWorkoutsToWeekDays(response.data.week),
    };
  },
};
