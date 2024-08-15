export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: PageInfo;
}
