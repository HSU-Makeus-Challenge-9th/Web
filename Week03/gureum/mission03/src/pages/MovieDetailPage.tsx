import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { MovieDetails, Credits } from '../types/movie';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) return;

      try {
        setIsLoading(true);
        setError(null);

        // 영화 상세 정보와 크레딧 정보를 동시에 요청
        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get<MovieDetails>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2U0MzdhMmNjNmYwNjVjYmFmNThjMzJkMDExZjU5OCIsIm5iZiI6MTczMTk4NjQ4MS4xOTgwMDAyLCJzdWIiOiI2NzNjMDQzMTE5YWMzMmNlYjFiZDE0Y2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5eibycdwkNu8BIyQWDu4jNHVfElVG6UX1-KjOgljbNc`,
              },
            }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2U0MzdhMmNjNmYwNjVjYmFmNThjMzJkMDExZjU5OCIsIm5iZiI6MTczMTk4NjQ4MS4xOTgwMDAyLCJzdWIiOiI2NzNjMDQzMTE5YWMzMmNlYjFiZDE0Y2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5eibycdwkNu8BIyQWDu4jNHVfElVG6UX1-KjOgljbNc`,
              },
            }
          ),
        ]);

        setMovieDetails(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        setError('영화 정보를 불러오는데 실패했습니다. 다시 시도해주세요.');
        console.error('API 호출 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mb-4 mx-auto"></div>
          <p className="text-xl">영화 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !movieDetails) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😅</div>
          <p className="text-xl text-red-500 mb-4">{error || '영화를 찾을 수 없습니다.'}</p>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const director = credits?.crew.find(person => person.job === 'Director');
  const mainCast = credits?.cast.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* 배경 이미지가 있는 히어로 섹션 */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: movieDetails.backdrop_path 
            ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* 포스터 이미지 */}
            <div className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="w-80 rounded-xl shadow-2xl border-4 border-white"
                onError={(e) => {
                  e.currentTarget.src = '/api/placeholder/300/450';
                }}
              />
            </div>

            {/* 영화 정보 */}
            <div className="flex-1 text-white">
              <div className="mb-4">
                <Link
                  to="/"
                  className="bg-white/20 p-3 rounded inline-flex items-center text-white/80 hover:text-white transition-colors mb-4"
                >
                  ← 뒤로가기
                </Link>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                {movieDetails.title}
              </h1>
              
              {movieDetails.tagline && (
                <p className="text-xl italic text-gray-200 mb-6">
                  "{movieDetails.tagline}"
                </p>
              )}

              {/* 평점 및 기본 정보 */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-2xl mr-2">⭐</span>
                  <span className="text-xl font-semibold">
                    {movieDetails.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-300 ml-1">
                    ({movieDetails.vote_count.toLocaleString()} 평가)
                  </span>
                </div>
                
                <div className="text-lg">
                  {movieDetails.release_date} • {movieDetails.runtime}분
                </div>
              </div>

              {/* 장르 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movieDetails.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* 감독 정보 */}
              {director && (
                <div className="mb-6">
                  <span className="text-gray-300">감독: </span>
                  <span className="font-semibold">{director.name}</span>
                </div>
              )}

              {/* 줄거리 */}
              <div>
                <h2 className="text-2xl font-bold mb-3">줄거리</h2>
                <p className="text-lg leading-relaxed text-gray-200">
                  {movieDetails.overview || '줄거리 정보가 없습니다.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 출연진 섹션 */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">주요 출연진</h2>
        
        {mainCast.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {mainCast.map((actor) => (
              <div key={actor.id} className="text-center group">
                <div className="relative overflow-hidden rounded-lg mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : '/api/placeholder/150/225'
                    }
                    alt={actor.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {actor.name}
                </h3>
                <p className="text-sm text-gray-600">{actor.character}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">출연진 정보가 없습니다.</p>
        )}
      </div>

      {/* 추가 정보 섹션 */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">상세 정보</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">기본 정보</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">원제:</span> {movieDetails.original_title}</p>
                <p><span className="font-medium">상태:</span> {movieDetails.status}</p>
                <p><span className="font-medium">언어:</span> {movieDetails.original_language.toUpperCase()}</p>
                <p><span className="font-medium">인기도:</span> {movieDetails.popularity.toFixed(1)}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">박스오피스</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">제작비:</span> {movieDetails.budget ? `$${movieDetails.budget.toLocaleString()}` : '정보 없음'}</p>
                <p><span className="font-medium">수익:</span> {movieDetails.revenue ? `$${movieDetails.revenue.toLocaleString()}` : '정보 없음'}</p>
              </div>
            </div>

            {movieDetails.homepage && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">링크</h3>
                <a
                  href={movieDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  공식 웹사이트 →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;