import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteJournal } from "@/services/apiJournals";
import dayjs from "dayjs";
import { EllipsisVertical } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { IJournal } from "types/journal";

function JournalCard({
  journal,
  setSelectedJournal,
}: {
  journal: IJournal;
  setSelectedJournal: Dispatch<SetStateAction<IJournal | null>>;
}) {
  const { mutate: handleDeleteJournal } = useDeleteJournal();

  function handleDelete() {
    handleDeleteJournal({ id: journal._id });
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedJournal(journal);
      }}
      className="flex cursor-pointer items-center justify-between rounded-md bg-neutral-200 px-2 py-1 hover:bg-neutral-300 has-[button:hover]:bg-neutral-200"
    >
      <p className="text-sm">{journal.title}</p>
      <div className="flex items-center gap-2">
        <p className="text-xs">
          {dayjs(journal.createdAt).format("ddd MMM D, YYYY")}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer">
              <EllipsisVertical size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default JournalCard;
