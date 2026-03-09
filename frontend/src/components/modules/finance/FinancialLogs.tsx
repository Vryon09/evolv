import {
  handleGetTransactions,
  useDeleteTransaction,
  useUpdateTransaction,
} from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import type { ITransaction } from "types/Transaction";
import FinancialDialog from "./FinancialDialog";
import FinancialLogsFilter from "./FinancialLogsFilter";
import DeleteDialog from "@/components/DeleteDialog";
import PaginationComponent from "@/components/PaginationComponent";
import type { PaginatedResponse } from "types/pagination";
import TransactionRow from "./TransactionRow";
import { useTransactionPagination } from "@/hooks/transaction/useTransactionPagination";
import { useTransactionFilter } from "@/hooks/transaction/useTransactionFilter";
import { useTransactionEditing } from "@/hooks/transaction/useTransactionEditing";
import { useTransactionDelete } from "@/hooks/transaction/useTransactionDelete";

function FinancialLogs() {
  const { mutate: handleUpdateTransaction } = useUpdateTransaction();
  const { mutate: handleDeleteTransaction } = useDeleteTransaction();

  const {
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
  } = useTransactionFilter();

  const { page, rowsPerPage, setRowsPerPage, toNext, toPrev } =
    useTransactionPagination();

  const {
    isEditing,
    setIsEditing,
    setSelectedTransaction,
    handleOpenChange,
    formValue,
    setFormValue,
    handleEdit,
  } = useTransactionEditing(handleUpdateTransaction);

  const {
    transactionDeleteDialog,
    setTransactionDeleteDialog,
    handleDelete,
    handleDeleteOpenChange,
  } = useTransactionDelete(handleDeleteTransaction);

  const {
    data: { data: transactions, pagination },
    isPending: isTransactionsPending,
  } = useQuery<PaginatedResponse<ITransaction>>({
    queryFn: () =>
      handleGetTransactions({
        transactionType: selectedType,
        category: selectedCategory,
        limit: rowsPerPage,
        page,
      }),
    queryKey: [
      "transactions",
      selectedType,
      selectedCategory,
      page,
      rowsPerPage,
    ],
    initialData: {
      success: true,
      data: [],
      pagination: { limit: 0, page: 1, pages: 0, total: 0 },
    },
  });

  return (
    <div className="mt-8 space-y-4">
      <FinancialLogsFilter
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="divide-y rounded-2xl border-1 border-neutral-300">
        {isTransactionsPending && <p>Loading...</p>}
        {!isTransactionsPending &&
          transactions.map((transaction) => (
            <TransactionRow
              key={transaction._id}
              transaction={transaction}
              setIsEditing={setIsEditing}
              setSelectedTransaction={setSelectedTransaction}
              setTransactionDeleteDialog={setTransactionDeleteDialog}
            />
          ))}

        {!isTransactionsPending && (
          <PaginationComponent
            page={pagination!.page}
            pages={pagination!.pages}
            numPerPage={rowsPerPage}
            numPageOptions={[5, 10, 15, 20]}
            setNumPerPage={setRowsPerPage}
            toNext={toNext}
            toPrev={toPrev}
          />
        )}
      </div>

      <FinancialDialog
        open={isEditing}
        onOpenChange={handleOpenChange}
        formValue={formValue}
        setFormValue={setFormValue}
        handleSubmit={handleEdit}
        action="Edit"
      />

      <DeleteDialog
        open={transactionDeleteDialog !== null}
        onOpenChange={handleDeleteOpenChange}
        handleDelete={handleDelete}
      >
        Are you sure you want to delete this transaction?
      </DeleteDialog>
    </div>
  );
}

export default FinancialLogs;
