export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  vote_average?: number;
}

export interface PaginatedResponse<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}
