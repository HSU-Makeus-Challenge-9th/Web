import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import type { Movie, MovieResponse } from "../types/Movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  
  const location = useLocation();
  
  // URL 경로에 따라 카테고리 결정
  const getCategory = () => {
    const path = location.pathname;
    if (path === '/') return 'popular'; // 홈은 인기 영화로
    if (path === '/popular') return 'popular';
    if (path === '/now-playing') return 'now_playing';
    if (path === '/top-rated') return 'top_rated';
    if (path === '/upcoming') return 'upcoming';
    return 'popular';
  };

  const category = getCategory();

  // 카테고리별 API 엔드포인트 매핑
  const getApiEndpoint = (category: string) => {
    const endpoints = {
      popular: 'popular',
      upcoming: 'upcoming',
      top_rated: 'top_rated',
      now_playing: 'now_playing'
    };
    return endpoints[category as keyof typeof endpoints] || 'popular';
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const endpoint = getApiEndpoint(category);
        const { data } = await axios<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${currentPage}`, // 페이지 번호 파라미터 추가
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // API 제한으로 최대 500페이지
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('영화 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, currentPage]); // 카테고리와 currentPage가 변경될 때마다 새로 fetch

  // 카테고리가 바뀔 때 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // 이전 페이지로 이동
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div 
            style={{
              width: '64px',
              height: '64px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #10b981',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          ></div>
          <p className="text-gray-600 text-lg">영화 데이터를 불러오는 중...</p>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800">오류가 발생했습니다</h2>
          <p className="text-gray-600 max-w-md">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 메인 콘텐츠
  return (
    <div className="min-h-screen p-2">
      {/* 페이지네이션 - 영화 카드 위에 */}
      <div 
        className="flex justify-center items-center mb-8 mt-4 space-x-4"
        style={{ marginBottom: '30px' }}
      >
        {/* 이전 페이지 버튼 */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage === 1 ? '#6b7280' : '#f43ee1ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.5 : 1,
            transition: 'all 0.2s'
          }}
        >
          이전
        </button>

        {/* 현재 페이지 정보 */}
        <span className="text-lg font-medium text-gray-700"
          style={{ 
            marginLeft: '20px',
            marginRight: '20px'
          }}
        >
          {currentPage} / {totalPages}
        </span>

        {/* 다음 페이지 버튼 */}
        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage >= totalPages ? '#6b7280' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage >= totalPages ? 0.5 : 1,
            transition: 'all 0.2s'
          }}
        >
          다음
        </button>
      </div>

      {/* 영화 그리드 */}
      <div 
        className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        style={{ gap: '10px' }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>


    </div>
  );
}