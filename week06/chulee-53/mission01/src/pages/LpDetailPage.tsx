import { useParams, useNavigate } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { Edit2, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../apis/lp";

const LpDetailPage = () => {
  const { id } = useParams();
  const lpId = Number(id);
  const navigate = useNavigate();

  const { data: lp, isPending, isError } = useGetLpDetail(lpId);

  const mutation = useMutation({
    mutationFn: () => deleteLp(lpId),
    onSuccess: () => {
      alert("LP가 성공적으로 삭제되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      console.error("LP 삭제 실패:", error);
      alert("LP 삭제 중 오류가 발생했습니다.");
    },
  });

  if (isPending)
    return <div className="text-center text-gray-400 mt-10">로딩 중...</div>;
  if (isError)
    return <div className="text-center text-red-400 mt-10">불러오기 실패</div>;
  if (!lp)
    return (
      <div className="text-center text-gray-400 mt-10">데이터가 없습니다.</div>
    );

  const formattedDate = new Date(lp.updatedAt).toLocaleDateString("ko-KR");

  const handleDelete = () => {
    if (confirm("정말로 이 LP를 삭제하시겠습니까?")) {
      mutation.mutate();
    }
  };

  return (
    <div className="flex justify-center px-4 py-10 text-white min-h-screen">
      <div className="bg-neutral-800 rounded-2xl shadow-lg p-6 w-full max-w-2xl flex flex-col items-center">
        {/* 상단 프로필 */}
        <div className="w-full flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <img
              src={lp.author?.avatar}
              alt={lp.author?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{lp.author?.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* 제목 & 버튼 */}
        <div className="w-full flex justify-between items-start mb-4">
          <h1 className="text-lg font-semibold mb-4">{lp.title}</h1>
          <div className="flex gap-2">
            <Edit2 size={16} className="cursor-pointer hover:text-pink-400" />
            <Trash2
              size={16}
              className="cursor-pointer hover:text-pink-400"
              onClick={handleDelete}
            />
          </div>
        </div>

        {/* 썸네일 */}
        <div className="relative flex justify-center items-center w-80 h-80 mb-6 bg-neutral-800 shadow-[0_0_10px_1px_rgba(0,0,0,0.8)]">
          <div className="relative w-72 h-72 rounded-full overflow-hidden animate-[spin_12s_linear_infinite]">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="object-cover w-full h-full rounded-full border-2 border-black"
            />
            <div className="absolute top-1/2 left-1/2 w-13 h-13 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 border border-gray-400" />
          </div>
        </div>

        <p className="text-gray-300 text-center mb-6 max-w-xl leading-relaxed">
          {lp.content}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {lp.tags?.length > 0 ? (
            lp.tags.map((tag: { id: number; name: string }) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-200 hover:bg-pink-600 transition-colors"
              >
                #{tag.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">태그 없음</span>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 text-pink-500 text-lg">
          ❤️ <span>{lp.likes?.length ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
