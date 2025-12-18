/* 
    (GET) Top Rated 영화 목록
*/
export interface TopRatedMovieParam {
  language: string;
  page: number;
  region: string;
}

/* 
    (GET) 영화 검색 목록
*/
// 쿼리 파라미터
export interface MovieParam {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// 응답
export interface ResponseSearchMovie {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
