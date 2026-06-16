export type WorkoutSectionType = "AMRAP" | "EMOM" | "FOR_TIME" | "TABATA";

export type Workout = {
  id: string;
  date: string;
  title?: string | null;
  notes?: string | null;
  warmupType?: WorkoutSectionType | null;
  warmupDescription?: string | null;
  skillType?: WorkoutSectionType | null;
  skillDescription?: string | null;
  wodType?: WorkoutSectionType | null;
  wodDescription?: string | null;
};

export type WorkoutFilters = {
  q?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
};

export type CreateWorkoutDto = Omit<Workout, "id"> & {
  warmupMovements?: string[];
  skillMovements?: string[];
  wodMovements?: string[];
};
