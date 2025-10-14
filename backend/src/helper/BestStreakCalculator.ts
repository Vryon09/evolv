import dayjs from "dayjs";

export function bestStreakCalculator({ dates }: { dates: Date[] }) {
  if (dates.length === 0) return 0;

  let curr = 1;
  let best = 1;

  console.log(dates);

  for (let i = 1; i < dates.length; i++) {
    const currDay = dayjs(dates[i]).startOf("day");
    const prevDay = dayjs(dates[i - 1]).startOf("day");
    const diff = currDay.diff(prevDay, "day");
    if (diff === 1) {
      curr++;
      best = Math.max(curr, best);
    } else if (diff > 1) {
      curr = 1;
    }
  }

  return best;
}
