export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PaginationParams {
  page?: string;
  limit?: string;
}

export function parsePaginationParams(params: PaginationParams) {
  const page = Math.max(1, parseInt(String(params.page || "1"), 10));
  const limit = Math.max(
    1,
    Math.min(100, parseInt(String(params.limit || "20"), 10)),
  );

  return { page, limit };
}

export function calculateSkip(page: number, limit: number) {
  return (page - 1) * limit;
}
