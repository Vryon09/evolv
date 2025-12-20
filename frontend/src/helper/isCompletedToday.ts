import dayjs from "dayjs";
import type { IHabit } from "types/habit";

export default function isCompletedToday(habit: IHabit) {
  return habit.frequency === "daily"
    ? habit.completedDates.some((date) => dayjs(date).isSame(dayjs(), "day"))
    : habit.frequency === "monthly"
      ? habit.completedDates.some((date) =>
          dayjs(date).isSame(dayjs(), "month"),
        )
      : habit.completedDates.some((date) =>
          dayjs(date).isSame(dayjs(), "isoWeek"),
        );
}
