import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, MAX_PAGES } from '../constants/movie';
import { getApiEndpoint } from '../utils/movie';
import type { Movie, MovieResponse } from '../types/Movie';

interface UseMoviesResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export const useMovies = (category: string): UseMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const endpoint = getApiEndpoint(category);
        const { data } = await axios.get<MovieResponse>(
          `${API_BASE_URL}/movie/${endpoint}?language=ko-KR&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, MAX_PAGES));
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('영화 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    movies,
    isLoading,
    error,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  };
};