import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";

dayjs.extend(isoWeek);

//NOT USED
export function longestStreakCalculator({
  dates,
  frequency,
}: {
  dates: Date[];
  frequency: "daily" | "weekly" | "monthly";
}) {
  if (dates.length === 0) return 0;
  const sortedDates = [...dates].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  if (frequency === "daily") {
    let start = 1;
    let best = 1;
    for (let i = sortedDates.length - 1; i >= 0; i--) {
      const curr = dayjs(sortedDates[i]).startOf("day");
      const prev = dayjs(sortedDates[i - 1]).startOf("day");
      const diff = curr.diff(prev, "day");

      if (diff === 1) {
        start++;
      } else {
        start = 1;
      }

      if (start > best) {
        best = start;
      }
    }
    return best;
  }

  if (frequency === "weekly") {
    let start = 1;
    let best = 1;

    for (let i = dates.length - 1; i > 0; i--) {
      const currIsoWeek = `${dayjs(dates[i]).isoWeekYear()}-${dayjs(
        dates[i]
      ).isoWeek()}`;
      const prevIsoWeek = `${dayjs(dates[i]).isoWeekYear()}-${dayjs(
        dates[i - 1]
      ).isoWeek()}`;
      const curr = currIsoWeek.split("-");
      const prev = prevIsoWeek.split("-");

      const diff = curr[0] === prev[0] ? +curr[1] - +prev[1] : 2;

      if (diff === 1) {
        start++;
      } else {
        start = 1;
      }

      if (start > best) {
        best = start;
      }
    }
    return best;
  }

  if (frequency === "monthly") {
    let start = 1;
    let best = 1;

    for (let i = dates.length - 1; i > 0; i--) {
      const currMonth = `${dayjs(dates[i]).year()}-${dayjs(dates[i]).month()}`;
      const prevMonth = `${dayjs(dates[i]).year()}-${dayjs(
        dates[i - 1]
      ).month()}`;
      const curr = currMonth.split("-");
      const prev = prevMonth.split("-");

      const diff = curr[0] === prev[0] ? +curr[1] - +prev[1] : 2;

      if (diff === 1) {
        start++;
      } else {
        start = 1;
      }

      if (start > best) {
        best = start;
      }
    }
    return best;
  }

  return 1;
}
