import { useState, useMemo, useCallback, type FormEvent } from 'react';
import { useFetch } from '../hooks/useFetch';
import { MovieFilter } from '../components/MovieFilter';
import { MovieCard } from '../components/MovieCard';
import { MovieModal } from '../components/MovieModal';

interface MovieFilters {
  query: string;
  language: string;
  includeAdult: boolean;
}

interface Movie {
  id: number;
  title: string;
  original_title?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  overview: string;
}

interface MovieResponse {
  results: Movie[];
}

export const HomePage = () => {
  const [filters, setFilters] = useState<MovieFilters>({ 
    query: 'marvel', 
    language: 'ko-KR',
    includeAdult: false
  });
  const [activeFilters, setActiveFilters] = useState<MovieFilters>(filters);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // 검색 핸들러 - useCallback으로 메모이제이션
  const handleSearch = useCallback((e?: FormEvent) => {
    e?.preventDefault();
    setActiveFilters(filters);
  }, [filters]);

  // 모달 열기 핸들러 - useCallback으로 메모이제이션
  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  // 모달 닫기 핸들러 - useCallback으로 메모이제이션
  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  // API 요청 옵션 - useMemo로 메모이제이션
  const fetchOptions = useMemo(() => ({
    params: {
      query: activeFilters.query,
      language: activeFilters.language,
      include_adult: activeFilters.includeAdult,
    }
  }), [activeFilters.query, activeFilters.language, activeFilters.includeAdult]);

  const { data, isLoading } = useFetch<MovieResponse>('/search/movie', fetchOptions);

  return (
    <div className="container mx-auto px-6 py-8 md:px-12 lg:px-16 xl:px-20">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">🎬 Movie Finder</h1>
      
      <MovieFilter 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={handleSearch} 
      />

      {isLoading ? (
        <div className="text-center py-20">로딩 중...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.results?.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={handleMovieClick}
            />
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};