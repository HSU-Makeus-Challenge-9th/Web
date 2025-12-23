import React, { memo } from 'react';

interface ICountButton {
  count: number;
  onClick: () => void;
}

const CountButton = ({ count, onClick }: ICountButton) => {
  console.log("CountButton 렌더링"); // 렌더링 확인용 로그

  return (
    <div className="flex flex-col items-center gap-2">
      <h2>{count}</h2>
      <button
        className="border p-2 rounded-lg bg-gray-400 text-white"
        onClick={onClick}
      >
        카운트 증가
      </button>
    </div>
  );
};

export default memo(CountButton);