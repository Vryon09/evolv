import { Button } from "@/components/ui/button";
import { handleGetJournals } from "@/services/apiJournals";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { IJournal } from "types/journal";
import CreateJournalButton from "./CreateJournalButton";

function JournalButtons() {
  const { data: journals } = useQuery<IJournal[]>({
    queryFn: handleGetJournals,
    queryKey: ["journals"],
  });

  const navigate = useNavigate();

  return (
    <div className="md:col-start-2 lg:col-span-3">
      <div className="flex w-full justify-end gap-2">
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/app/mood/journals")}
        >
          My Journals ({journals?.length})
        </Button>
        <CreateJournalButton />
      </div>
    </div>
  );
}

export default JournalButtons;
