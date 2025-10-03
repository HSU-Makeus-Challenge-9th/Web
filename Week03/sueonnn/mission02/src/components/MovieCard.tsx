import { useState } from "react";
import { Movie } from "../types/Movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps): Element {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`; // 이미지 경로 구성

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={movie.title} className="w-full h-auto" />
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black-500/50 to-transparent backdrop-blur-sm flex flex-col justify-center items-center text-white p-4 text-center">
          <h2 className="text-lg font-bold mb-2 line-clamp-2">{movie.title}</h2>
          <p className="text-sm line-clamp-5">{movie.overview}</p>
        </div>
      )}
    </div>
  );
}
