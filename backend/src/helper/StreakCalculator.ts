import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";

dayjs.extend(isoWeek);

//NOT USED
//when i incomplete a habit, it will check if yesterday is completed
//if not, return 0
//if completed, calculate the streak
//when i complete, calculate the streak

export function streakCalculator({
  dates,
  frequency,
  actionType,
}: {
  dates: Date[];
  frequency: "daily" | "weekly" | "monthly";
  actionType: "unmark" | "mark";
}) {
  if (dates.length === 0) return 0;

  const last = dayjs(dates[dates.length - 1]);
  const yesterday = dayjs().subtract(1, "day");
  const isCompletedYesterday = last.isSame(yesterday, "day");

  if (frequency === "daily") {
    if (actionType === "unmark") {
      console.log("unmark");
      if (!isCompletedYesterday) {
        return 0;
      }
    }

    let streak = 1;

    for (let i = dates.length - 1; i >= 0; i--) {
      const curr = dayjs(dates[i]);
      const prev = dayjs(dates[i - 1]);
      const isStreakContinue = curr.subtract(1, "day").isSame(prev, "day");

      if (isStreakContinue) {
        streak++;
        continue;
      }

      break;
    }

    return streak;
  }

  if (frequency === "weekly") {
    let streak = 0;

    const weeks = dates.map((date) => {
      return { week: dayjs(date).isoWeek(), year: dayjs(date).isoWeekYear() };
    });
    const lastCompletedWeek = weeks[weeks.length - 1];
    const isLastSameWeek =
      lastCompletedWeek.week === dayjs().isoWeek() &&
      lastCompletedWeek.year === dayjs().isoWeekYear();

    if (isLastSameWeek) {
      streak++;

      if (dates.length <= 1) return streak;
    } else {
      return streak;
    }

    for (let i = dates.length - 1; i >= 0; i--) {
      const curr = weeks[i];
      const prev = weeks[i - 1];

      if (!prev) return streak;

      const isSameWeekAndYear =
        curr.week === prev.week && curr.year === prev.year;
      //if same week and year continue
      if (isSameWeekAndYear) continue;

      const isDiffWeekPrevWeek =
        curr.week - 1 === prev.week && curr.year === prev.year; //is the different week is the previous week
      if (isDiffWeekPrevWeek) {
        streak++;
      } else {
        return streak;
      }
    }
    return streak;
  }

  if (frequency === "monthly") {
    let streak = 1;

    for (let i = dates.length - 1; i >= 0; i--) {
      const curr = dayjs(dates[i]);
      const prev = dayjs(dates[i - 1]);
      const isSameMonthAndYear =
        curr.isSame(prev, "month") && curr.isSame(prev, "year");

      if (isSameMonthAndYear) continue;

      const isDiffMonthPrevMonth =
        curr.subtract(1, "month").isSame(prev, "month") &&
        curr.isSame(prev, "year");

      if (isDiffMonthPrevMonth) {
        streak++;
      } else {
        return streak;
      }
    }
    return streak;
  }
}
