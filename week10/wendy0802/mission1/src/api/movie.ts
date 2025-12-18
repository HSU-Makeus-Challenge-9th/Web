const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

console.log('TMDB_TOKEN from env:', import.meta.env.VITE_TMDB_TOKEN);


if (!TMDB_TOKEN) {
  console.warn('TMDB TOKEN 이 설정되지 않았습니다. .env 를 확인하세요.');
}

export type TmdbAccount = {
  id: number;
  name: string | null;
  username: string;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
};

async function tmdbGet<T>(path: string, query?: Record<string, string | number | boolean>) {
  const url = new URL(TMDB_BASE_URL + path);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB 요청 실패: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}

export type TmdbMovieResult = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  adult: boolean;
};

export type TmdbSearchResponse = {
  page: number;
  results: TmdbMovieResult[];
  total_pages: number;
  total_results: number;
};

export function searchMovies(params: {
  query: string;
  includeAdult?: boolean;
  language?: string;
}) {
  const { query, includeAdult = false, language = 'ko-KR' } = params;

  return tmdbGet<TmdbSearchResponse>('/search/movie', {
    query,
    include_adult: includeAdult,
    language,
  });
}

export function getPopularMovies(params?: {
  language?: string;
  page?: number;
  includeAdult?: boolean;
}) {
  const { language = 'ko-KR', page = 1, includeAdult = false } = params ?? {};

  return tmdbGet<TmdbSearchResponse>('/movie/popular', {
    language,
    page,
    include_adult: includeAdult,
  });
}