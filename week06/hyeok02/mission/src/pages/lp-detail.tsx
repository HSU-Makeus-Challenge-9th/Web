import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../apis/axios";
import Spinner from "../components/spinner";
import LPDetailContent from "../components/movie-detail/detailcontent";
import { AiOutlineComment } from "react-icons/ai";
import CommentsSection from "../components/comments/comments";
import { fetchCurrentUserInfo } from "../hooks/userinfo";  
import type { LpDetailDataType } from "../types/lp";

const LPDetailPage: React.FC = () => {
  const { Lpid } = useParams<{ Lpid: string }>();
  const [lp, setLp] = useState<LpDetailDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null); // ✅ 추가

  useEffect(() => {
    if (!Lpid) return;
    (async () => {
      setLoading(true);
      try {
        const resp = await axios.get<{ data: LpDetailDataType }>(`/v1/lps/${Lpid}`);
        setLp(resp.data.data);

        const userInfo = await fetchCurrentUserInfo();
        if (userInfo) setCurrentUserId(userInfo.id);

      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [Lpid]);

  if (loading) return <Spinner />;
  if (error || !lp)
    return (
      <p className="text-red-500 text-center mt-10">
        LP 정보를 불러오는 중 에러가 발생했습니다.
      </p>
    );

  return (
    <div className="px-20 py-6 text-white">
      <LPDetailContent lp={lp} />
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setShowComments(v => !v)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-200"
        >
          <AiOutlineComment size={20} />
          <span className="text-sm">
            {showComments ? "댓글 숨기기" : "댓글 보기"}
          </span>
        </button>
      </div>
      {showComments && currentUserId !== null && (
        <div className="mt-6">
          <CommentsSection lpid={Number(Lpid)} currentUserId={currentUserId} />
        </div>
      )}
    </div>
  );
};

export default LPDetailPage;
