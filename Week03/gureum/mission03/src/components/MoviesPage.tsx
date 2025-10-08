import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import type { Movie, MovieResponse } from '../types/movie';

interface MoviesPageProps {
  endpoint: string;
  title: string;
}

const MoviesPage: React.FC<MoviesPageProps> = ({ endpoint, title }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2U0MzdhMmNjNmYwNjVjYmFmNThjMzJkMDExZjU5OCIsIm5iZiI6MTczMTk4NjQ4MS4xOTgwMDAyLCJzdWIiOiI2NzNjMDQzMTE5YWMzMmNlYjFiZDE0Y2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5eibycdwkNu8BIyQWDu4jNHVfElVG6UX1-KjOgljbNc`,
            },
          }
        );
        
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError('영화 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
        console.error('API 호출 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4 mx-auto"></div>
          <p className="text-xl">영화 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-xl text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">{title}</h1>
      
      {/* 페이지네이션 */}
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`w-12 h-12 rounded-full font-bold text-xl transition-colors ${
            currentPage === 1
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-pink-500 text-white hover:bg-pink-600'
          }`}
        >
          &lt;
        </button>
        
        <span className="text-gray-800 font-semibold mx-4">
          {currentPage} / {totalPages}
        </span>
        
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className={`w-12 h-12 rounded-full font-bold text-xl transition-colors ${
            currentPage >= totalPages
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-pink-500 text-white hover:bg-pink-600'
          }`}
        >
          &gt;
        </button>
      </div><br />
      {/* 영화 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
        {movies?.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            {/* 포스터 이미지 */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover transition-all duration-300 group-hover:blur-sm group-hover:brightness-50"
              onError={(e) => {
                e.currentTarget.src = '/api/placeholder/300/450';
              }}
            />
            
            {/* 호버 시 나타나는 정보 */}
            <div className="absolute inset-0 bg-grey bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-100">
              <h3 className="text-lg font-bold text-center mb-2 text-white">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-300 text-center line-clamp-4 overflow-hidden">
                {movie.overview}
              </p>
              <div className="mt-2 text-yellow-400 font-semibold">
                ⭐ {movie.vote_average.toFixed(1)}
              </div>
              <div className="mt-1 text-gray-400 text-xs">
                {movie.release_date}
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default MoviesPage;