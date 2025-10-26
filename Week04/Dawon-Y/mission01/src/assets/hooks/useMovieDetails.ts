import { useState, useEffect } from 'react';
import axios from 'axios';
import type { MovieDetails, Credits } from '../types/MovieDetail';
import { API_BASE_URL } from '../constants/movie';

interface UseMovieDetailsResult {
  movieDetails: MovieDetails | null;
  credits: Credits | null;
  isLoading: boolean;
  error: string | null;
}

export const useMovieDetails = (movieId: string | undefined): UseMovieDetailsResult => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) return;

      try {
        setIsLoading(true);
        setError(null);

        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get<MovieDetails>(
            `${API_BASE_URL}/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<Credits>(
            `${API_BASE_URL}/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);

        setMovieDetails(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('영화 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  return {
    movieDetails,
    credits,
    isLoading,
    error,
  };
};