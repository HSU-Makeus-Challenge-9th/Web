import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { MovieDetails, Credits } from "../types/MovieDetail";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트가 마운트될 때 body 배경색을 검정으로 변경
  useEffect(() => {
    const originalBodyStyle = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'black';
    
    // 컴포넌트가 언마운트될 때 원래 배경색으로 복구
    return () => {
      document.body.style.backgroundColor = originalBodyStyle;
    };
  }, []);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) return;

      try {
        setIsLoading(true);
        setError(null);

        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get<MovieDetails>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);

        setMovieDetails(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('영화 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'black' }}>
        <div className="flex flex-col items-center space-y-4">
          <div 
            style={{
              width: '64px',
              height: '64px',
              border: '4px solid #333333',
              borderTop: '4px solid #ffffff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              backgroundColor: 'black'
            }}
          ></div>
          <p style={{ color: 'white' }} className="text-lg">영화 정보를 불러오는 중...</p>
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

  if (error || !movieDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'black' }}>
        <div className="text-center space-y-4 p-8">
          <div style={{ color: 'white' }} className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold" style={{ color: 'white' }}>오류가 발생했습니다</h2>
          <p className="max-w-md" style={{ color: 'white' }}>{error || '영화 정보를 찾을 수 없습니다.'}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-6 py-2 rounded-lg transition-colors duration-200"
            style={{ backgroundColor: 'white', color: 'black' }}
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const director = credits?.crew.find(person => person.job === 'Director');
  const mainCast = credits?.cast.slice(0, 10) || [];

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      {/* 히어로 섹션 */}
      <div 
        style={{
          background: movieDetails.backdrop_path 
            ? `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%), url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
            : 'black',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          padding: '60px 40px 40px',
          color: 'white',
        }}
      >
        <div className="max-w-4xl">
          {/* 영화 제목 */}
          <h1 className="text-6xl font-bold mb-4 leading-tight" style={{ color: 'white' }}>
            {movieDetails.title}
          </h1>

          {/* 기본 정보 */}
          <div className="text-lg mb-6 space-y-5" style={{ color: 'white' }}>
            <div className="flex items-center space-x-2">
              <span style={{ color: 'white' }}>★</span>
              <span className="font-semibold">{movieDetails.vote_average.toFixed(1)}</span>
            </div>
            <div>{movieDetails.release_date?.split('-')[0]}</div>
            <div>{formatRuntime(movieDetails.runtime)}</div>
          </div>

          {/* 태그라인 */}
          {movieDetails.tagline && (
            <p className="text-xl italic mb-8 max-w-3xl" style={{ color: 'white' }}>
              {movieDetails.tagline}
            </p>
          )}

          {/* 줄거리 */}
          <div className="max-w-3xl">
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'white' }}>
              {movieDetails.overview || '줄거리가 제공되지 않았습니다.'}
            </p>
          </div>

          {/* 감독 정보 */}
          {director && (
            <div className="mb-8">
              <p className="text-sm mb-2" style={{ color: 'white' }}>감독</p>
              <p className="text-xl font-medium" style={{ color: 'white' }}>{director.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* 출연진/제작진 섹션 */}
      <div style={{ backgroundColor: 'black', padding: '48px 32px' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'white' }}>감독/출연</h2>
          
          {/* 출연진 그리드 */}
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 xl:grid-cols-18 gap-3">
            {/* 감독 먼저 표시 */}
            {director && (
              <div className="text-center">
                {director.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                    alt={director.name}
                    style={{ width: '60px', height: '60px' }}
                    className="object-cover rounded-full mb-2 mx-auto"
                  />
                ) : (
                  <div 
                    style={{ width: '60px', height: '60px', backgroundColor: 'black', border: '1px solid white' }}
                    className="rounded-full mb-2 flex items-center justify-center mx-auto"
                  >
                    <span style={{ color: 'white' }} className="text-xs">사진</span>
                  </div>
                )}
                <h4 className="font-semibold mb-1 text-xs truncate" style={{ color: 'white' }}>
                  {director.name}
                </h4>
                <p className="text-xs" style={{ color: 'white' }}>감독</p>
              </div>
            )}

            {/* 출연진 */}
            {mainCast.map((actor) => (
              <div key={actor.id} className="text-center">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    style={{ width: '60px', height: '60px' }}
                    className="object-cover rounded-full mb-2 mx-auto"
                  />
                ) : (
                  <div 
                    style={{ width: '60px', height: '60px', backgroundColor: 'black', border: '1px solid white' }}
                    className="rounded-full mb-2 flex items-center justify-center mx-auto"
                  >
                    <span style={{ color: 'white' }} className="text-xs">사진</span>
                  </div>
                )}
                <h4 className="font-semibold mb-1 text-xs truncate" style={{ color: 'white' }}>
                  {actor.name}
                </h4>
                <p className="text-xs truncate" style={{ color: 'white' }} title={actor.character}>
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 추가 정보 */}
      <div style={{ backgroundColor: 'black', padding: '32px', borderTop: '1px solid white' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            {/* 장르 */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'white' }}>장르</h3>
              <div className="flex flex-wrap gap-2">
                {movieDetails.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="px-2 py-1 rounded text-xs"
                    style={{ marginRight: '10px'}}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 제작 정보 */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'white' }}>제작 정보</h3>
              <div className="space-y-2" style={{ color: 'white' }}>
                <div>상태: <span>{movieDetails.status}</span></div>
                <div>예산: <span>
                  {movieDetails.budget > 0 ? `$${movieDetails.budget.toLocaleString()}` : '정보 없음'}
                </span></div>
                <div>수익: <span>
                  {movieDetails.revenue > 0 ? `$${movieDetails.revenue.toLocaleString()}` : '정보 없음'}
                </span></div>
              </div>
            </div>

            {/* 제작사 */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'white' }}>제작사</h3>
              <div className="space-y-1" style={{ color: 'white' }}>
                {movieDetails.production_companies.slice(0, 3).map(company => (
                  <div key={company.id} className="text-sm">
                    {company.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}