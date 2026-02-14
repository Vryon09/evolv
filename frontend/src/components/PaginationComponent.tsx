import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface IPaginationComponent {
  page?: number;
  pages?: number;
  toPrev: () => void;
  toNext: () => void;
}

function PaginationComponent({
  page,
  pages,
  toPrev,
  toNext,
}: IPaginationComponent) {
  return (
    <Pagination>
      <PaginationContent className="mt-4 flex w-full items-center justify-between">
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={page === 1}
            className="cursor-pointer"
            onClick={toPrev}
          >
            <PaginationPrevious />
          </Button>
        </PaginationItem>
        <p className="text-xs font-semibold">Page {page}</p>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={page === pages}
            className="cursor-pointer"
            onClick={toNext}
          >
            <PaginationNext />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComponent;
