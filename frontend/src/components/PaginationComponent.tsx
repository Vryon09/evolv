import type { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface IPaginationComponent {
  page: number;
  pages: number;
  numPerPage: number;
  setNumPerPage: Dispatch<SetStateAction<number>>;
  numPageOptions: number[];
  toPrev: () => void;
  toNext: () => void;
}

function PaginationComponent({
  page,
  pages,
  numPerPage,
  setNumPerPage,
  numPageOptions,
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
        <div className="flex items-center">
          <Field className="flex-row">
            <FieldLabel>Cards per page</FieldLabel>
            <Select
              value={`${numPerPage}`}
              onValueChange={(value) => setNumPerPage(+value)}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  {numPageOptions.map((num, i) => (
                    <SelectItem key={i} value={`${num}`}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <p className="text-xs font-semibold">Page {page}</p>
        </div>
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
