export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const API_BASE_URL = 'https://api.themoviedb.org/3';

export const CATEGORY_ENDPOINTS = {
  popular: 'popular',
  upcoming: 'upcoming',
  top_rated: 'top_rated',
  now_playing: 'now_playing'
} as const;

export const MAX_PAGES = 500;
export const MAIN_CAST_LIMIT = 10;
export const PRODUCTION_COMPANIES_LIMIT = 3;

export type CategoryType = keyof typeof CATEGORY_ENDPOINTS;