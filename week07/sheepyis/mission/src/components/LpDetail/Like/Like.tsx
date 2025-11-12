import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import * as S from "./styles/LikeStyle";
import { useLikeMutation } from "../../../hooks/lps/useLikeMutation";
import { useUserQuery } from "../../../hooks/auth/useUserQuery";

interface LikeProps {
  lpId: number;
  initialCount: number;
  likes: { id: number; userId: number; lpId: number }[];
}

const Like = ({ lpId, initialCount, likes }: LikeProps) => {
  const { data: user } = useUserQuery();
  const userId = user?.id;

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);

  const { addLike, removeLike } = useLikeMutation();

  useEffect(() => {
    if (userId && likes.some((like) => like.userId === userId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [userId, likes]);

  useEffect(() => {
    setLikeCount(initialCount);
  }, [initialCount]);

  const handleLikeToggle = () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
      removeLike.mutate(lpId);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      addLike.mutate(lpId);
    }
  };

  return (
    <div className={S.LikeContainer}>
      <button onClick={handleLikeToggle}>
        {isLiked ? (
          <AiFillHeart className="text-[1.5vw] text-pink-500" />
        ) : (
          <AiOutlineHeart className="text-[1.5vw] text-white hover:text-pink-400" />
        )}
      </button>
      <p className={`${S.LikeP} !text-white`}>{likeCount}</p>
    </div>
  );
};

export default Like;
