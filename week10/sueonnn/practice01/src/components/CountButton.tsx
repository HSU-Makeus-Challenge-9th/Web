import React, { memo } from "react";

interface ICountButton {
  onClick: (num: number) => void;
}

// React.memo로 감싸서 Props가 안 변하면 리렌더링 방지
const CountButton = memo(({ onClick }: ICountButton) => {
  console.log("CountButton 렌더링됨!");
  return (
    <button
      onClick={() => onClick(10)}
      style={{ border: "1px solid black", padding: "10px" }}
    >
      10 증가
    </button>
  );
});

export default CountButton;
