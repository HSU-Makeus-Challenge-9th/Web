import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";

type Props = {
  movie: Movie;
};

const Item = ({ movie }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movies/${movie.id}`)}
      className="group relative w-48 h-72 rounded-lg overflow-hidden cursor-pointer 
                      shadow-md hover:shadow-lg transition-shadow">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 
      transition-opacity duration-200 flex flex-col justify-center items-center px-4 text-center text-white gap-2">
        <h3 className="text-base font-semibold leading-snug line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-xs font-light leading-relaxed line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default Item;
