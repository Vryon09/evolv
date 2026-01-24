import { Button } from "@/components/ui/button";
import { handleGetJournals } from "@/services/apiJournals";
import { useQuery } from "@tanstack/react-query";
import { MoveLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import type { IJournal } from "types/journal";

function Journals() {
  const { data: journals, isLoading } = useQuery<IJournal[]>({
    queryFn: handleGetJournals,
    queryKey: ["journals"],
  });

  const navigate = useNavigate();

  if (isLoading) return <p>Is loading...</p>;

  if (journals?.length === 0) return <p>No journal</p>;

  return (
    <div>
      <Button
        size="icon-lg"
        className="cursor-pointer"
        onClick={() => navigate("/app/mood")}
      >
        <MoveLeftIcon />
      </Button>
      {journals?.map((journal, i) => (
        <div key={i}>
          <p>{journal.title}</p>
          <p>{journal.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Journals;
