import { useState } from "react";

export function useHabitPagination() {
  const [page, setPage] = useState<number>(1);
  const [cardsPerPage, setCardsPerPage] = useState<number>(6);

  return { page, setPage, cardsPerPage, setCardsPerPage };
}
