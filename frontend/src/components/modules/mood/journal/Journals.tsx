import { Button } from "@/components/ui/button";
import { handleGetJournals } from "@/services/apiJournals";
import { useQuery } from "@tanstack/react-query";
import { MoveLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import type { IJournal } from "types/journal";
import JournalCard from "./JournalCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import dayjs from "dayjs";
import CreateJournalButton from "./CreateJournalButton";

function Journals() {
  const [selectedJournal, setSelectedJournal] = useState<IJournal | null>(null);
  const { data: journals, isLoading } = useQuery<IJournal[]>({
    queryFn: handleGetJournals,
    queryKey: ["journals"],
  });

  const navigate = useNavigate();

  if (isLoading) return <p>Is loading...</p>;

  if (journals?.length === 0) return <p>No journal</p>;

  return (
    <>
      <div>
        <div className="flex justify-between">
          <Button
            size="icon-lg"
            className="cursor-pointer"
            onClick={() => navigate("/app/mood")}
          >
            <MoveLeftIcon />
          </Button>
          <CreateJournalButton />
        </div>
        <div className="mt-4 flex gap-2">
          {journals?.map((journal) => (
            <JournalCard
              journal={journal}
              key={journal._id}
              setSelectedJournal={setSelectedJournal}
            />
          ))}
        </div>
      </div>
      <Dialog
        open={selectedJournal !== null}
        onOpenChange={() => {
          if (selectedJournal !== null) {
            setSelectedJournal(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedJournal?.title}</DialogTitle>
            <DialogDescription>
              {dayjs(selectedJournal?.createdAt).format(
                "MMM D, YYYY ddd hh:mm:ssA",
              )}
            </DialogDescription>
          </DialogHeader>
          <p>{selectedJournal?.content}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Journals;
