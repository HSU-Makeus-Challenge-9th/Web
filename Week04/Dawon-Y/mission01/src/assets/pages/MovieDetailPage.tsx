import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorView from "../components/ErrorView";
import PersonCard from "../components/PersonCard";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { formatRuntime } from "../utils/movie";
import { IMAGE_BASE_URL, MAIN_CAST_LIMIT, PRODUCTION_COMPANIES_LIMIT } from "../constants/movie";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const { movieDetails, credits, isLoading, error } = useMovieDetails(movieId);

  useEffect(() => {
    const originalBodyStyle = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'black';
    
    return () => {
      document.body.style.backgroundColor = originalBodyStyle;
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="영화 정보를 불러오는 중..." variant="dark" />;
  }

  if (error || !movieDetails) {
    return (
      <ErrorView 
        message={error || '영화 정보를 찾을 수 없습니다.'} 
        onBack={() => window.history.back()}
        variant="dark"
      />
    );
  }

  const director = credits?.crew.find((person) => person.job === 'Director');
  const mainCast = credits?.cast.slice(0, MAIN_CAST_LIMIT) || [];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div 
        className="min-h-[60vh] px-10 py-16 bg-cover bg-center"
        style={{
          backgroundImage: movieDetails.backdrop_path 
            ? `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%), url(${IMAGE_BASE_URL}/original${movieDetails.backdrop_path})`
            : undefined,
        }}
      >
        <div className="max-w-8xl mx-auto">
          <h1 className="text-6xl font-bold mb-4 leading-tight">
            {movieDetails.title}
          </h1>

          <div className="text-lg mb-6 space-y-5">
            <div className="flex items-center space-x-2">
              <span>★</span>
              <span className="font-semibold">{movieDetails.vote_average.toFixed(1)}</span>
            </div>
            <div>{movieDetails.release_date?.split('-')[0]}</div>
            <div>{formatRuntime(movieDetails.runtime)}</div>
          </div>

          {movieDetails.tagline && (
            <p className="text-xl italic mb-8 max-w-3xl">
              {movieDetails.tagline}
            </p>
          )}

          <div className="max-w-10xl">
            <p className="text-lg leading-relaxed mb-8">
              {movieDetails.overview || '줄거리가 제공되지 않았습니다.'}
            </p>
          </div>

          {director && (
            <div className="mb-8">
              <p className="text-sm mb-2">감독</p>
              <p className="text-xl font-medium">{director.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cast & Crew Section */}
      <div className="bg-black px-10 py-12">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">감독/출연</h2>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {director && (
              <PersonCard
                name={director.name}
                role="감독"
                profilePath={director.profile_path}
              />
            )}

            {mainCast.map((actor) => (
              <PersonCard
                key={actor.id}
                name={actor.name}
                role={actor.character}
                profilePath={actor.profile_path}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-black px-10 py-8 border-t border-white">
        <div className="max-w-8xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-lg font-semibold mb-3">장르</h3>
              <div className="flex flex-wrap gap-2">
                {movieDetails.genres.map((genre) => (
                  <span key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">제작 정보</h3>
              <div className="space-y-2">
                <div>상태: <span>{movieDetails.status}</span></div>
                <div>예산: <span>
                  {movieDetails.budget > 0 ? `$${movieDetails.budget.toLocaleString()}` : '정보 없음'}
                </span></div>
                <div>수익: <span>
                  {movieDetails.revenue > 0 ? `$${movieDetails.revenue.toLocaleString()}` : '정보 없음'}
                </span></div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">제작사</h3>
              <div className="space-y-1">
                {movieDetails.production_companies.slice(0, PRODUCTION_COMPANIES_LIMIT).map((company) => (
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