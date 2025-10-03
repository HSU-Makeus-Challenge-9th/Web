import React from "react";
import { useParams } from "react-router-dom";

const MovieDetailPage: React.FC = () => {
  // URL 경로에서 동적 매개변수 (movie_id)를 가져옵니다.
  const { movie_id } = useParams<{ movie_id: string }>();

  // 실제 구현에서는 movie_id를 사용하여 TMDB 디테일 API를 호출해야 합니다.
  // 이 부분은 여러분의 추가 미션 영역입니다.

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">🎬 영화 상세 정보 페이지</h1>
      <p className="text-xl">
        현재 선택된 영화 ID: <span className="text-yellow-400">{movie_id}</span>
      </p>
      <div className="mt-8 p-6 bg-gray-800 rounded-lg max-w-lg mx-auto">
        <p>
          TMDB의 `/movie/{movie_id}` 엔드포인트를 호출하여 상세 정보를 채우세요.
        </p>
        <p className="text-sm mt-3 text-gray-400">
          이 페이지는 라우팅 확인용입니다.
        </p>
      </div>
    </div>
  );
};

export default MovieDetailPage;
