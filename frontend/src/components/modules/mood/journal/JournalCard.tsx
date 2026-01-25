import dayjs from "dayjs";
import type { Dispatch, SetStateAction } from "react";
import type { IJournal } from "types/journal";

function JournalCard({
  journal,
  setSelectedJournal,
}: {
  journal: IJournal;
  setSelectedJournal: Dispatch<SetStateAction<IJournal | null>>;
}) {
  return (
    <div
      onClick={() => setSelectedJournal(journal)}
      className="cursor-pointer rounded-md bg-neutral-200 p-4 hover:bg-neutral-300 active:bg-neutral-400"
    >
      <p className="font-semibold">{journal.title}</p>
      <p className="text-sm">
        {dayjs(journal.createdAt).format("MMM D, YYYY dddd")}
      </p>
    </div>
  );
}

export default JournalCard;
