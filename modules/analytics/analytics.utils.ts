import { DAYS_OF_WEEK } from "./analytics.constants";
import { WeekDTO, DashboardWeekDay } from "./analytics.types";

export const mapWorkoutsToWeekDays = (
  workouts: WeekDTO[],
): DashboardWeekDay[] => {
  const today = new Date();
  const day = today.getUTCDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setUTCDate(today.getUTCDate() + diffToMonday);
  const week: DashboardWeekDay[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);

    currentDate.setUTCDate(monday.getUTCDate() + i);

    const formattedDate = currentDate.toISOString().split("T")[0];

    const workout = workouts.find((w) => w.date === formattedDate);

    week.push({
      workoutId: workout?.workoutId,
      date: formattedDate,
      day: DAYS_OF_WEEK[currentDate.getUTCDay()],
    });
  }

  return week;
};
