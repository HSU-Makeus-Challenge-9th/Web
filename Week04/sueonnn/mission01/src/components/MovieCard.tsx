import { useState } from "react";
import { Movie } from "../types/Movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps): Element {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); //useNavigate 훅 호출
  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`; // 이미지 경로 구성
  const altText = `${movie.title} 포스터`;

  const handleCardClick = () => {
    // 카드 클릭 시 상세 페이지로 이동합니다.
    // 설정된 경로: /movie/:movie_id
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick} //클릭 이벤트 핸들러 연결
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
