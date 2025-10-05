export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
}

export interface MovieResponse {
  results: Movie[];
}