import { Button } from "@/components/ui/button";
import { MOODS, type MoodKey } from "@/constants/moods";
import { handleGetMoods } from "@/services/apiMoods";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import type { IMood } from "types/mood";

function MoodOverview() {
  const { data: moods = [] } = useQuery<IMood[]>({
    queryFn: handleGetMoods,
    queryKey: ["moods"],
  });

  const todaysMood = [...moods].find((mood) =>
    dayjs(mood.createdAt).isSame(dayjs(), "day"),
  );

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("/app/mood")}
          className="cursor-pointer"
        >
          <span>Go to Mood</span>
          <ArrowRight />
        </Button>
      </div>
      {todaysMood ? (
        <div>
          <p>
            Today's Mood:
            <span className="text-2xl">
              {MOODS[todaysMood?.mood as MoodKey].emoji}
            </span>
          </p>
          <p>{MOODS[todaysMood?.mood as MoodKey].label}</p>
          <p>{MOODS[todaysMood?.mood as MoodKey].description}</p>
          <p>{todaysMood?.sleep.duration}hrs</p>
          <p>SleepQuality: {todaysMood?.sleep.quality}/4</p>
        </div>
      ) : (
        <p>Click "Go to Mood" to submit a mood today!</p>
      )}
    </div>
  );
}

export default MoodOverview;
