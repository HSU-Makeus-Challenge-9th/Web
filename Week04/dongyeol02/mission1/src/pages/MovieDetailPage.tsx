import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hook/useMovieDetail";
import LoadingSpinner from "../component/LoadingSpinner";
import MovieDetailCard from "../component/MovidDetail/MovieDetailCard";
import { useCredit } from "../hook/useCredit";
import ProfileCard from "../component/MovidDetail/ProfileCard";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // 영화 디테일 받아오기
  const {
    movieDetail,
    loading: movieLoading,
    error: movieError,
  } = useMovieDetail(movieId!);

  // 크레딧 받아오기
  const {
    credits,
    loading: creditsLoading,
    error: creditsError,
  } = useCredit(movieId!);

  // 로딩 처리!!!
  if (movieLoading || creditsLoading) {
    return <LoadingSpinner message="영화 정보를 불러오는 중..." size="lg" />;
  }

  // 에러 처리
  if (movieError)
    return <div className="text-center text-red-500 p-8">{movieError}</div>;

  if (creditsError)
    return <div className="text-center text-red-500 p-8">{creditsError}</div>;

  console.log(credits?.cast);

  return (
    <div className="flex flex-col h-screen">
      {/*위쪽 절반: 포스터 영역*/}
      <div className="h-1/2 p-5">
        <MovieDetailCard movieDetail={movieDetail!} />
      </div>

      {/*아래쪽 절반: 감독/출연진 영역*/}
      <div className="h-1/2 p-8 bg-white overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">감독/출연진</h2>

        {/*출연진 데이터가 있는지 확인 하고 map을 통해 프로필 카드 뿌리기 */}
        {credits?.cast && credits.cast.length > 0 ? (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2">
            {credits.cast.slice(0, 20).map((actor, index) => (
              <ProfileCard
                key={index}
                id={actor.id}
                name={actor.name}
                character={actor.character}
                profilePath={actor.profile_path}
              />
            ))}
          </div>
        ) : (
          // 출연진 정보가 없을 때 표시
          <div className="text-center text-gray-500 py-12">
            <p>출연진 정보가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
