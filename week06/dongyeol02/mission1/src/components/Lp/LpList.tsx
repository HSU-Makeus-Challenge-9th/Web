import { Link } from "react-router-dom";
import { useLps } from "../../hooks/useLps";
import LpSkeletonList from "../skeleton/LpSkeletonList";

const LpList = () => {
  const { data, isLoading, isError, error, queryParams, toggleOrder, refetch } =
    useLps();

  // --- 1. 로딩 상태 처리 (스켈레톤/스피너 대신 텍스트로 대체) ---
  if (isLoading) {
    return <LpSkeletonList />;
  }

  // --- 2. 에러 상태 처리 (재시도 버튼 포함) ---
  if (isError) {
    return (
      <div style={{ padding: "20px", color: "red", border: "1px solid red" }}>
        <p>⚠️ 데이터 로딩 중 에러 발생: {error?.message}</p>
        <button
          onClick={() => refetch()}
          style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer" }}
        >
          다시 시도 (Refetch)
        </button>
      </div>
    );
  }

  // --- 3. 성공 시 데이터 렌더링 ---
  console.log(data);
  return (
    <div style={{ padding: "20px" }}>
      {/* 정렬 버튼 UI (생략) */}
      <button
        onClick={toggleOrder}
        className="px-4 py-2 cursor-pointer mb-5 bg-gray-200 rounded-2xl" // Tailwind 클래스로 변경 (선택사항)
      >
        {queryParams.order === "desc" ? "최신순 (Desc)" : "오래된순 (Asc)"}
      </button>

      <ul className="grid grid-cols-5 gap-4">
        {data?.map((lp) => (
          <Link
            key={lp.id}
            to={`/lp/${lp.id}`}
            className="relative overflow-hidden group"
          >
            <li key={lp.id}>
              <img
                src={lp.thumbnail}
                alt={lp.title + " 썸네일"}
                className="w-full h-auto object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-black/30 bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 
                         flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 text-white"
              >
                <h3 className="text-lg font-bold truncate">{lp.title}</h3>{" "}
                {/* 제목 */}
                <p className="text-sm text-gray-300">
                  업로드일: {new Date(lp.createdAt).toLocaleDateString()}
                </p>{" "}
                {/* 업로드일 */}
                <p className="text-sm font-semibold mt-1">
                  ❤️ 좋아요: {lp.likes?.length ?? 0}
                </p>{" "}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default LpList;
