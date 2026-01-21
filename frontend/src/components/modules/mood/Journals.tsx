import { handleGetJournals } from "@/services/apiJournals";
import { useQuery } from "@tanstack/react-query";
import type { IJournal } from "types/journal";

function Journals() {
  const { data: journals, isLoading } = useQuery<IJournal[]>({
    queryFn: handleGetJournals,
    queryKey: ["journals"],
  });

  if (isLoading) return <p>Is loading...</p>;

  if (journals?.length === 0) return <p>No journal</p>;

  return (
    <div>
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
