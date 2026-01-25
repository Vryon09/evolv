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
      className="flex cursor-pointer items-center justify-between rounded-md bg-neutral-200 px-2 py-1 hover:bg-neutral-300 active:bg-neutral-400"
    >
      <p className="text-sm">{journal.title}</p>
      <p className="text-xs">
        {dayjs(journal.createdAt).format("ddd MMM D, YYYY")}
      </p>
    </div>
  );
}

export default JournalCard;
