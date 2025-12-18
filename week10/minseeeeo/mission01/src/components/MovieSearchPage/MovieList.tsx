import { memo, useMemo } from "react";
import { useMovie } from "../../hooks/queries/useMovie";
import MovieCard from "./MovieCard";

interface IMovieList {
  search: string;
  adultChecked: boolean;
  language: string;
}

const MovieList = ({ search, adultChecked, language }: IMovieList) => {
  const { data: searchData } = useMovie({
    params: {
      query: search,
      include_adult: adultChecked,
      language: language,
    },
  });

  // adultChecked 상태에 따라 데이터 필터링 - useMemo로 최적화
  const filteredMovies = useMemo(() => {
    return adultChecked
      ? searchData?.results
      : searchData?.results?.filter((movie) => !movie.adult);
  }, [searchData, adultChecked]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-6">
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default memo(MovieList);
