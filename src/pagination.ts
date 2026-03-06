export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Calculate pagination parameters for database queries.
 * Sanitizes page and limit values.
 */
export function calculatePagination(
  page: number = 1,
  limit: number = 20,
  maxLimit: number = 100
): { skip: number; take: number; page: number; limit: number } {
  const sanitizedPage = Math.max(1, Math.floor(page));
  const sanitizedLimit = Math.min(Math.max(1, Math.floor(limit)), maxLimit);
  const skip = (sanitizedPage - 1) * sanitizedLimit;

  return { skip, take: sanitizedLimit, page: sanitizedPage, limit: sanitizedLimit };
}

/**
 * Build pagination metadata from query results.
 */
export function buildPaginationMeta(page: number, limit: number, total: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

/**
 * Create a complete paginated result combining data and metadata.
 */
export function createPaginatedResult<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginationResult<T> {
  return { data, pagination: buildPaginationMeta(page, limit, total) };
}

/**
 * Paginate an in-memory array.
 */
export function paginateArray<T>(
  array: T[],
  page: number = 1,
  limit: number = 20
): PaginationResult<T> {
  const { skip, take, page: p, limit: l } = calculatePagination(page, limit);
  return createPaginatedResult(array.slice(skip, skip + take), p, l, array.length);
}
