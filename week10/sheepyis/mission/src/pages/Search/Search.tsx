import { useState, useCallback } from "react";
import type { SearchParams } from "../../types/search/search";
import SearchForm from "../../components/Search/SearchForm";
import MovieList from "../../components/Movie/MovieList";
import SearchMovieItem from "../../components/Search/SearchMovieItem";
import type { Movie } from "../../types/movie/movie";
import SearchModal from "../../components/Search/SearchModal";

const Search = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = useCallback(
    ({ query, includeAdult, language }: SearchParams) => {
      if (!query.trim()) return;

      setUrl(
        `search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=${includeAdult}&language=${language}`
      );
    },
    []
  );

  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  return (
    <>
      <SearchForm onSearch={handleSearch} />

      {url && (
        <MovieList
          url={url}
          renderItem={(movie) => (
            <SearchMovieItem movie={movie} onClick={handleSelectMovie} />
          )}
        />
      )}

      {selectedMovie && (
        <SearchModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Search;
