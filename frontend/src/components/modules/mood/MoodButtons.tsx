import { Button } from "@/components/ui/button";
import { handleGetJournals } from "@/services/apiJournals";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { IJournal } from "types/journal";
import type { PaginatedResponse } from "types/pagination";

function JournalButtons() {
  const { data: journalsData } = useQuery<PaginatedResponse<IJournal>>({
    queryFn: handleGetJournals,
    queryKey: ["journals"],
  });

  const journals = journalsData?.data ?? [];
  const pagination = journalsData?.pagination;

  const navigate = useNavigate();

  return (
    <div className="md:col-start-2 lg:col-span-3">
      <div className="flex w-full justify-end gap-2">
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/app/mood/journals")}
        >
          My Journals ({pagination?.total})
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => {
            navigate("/app/mood/calendar");
          }}
        >
          Calendar
        </Button>
      </div>
    </div>
  );
}

export default JournalButtons;
