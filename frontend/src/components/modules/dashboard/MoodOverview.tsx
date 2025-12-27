import { Button } from "@/components/ui/button";
import { MOODS, type MoodKey } from "@/constants/moods";
import { handleGetMoods } from "@/services/apiMoods";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import type { IMood } from "types/mood";

function MoodOverview() {
  const { data: moods = [] } = useQuery<IMood[]>({
    queryFn: handleGetMoods,
    queryKey: ["moods"],
  });

  const navigate = useNavigate();

  console.log(moods);
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
      {moods.map((mood) => (
        <div key={mood._id}>
          <p>{MOODS[mood.mood as MoodKey].label}</p>
          <p>{MOODS[mood.mood as MoodKey].emoji}</p>
          <p>{MOODS[mood.mood as MoodKey].description}</p>
          <p>{mood.sleep.duration}hrs</p>
          <p>{mood.sleep.quality}</p>
        </div>
      ))}
    </div>
  );
}

export default MoodOverview;
