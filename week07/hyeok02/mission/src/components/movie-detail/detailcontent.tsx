import type { LpDetailDataType } from "../../types/lp";
import TagItem from "./credit";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEditLp } from "../../hooks/useeditlp";
import { useDeleteLp } from "../../hooks/usedeletelp";
import { useLikeLp } from "../../hooks/uselikelp";
import { useUnlikeLp } from "../../hooks/useunlikelp";
import { useState } from "react";

interface Props {
  lp: LpDetailDataType;
}

const LPDetailContent = ({ lp }: Props) => {
  const tags = lp.tags ?? [];
  const timeAgo = formatDistanceToNow(new Date(lp.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  const navigate = useNavigate();
  const lpid = lp.id;

  const { mutate: editLp } = useEditLp(lpid);
  const { mutate: deleteLp } = useDeleteLp(lpid);
  const { mutate: likeLp } = useLikeLp(lpid);
  const { mutate: unlikeLp } = useUnlikeLp(lpid);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(lp.title);

  const [isLiked, setIsLiked] = useState(lp.isLikedByCurrentUser);
  const [likeCount, setLikeCount] = useState(lp.likes.length);

  const handleEditToggle = () => {
    if (isEditing) {
      editLp({
        title: editedTitle,
        content: lp.content,
        thumbnail: lp.thumbnail,
        tags: lp.tags.map(tag => tag.name),
        published: lp.published,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteLp(undefined, {
        onSuccess: () => navigate("/"),
      });
    }
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      unlikeLp();
    } else {
      setLikeCount((prev) => prev + 1);
      likeLp();
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="p-6 bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {lp.author.avatar ? (
              <img
                src={lp.author.avatar}
                alt={lp.author.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-600" />
            )}
            <span className="font-medium">{lp.author.name}</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            <span className="text-sm">{timeAgo}</span>
            <button onClick={handleEditToggle} className="cursor-pointer">
              {isEditing ? "완료" : <AiOutlineEdit />}
            </button>
            <AiOutlineDelete className="cursor-pointer" onClick={handleDelete} />
          </div>
        </div>

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
        ) : (
          <h1 className="text-3xl font-bold mb-6">{lp.title}</h1>
        )}

        <div className="relative w-72 h-72 bg-gray-700 rounded-full overflow-hidden mx-auto mb-6">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-full object-cover transform rotate-90 animate-spin-slow"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-white" />
          </div>
        </div>

        <p className="text-gray-300 mb-6 whitespace-pre-line">{lp.content}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <TagItem key={tag.id} tag={tag} />
          ))}
        </div>

        <div
          onClick={handleLikeToggle}
          className="flex items-center justify-center text-gray-400 cursor-pointer"
        >
          {isLiked ? (
            <AiFillHeart className="text-2xl mr-2 text-red-500" />
          ) : (
            <AiOutlineHeart className="text-2xl mr-2" />
          )}
          <span>{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default LPDetailContent;
