interface calculateTimeAgoProps {
  date: Date | string;
  setTimeAgo: (timeAgo: string) => void;
}

export const calculateTimeAgo = ({
  date,
  setTimeAgo,
}: calculateTimeAgoProps) => {
  const now = new Date();
  try {
    if (!date) return;
    const updatedTime = new Date(date);

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
