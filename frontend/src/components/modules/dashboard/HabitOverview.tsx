import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

function HabitOverview() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("/app/habit")}
          className="cursor-pointer"
        >
          <span>Go to Habit</span>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default HabitOverview;
