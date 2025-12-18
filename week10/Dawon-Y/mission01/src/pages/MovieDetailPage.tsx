import { useParams, useNavigate } from 'react-router-dom';

export const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto min-h-screen px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        ← 뒤로 가기
      </button>

      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-4xl font-bold">영화 ID: {movieId}</h1>
        <p className="mt-4 text-gray-600">영화 상세 페이지입니다.</p>
      </div>
    </div>
  );
};