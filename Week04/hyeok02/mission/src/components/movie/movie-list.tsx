import type { Movie } from "../../types/movie";
import MovieItem from "./movie-item";

type Props = {
  movies: Movie[];
};

const List = ({ movies }: Props) => {
  return (
    <section className="grid px-2 gap-5 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 select-none">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </section>
  );
};

export default List;
