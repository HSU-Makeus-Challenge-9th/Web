import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/movie/LodingSpinner";
import ErrorMessage from "../components/movie/Error";
import { useFetchMovieDetail } from "../hooks/useFetch";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const { movieDetails, credits, loading, error } =
    useFetchMovieDetail(movieId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movieDetails || !credits) {
    return <ErrorMessage message="영화 정보를 찾을 수 없습니다." />;
  }

  const mainCast = credits.cast.slice(0, 8);
  const mainCrew = credits.crew
    .filter((person) =>
      ["Director", "Writer", "Producer", "Screenplay"].includes(person.job)
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: movieDetails.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
              : movieDetails.poster_path
              ? `url(https://image.tmdb.org/t/p/original${movieDetails.poster_path})`
              : "linear-gradient(to bottom, #000000, #1a1a1a)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          ></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold mb-6 text-white">
                {movieDetails.title}
              </h1>
              <div className="flex items-center gap-6 mb-6 text-xl text-white">
                <span className="font-semibold">
                  평균 {movieDetails.vote_average.toFixed(1)}
                </span>
                <span>{new Date(movieDetails.release_date).getFullYear()}</span>
                <span>{movieDetails.runtime}분</span>
              </div>
              {movieDetails.overview && (
                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-white max-w-3xl">
                    {movieDetails.overview}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-8 text-white">감독/출연</h2>
          <div className="grid grid-cols-10 gap-6">
            {mainCast.map((person) => (
              <div key={person.id} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3 bg-gray-800">
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w276_and_h350_face${person.profile_path}`}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-white text-center mb-1">
                  {person.name}
                </p>
                <p className="text-xs text-gray-400 text-center">
                  {person.character} (voice)
                </p>
              </div>
            ))}
          </div>
          {mainCrew.length > 0 && (
            <div className="mt-12">
              <h3 className="text-3xl font-bold mb-6 text-white">제작진</h3>
              <div className="grid grid-cols-6 gap-6">
                {mainCrew.map((person) => (
                  <div key={person.id} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-gray-800">
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w276_and_h350_face${person.profile_path}`}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-white text-center mb-1">
                      {person.name}
                    </p>
                    <p className="text-xs text-gray-400 text-center">
                      {person.job}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
