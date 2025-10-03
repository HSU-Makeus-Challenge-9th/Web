// 기본 영화 타입
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: Genre[];
  budget: number;
  revenue: number;
  tagline: string;
  homepage: string;
  status: string;
  original_language: string;
  original_title: string;
  popularity: number;
}

// 영화 상세 정보 타입
export interface MovieDetails extends Movie {
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

// 장르 타입
export interface Genre {
  id: number;
  name: string;
}

// 제작사 타입
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

// 제작 국가 타입
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// 언어 타입
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// 출연진/제작진 타입
export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// 출연진 타입
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
  adult: boolean;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
}

// 제작진 타입
export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  adult: boolean;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
}

// API 응답 타입들
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}