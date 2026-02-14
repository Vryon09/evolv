import { Button } from "@/components/ui/button";
import { handleGetJournals, useDeleteJournal } from "@/services/apiJournals";
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
import DeleteDialog from "@/components/DeleteDialog";
import type { PaginatedResponse } from "types/pagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
function Journals() {
  const [selectedJournal, setSelectedJournal] = useState<IJournal | null>(null);
  const [page, setPage] = useState<number>(1);
  const [journalDeleteDialog, setJournalDeleteDialog] =
    useState<IJournal | null>(null);
  const { data: journalsData, isLoading } = useQuery<
    PaginatedResponse<IJournal>
  >({
    queryFn: () => handleGetJournals({ page, limit: 5 }),
    queryKey: ["journals", page],
  });

  const journals = journalsData?.data ?? [];
  const pagination = journalsData?.pagination;

  const { mutate: handleDeleteJournal } = useDeleteJournal();

  const navigate = useNavigate();

  if (isLoading) return <p>Is loading...</p>;

  if (journals?.length === 0) return <p>No journal</p>;

  return (
    <div className="bg-background overflow-scroll overflow-x-hidden">
      <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
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
        <div className="mt-4 flex flex-col gap-2">
          {journals?.map((journal) => (
            <JournalCard
              journal={journal}
              key={journal._id}
              setSelectedJournal={setSelectedJournal}
              setJournalDeleteDialog={setJournalDeleteDialog}
            />
          ))}
        </div>

        <Pagination>
          <PaginationContent className="mt-4 flex w-full items-center justify-between">
            <PaginationItem>
              <Button
                variant="ghost"
                disabled={pagination?.page === 1}
                className="cursor-pointer"
                onClick={() => setPage((page) => page - 1)}
              >
                <PaginationPrevious />
              </Button>
            </PaginationItem>
            <p className="text-xs font-semibold">Page {pagination?.page}</p>
            <PaginationItem>
              <Button
                variant="ghost"
                disabled={pagination?.page === pagination?.pages}
                className="cursor-pointer"
                onClick={() => setPage((page) => page + 1)}
              >
                <PaginationNext />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
                "ddd MMM D, YYYY hh:mm:ssA",
              )}
            </DialogDescription>
          </DialogHeader>
          <p>{selectedJournal?.content}</p>
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={journalDeleteDialog !== null}
        onOpenChange={() => {
          if (journalDeleteDialog !== null) {
            setJournalDeleteDialog(null);
          }
        }}
        handleDelete={() => {
          if (journalDeleteDialog === null) return;

          handleDeleteJournal({ id: journalDeleteDialog._id });

          setJournalDeleteDialog(null);
        }}
      >
        Are you sure you want to delete this journal
        {journalDeleteDialog?.title ? `: "${journalDeleteDialog?.title}"` : ""}
      </DeleteDialog>
    </div>
  );
}

export default Journals;
