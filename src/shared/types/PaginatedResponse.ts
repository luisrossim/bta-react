export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalItems: number;
  totalPages: number;
}