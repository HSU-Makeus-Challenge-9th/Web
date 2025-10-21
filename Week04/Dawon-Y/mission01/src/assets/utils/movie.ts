import { CATEGORY_ENDPOINTS } from '../constants/movie';

export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}시간 ${mins}분`;
};

export const getApiEndpoint = (category: string): string => {
  return CATEGORY_ENDPOINTS[category as keyof typeof CATEGORY_ENDPOINTS] || 'popular';
};

export const getCategoryFromPath = (path: string): string => {
  if (path === '/') return 'popular';
  if (path === '/popular') return 'popular';
  if (path === '/now-playing') return 'now_playing';
  if (path === '/top-rated') return 'top_rated';
  if (path === '/upcoming') return 'upcoming';
  return 'popular';
};