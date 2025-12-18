import { useParams } from "react-router-dom";
import useGetLpDetails from "../hooks/queries/useGetLpDetails";
import { useEffect, useState } from "react";
import { Heart, Pencil, Trash } from "lucide-react";
import NotFoundPage from "./NotFoundPage";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import LpComments from "./LpComments";
import { calculateTimeAgo } from "../utils/time";
import useDeleteLp from "../hooks/queries/useDeleteLp";
import LpEditModal from "../components/lp/LpEditModal";
import usePostLike from "../hooks/queries/usePostLike";
import useDeleteLike from "../hooks/queries/useDeleteLike";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const LpDetailsPage = () => {
  const id = useParams().id;
  const lpId = id ? parseInt(id) : 0;
  const { data, isError, isLoading } = useGetLpDetails(lpId);
  const { data: myInfo } = useGetMyInfo();
  const [timeAgo, setTimeAgo] = useState("");
  const { mutate: deleteLpMutate } = useDeleteLp();
  const { mutate: postLikeMutate } = usePostLike(lpId, myInfo?.data.id);
  const { mutate: deleteLikeMutate } = useDeleteLike(lpId, myInfo?.data.id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // n분 전 계산
  useEffect(() => {
    if (!data) return;
    calculateTimeAgo({ date: data.data.updatedAt, setTimeAgo });
  }, [data]);

  const handleDelete = () => {
    if (!id) return;
    if (window.confirm("정말로 이 LP를 삭제하시겠습니까?")) {
      deleteLpMutate(parseInt(id));
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleLike = () => {
    if (!myInfo) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 현재 좋아요 상태 확인
    const isLiked = data?.data.likes.some(
      (like) => like.userId === myInfo.data.id
    );

    // 좋아요 상태에 따라 추가 또는 삭제
    if (isLiked) {
      deleteLikeMutate();
    } else {
      postLikeMutate();
    }
  };

  // 현재 사용자가 좋아요를 눌렀는지 확인
  const isLiked = myInfo
    ? data?.data.likes.some((like) => like.userId === myInfo.data.id)
    : false;

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
            <Pencil
              size={18}
              className="cursor-pointer hover:text-gray-300"
              onClick={handleEdit}
            />
            <Trash
              size={18}
              className="cursor-pointer hover:text-gray-300"
              onClick={handleDelete}
            />
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
          <Heart
            size={30}
            className={`cursor-pointer transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "hover:text-red-500"
            }`}
            onClick={handleLike}
          />
          <span className="text-lg">{data?.data.likes.length}</span>
        </div>

        <LpComments />
      </div>

      {/* LP 수정 모달 */}
      {isEditModalOpen && data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <LpEditModal
            onClose={() => setIsEditModalOpen(false)}
            lpData={data.data}
          />
        </div>
      )}
    </div>
  );
};

export default LpDetailsPage;
