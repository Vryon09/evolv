import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { MOODS, type MoodKey } from "@/constants/moods";
import { handleGetJournals } from "@/services/apiJournals";
import { handleGetMoods } from "@/services/apiMoods";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { MoveLeftIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
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
  );

  const journalsLength = selectedDateJournals?.length || 0;

  const navigate = useNavigate();
  return (
    <div>
      <Button
        size="icon-lg"
        className="cursor-pointer"
        onClick={() => navigate("/app/mood")}
      >
        <MoveLeftIcon />
      </Button>
      <div className="flex">
        <Calendar
          mode="single"
          className="w-full"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
        <div className="min-w-[400px] p-4">
          <p>{dayjs(selectedDate).format("dddd, MMMM DD")}</p>
          {selectedDateMood ? (
            <div>
              <p>Mood</p>
              <div className="flex">
                <p>{MOODS[selectedDateMood?.mood as MoodKey].emoji}</p>
                <p className="capitalize">
                  {MOODS[selectedDateMood?.mood as MoodKey].label}
                </p>
              </div>
            </div>
          ) : (
            <p>No mood logged.</p>
          )}
          {journalsLength > 0 ? (
            <div>
              <p>Journal Entries</p>
              <p>{journalsLength}</p>
            </div>
          ) : (
            <p>No journals logged.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoodCalendar;
