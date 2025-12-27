import { MOODS, type MoodKey } from "@/constants/moods";
import { handleGetMoods } from "@/services/apiMoods";
import { useQuery } from "@tanstack/react-query";
import type { IMood } from "types/mood";

function MoodOverview() {
  const { data: moods = [] } = useQuery<IMood[]>({
    queryFn: handleGetMoods,
    queryKey: ["moods"],
  });

  console.log(moods);
  return (
    <div>
      {moods.map((mood) => (
        <div key={mood._id}>
          <p>{MOODS[mood.mood as MoodKey].label}</p>
          <p>{MOODS[mood.mood as MoodKey].emoji}</p>
          <p>{MOODS[mood.mood as MoodKey].description}</p>
          <p>{mood.sleep.duration}hrs</p>
        </div>
      ))}
    </div>
  );
}

export default MoodOverview;
