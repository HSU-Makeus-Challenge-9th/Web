import React from 'react';

type CountButtonProps = {
  onClick: (value: number) => void;
  value?: number;
};

const CountButton = ({ onClick, value = 10 }: CountButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className="mt-2 inline-flex items-center rounded-xl border border-gray-300 
                 px-4 py-2 text-lg font-medium shadow-sm
                 hover:bg-gray-100 active:scale-95 transition"
    >
      카운트 증가
    </button>
  );
};

export default React.memo(CountButton);