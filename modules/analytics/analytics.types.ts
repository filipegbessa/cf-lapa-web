import { WorkoutSectionType } from "../workouts/workout.types";

export type DayOfWeek = "seg" | "ter" | "qua" | "qui" | "sex" | "sab" | "dom";

export interface WeekDTO {
  date: string;
  workoutId?: string;
}

export interface DashboardWeekDay extends WeekDTO {
  day: DayOfWeek;
}

export interface TopMovementsDTO {
  id: string;
  name?: string;
  abbreviation?: string;
  count: number;
}

export interface TopWorkoutTypesDTO {
  type: WorkoutSectionType;
  count: number;
}

export interface OldestMovementsDTO {
  id: string;
  name: string;
  abbreviation?: string;
  lastUsed?: string;
}

export interface DashboardDTO {
  week: DashboardWeekDay[];
  topMovements: TopMovementsDTO[];
  topWorkoutTypes: TopWorkoutTypesDTO[];
  oldestMovements: OldestMovementsDTO[];
}
