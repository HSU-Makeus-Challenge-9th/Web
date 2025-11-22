export type Movie = {
    audlt: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    poster: string;
    gdnre_ids: number;
    popularity: number;
    realease_date: Date;
    video: boolean;
    vote_average: number;
    vote_count: number;
    original_average: number;
  };
  
  export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };