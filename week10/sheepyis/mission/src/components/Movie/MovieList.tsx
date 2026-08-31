import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import type { Movie } from "../../types/movie/movie";
import type { PaginatedResponse } from "../../types/movie/movie";
import { useNavigate } from "react-router-dom";
import * as S from "./MovieStyle";
import MovieItem from "./MovieItem";
import Error from "../Common/Error";
import Loading from "../Common/Loading";
import Pagination from "../Pagination/Pagination";

interface MovieListProps {
  url: string;
  renderItem?: (movie: Movie) => React.ReactNode;
}

const MovieList = ({ url, renderItem }: MovieListProps) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const finalUrl = url.includes("?")
    ? `${url}&page=${page}`
    : `${url}?page=${page}`;

  const { data, error, loading } = useFetch<PaginatedResponse<Movie>>(finalUrl);

  const results = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  return (
    <div className={S.MovieRootContainer}>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(next) => {
          if (next >= 1 && next <= totalPages) setPage(next);
        }}
      />

      <div className={S.MovieListContainer}>
        {error ? (
          <Error />
        ) : loading ? (
          <Loading />
        ) : results.length === 0 ? null : (
          results.map((movie) =>
            renderItem ? (
              <div key={movie.id}>{renderItem(movie)}</div>
            ) : (
              <MovieItem
                key={movie.id}
                movie={movie}
                onClick={() => navigate(`/movies/${movie.id}`)}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default MovieList;
