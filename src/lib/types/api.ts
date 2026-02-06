export interface ApiResponse<T> {
  data: T
  error: string | null
  meta?: PaginationMeta
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiError {
  data: null
  error: string
  meta?: undefined
}
