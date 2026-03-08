import { useState } from "react";

export function useTransactionPagination() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  function toNext() {
    setPage((page) => page + 1);
  }

  function toPrev() {
    setPage((page) => page - 1);
  }

  return { page, setPage, rowsPerPage, setRowsPerPage, toNext, toPrev };
}
