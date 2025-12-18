import { useEffect, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import SearchForm from '../components/search/SearchForm';
import MovieGrid from '../components/movies/MovieGrid';
import MovieModal from '../components/movies/MovieModal';
import { searchMovies, getPopularMovies, type TmdbMovieResult } from '../api/movie';
import type { TmdbSearchResponse } from '../api/movie';
import type { Movie } from '../types/movie';


const MoviePage = () => {
  const [title, setTitle] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');
  const [movies, setMovies] = useState<Movie[]>([]);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

const mapTmdbToMovies = (results: TmdbMovieResult[]): Movie[] =>
  results.map((m) => ({
    id: m.id,
    title: m.title,
    overview: m.overview,
    posterUrl: m.poster_path
      ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
      : '/no-image.png',
    backdropUrl: m.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${m.backdrop_path}`
      : undefined,
    releaseDate: m.release_date,
    voteAverage: m.vote_average,
    isAdult: m.adult ?? false,
  }));
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const res: TmdbSearchResponse = await getPopularMovies({
          language,
          includeAdult,
        });
        setMovies(mapTmdbToMovies(res.results));
      } catch (e) {
        console.error(e);
      }
    };

    fetchInitial();
  }, []);

  const handleSearch = async () => {
    if (!title.trim()) return;

    try {
      const res: TmdbSearchResponse = await searchMovies({
        query: title,
        includeAdult,
        language,
      });
      setMovies(mapTmdbToMovies(res.results));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <PageLayout>
      <SearchForm
        title={title}
        includeAdult={includeAdult}
        language={language}
        onChangeTitle={setTitle}
        onChangeIncludeAdult={setIncludeAdult}
        onChangeLanguage={setLanguage}
        onSubmit={handleSearch}
      />
      <MovieGrid movies={movies} onSelectMovie={handleSelectMovie} />
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </PageLayout>
  );
};

export default MoviePage;