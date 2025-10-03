import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      key={movie.id}
      className="relative group cursor-pointer"
      onClick={handleOnclick}
    >
      <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 group-hover:blur-sm"
        />
        <div // 호버 하면 나타나겎ㅡㅁ.. opacity:0 아예 안보임 / 100 호버 될때 보임!
          className="absolute inset-0 
                      opacity-0              
                      group-hover:opacity-100
                      transition-opacity  
                      duration-300
                      text-white
                      flex flex-col items-center gap-4
                      m-4
                      "
        >
          <h3 className="text-2xl">{movie.title}</h3>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
