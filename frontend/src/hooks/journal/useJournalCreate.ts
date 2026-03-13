import type { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";

interface useJournalCreateProps {
  handleAddJournal: UseMutateFunction<
    void,
    Error,
    {
      title: string;
      content: string;
    },
    unknown
  >;
}

export function useJournalCreate({ handleAddJournal }: useJournalCreateProps) {
  const [journalForm, setJournalForm] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });
  const [isCreating, setIsCreating] = useState(false);

  function handleSubmit() {
    handleAddJournal({
      title: journalForm.title,
      content: journalForm.content,
    });

    setJournalForm({ title: "", content: "" });

    setIsCreating(false);
  }

  return {
    journalForm,
    setJournalForm,
    isCreating,
    setIsCreating,
    handleSubmit,
  };
}
