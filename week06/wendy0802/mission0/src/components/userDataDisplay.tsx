import { useState } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";

interface WelcomeData {
  id: number;
  name: string;
  email: string;
}

export const WelcomeData = () => {
  const [userId, setUserId] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleChangeUser = (): void => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    setUserId(randomId);
  };

  const handleTestRetry = (): void => {
    setUserId(999999);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 상단 고정 툴바 */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "16px",
          zIndex: 10,
          background: "transparent",
        }}
      >
        <button onClick={handleChangeUser}>다른 사용자 불러오기</button>
        <button onClick={(): void => setIsVisible(!isVisible)}>
          컴포넌트 토글 (언마운트 테스트)
        </button>
        <button onClick={handleTestRetry} style={{ background: "#ff9800", color: "white" }}>
          재시도 테스트 (404 에러)
        </button>
      </div>

      {/* 콘텐츠 영역 - 화면 가운데 정렬 */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          paddingTop: "100px",
        }}
      >
        {isVisible && <UserDataDisplay userId={userId} />}
      </div>
    </div>
  );
};

export const UserDataDisplay = ({ userId }: { userId: number }) => {
  const { data, isPending, isError } = useCustomFetch<WelcomeData>(
    `http://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (isPending) {
    return <div style={{ textAlign: "center" }}>Loading... (User ID: {userId})</div>;
  }

  if (isError) {
    return <div style={{ textAlign: "center" }}>Error Occurred</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
      <p style={{ fontSize: "12px", color: "#666" }}>User ID: {data?.id}</p>
    </div>
  );
};