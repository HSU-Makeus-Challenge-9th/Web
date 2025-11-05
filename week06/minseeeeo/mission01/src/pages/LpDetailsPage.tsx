import { useParams } from "react-router-dom";
import useGetLpDetails from "../hooks/queries/useGetLpDetails";
import { useEffect, useState } from "react";
import { Heart, Pencil, Trash } from "lucide-react";
import NotFoundPage from "./NotFoundPage";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

const LpDetailsPage = () => {
  const id = useParams().id;
  const { data, isError, isLoading } = useGetLpDetails(id ? parseInt(id) : 0);
  const [timeAgo, setTimeAgo] = useState("");

  // n분 전 계산
  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      try {
        if (!data) return;
        const updatedTime = new Date(data.data.updatedAt);

        // 밀리초 단위 차이
        const diffMs = now.getTime() - updatedTime.getTime();

        // 각 단위로 변환
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        // 표시 로직
        if (diffDays > 0) {
          setTimeAgo(`${diffDays}일 전`);
        } else if (diffHours > 0) {
          setTimeAgo(`${diffHours}시간 전`);
        } else if (diffMinutes > 0) {
          setTimeAgo(`${diffMinutes}분 전`);
        } else {
          setTimeAgo("방금 전");
        }
      } catch (error) {
        console.error("Error calculating time ago:", error);
        return;
      }
    };

    calculateTimeAgo();
  }, [data]);

  if (isError) return <NotFoundPage />;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex justify-around items-center bg-black text-white min-h-screen py-8">
      <div className="flex flex-col justify-center items-center gap-3 bg-gray-500 rounded-2xl px-10 py-8 w-[80%]">
        {/* 헤더 (아바타 + 이름 + n일 전) */}
        <div className="flex items-center gap-1 w-full">
          {data?.data.author.avatar && (
            <img
              src={data.data.author.avatar}
              alt={`${data.data.author.name}의 아바타`}
              className="w-5 h-5 rounded-full"
            />
          )}
          <strong>{data?.data.author.name}</strong>
          <span className="ml-auto text-sm text-gray-300">{timeAgo}</span>
        </div>

        {/* 제목, 수정/삭제 */}
        <div className="flex items-center justify-between w-full">
          <span className="text-lg">{data?.data.title}</span>
          <div className="flex gap-2">
            <Pencil size={18} className="cursor-pointer hover:text-gray-300" />
            <Trash size={18} className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>

        <img
          src={data?.data.thumbnail}
          alt={`${data?.data.title}의 썸네일`}
          className="w-100 h-80 rounded-2xl"
        />

        <div>{data?.data.content}</div>

        <div className="flex gap-2 flex-wrap">
          {data?.data.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-600 text-gray-200 rounded-full px-2 py-1 text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4">
          <Heart size={30} className="cursor-pointer hover:text-red-300" />
          <span className="text-lg">{data?.data.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetailsPage;
