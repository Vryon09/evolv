import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";

dayjs.extend(isoWeek);

export function recalcBestStreakDate({
  dates,
  frequency,
}: {
  dates: Date[];
  frequency: "daily" | "weekly" | "monthly";
}) {
  if (frequency === "daily") {
    let start = 1;
    let best = 1;
    let bestStreakAchievedAt;
    for (let i = 0; i <= dates.length - 2; i++) {
      const curr = dayjs(dates[i]);
      const next = dayjs(dates[i + 1]);
      const isConsecutive = curr.add(1, "day").isSame(next, "day");

      if (isConsecutive) {
        start++;
      } else {
        start = 1;
      }

      if (start > best) {
        best = start;
        bestStreakAchievedAt = dates[i + 1];
      }
    }

    return bestStreakAchievedAt;
  }

  if (frequency === "weekly") {
    let start = 1;
    let best = 1;
    let bestStreakAchievedAt;
    for (let i = 0; i <= dates.length - 2; i++) {
      const curr = dayjs(dates[i]);
      const next = dayjs(dates[i + 1]);
      const isConsecutive = curr.add(1, "week").isSame(next, "isoWeek");

      if (isConsecutive) {
        start++;
      } else {
        start = 1;
      }

      if (start > best) {
        best = start;
        bestStreakAchievedAt = dates[i + 1];
      }
    }

    return bestStreakAchievedAt;
  }

  if (frequency === "monthly") {
    let start = 1;
    let best = 1;
    let bestStreakAchievedAt;
    for (let i = 0; i <= dates.length - 2; i++) {
      const curr = dayjs(dates[i]);
      const next = dayjs(dates[i + 1]);
      const isConsecutive = curr.add(1, "month").isSame(next, "month");

      if (isConsecutive) {
        start++;
      } else {
        start = 1;
      }

      if (start > best) {
        best = start;
        bestStreakAchievedAt = dates[i + 1];
      }
    }

    return bestStreakAchievedAt;
  }
}
