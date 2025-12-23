import { useState, useCallback, useMemo, type FormEvent } from 'react';
import { searchMovies } from '../apis/movies';
import type { Movie } from '../types/movies';
import SearchForm from '../components/search/SearchForm';
import SearchMovieCard from '../components/search/SearchMovieCard';
import MovieModal from '../components/modal/MovieModal';
import LoadingSpinner from '../components/spinner/LoadingSpinner';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchQueryChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleIncludeAdultChange = useCallback((value: boolean) => {
    setIncludeAdult(value);
  }, []);

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!searchQuery.trim()) {
        alert('영화 제목을 입력해주세요.');
        return;
      }

      setIsLoading(true);
      setHasSearched(true);

      try {
        const response = await searchMovies({
          query: searchQuery,
          include_adult: includeAdult,
          language,
          page: 1,
        });

        setMovies(response.results);
      } catch (error) {
        alert('영화 검색 중 오류가 발생했습니다.');
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery, includeAdult, language]
  );

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => movie.poster_path);
  }, [movies]);

  const movieCount = useMemo(() => {
    return filteredMovies.length;
  }, [filteredMovies]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <SearchForm
          searchQuery={searchQuery}
          includeAdult={includeAdult}
          language={language}
          onSearchQueryChange={handleSearchQueryChange}
          onIncludeAdultChange={handleIncludeAdultChange}
          onLanguageChange={handleLanguageChange}
          onSubmit={handleSubmit}
        />

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && hasSearched && (
          <>
            {movieCount > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">
                    검색 결과: <span className="font-semibold">{movieCount}개</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredMovies.map((movie) => (
                    <SearchMovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={handleMovieClick}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
              </div>
            )}
          </>
        )}

        {!isLoading && !hasSearched && (
          <div className="flex text-9xl font-bold justify-center items-center" style={{ minHeight: 'calc(100vh - 250px)' }}>
            WAN CINEMA
          </div>
        )}
      </div>

      <MovieModal movie={selectedMovie} onClose={handleModalClose} />
    </div>
  );
};

export default HomePage;
