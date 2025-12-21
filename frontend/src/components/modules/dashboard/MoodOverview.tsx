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
        <div key={mood._id}>{mood.mood}</div>
      ))}
    </div>
  );
}

export default MoodOverview;
