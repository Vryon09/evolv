import { Calendar } from "@/components/ui/calendar";
import { handleGetJournals } from "@/services/apiJournals";
import { handleGetMoods } from "@/services/apiMoods";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import type { IJournal } from "types/journal";
import type { IMood } from "types/mood";

function MoodCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const { data: moods } = useQuery<IMood[]>({
    queryKey: ["moods"],
    queryFn: handleGetMoods,
  });

  const { data: journals } = useQuery<IJournal[]>({
    queryKey: ["journals"],
    queryFn: handleGetJournals,
  });

  const selectedDateMood = moods?.find((mood) =>
    dayjs(mood.createdAt).isSame(selectedDate, "day"),
  );

  const selectedDateJournals = journals?.filter((journal) =>
    dayjs(journal.createdAt).isSame(selectedDate, "day"),
  ).length;

  return (
    <div className="flex">
      <Calendar
        mode="single"
        className="w-full"
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      <div className="min-w-[400px] p-4">
        <p>{dayjs(selectedDate).format("dddd, MMMM DD")}</p>
        <p>{selectedDateMood?.mood}</p>
        <p>Journal Entry: {selectedDateJournals}</p>
      </div>
    </div>
  );
}

export default MoodCalendar;
