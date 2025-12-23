import { memo } from "react";

interface ICountButton {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
  console.log("♥️ CountButton이 렌더링 됨!");

  return (
    <>
      <button
        className="bg-blue-300 px-2 py-1 rounded-md hover:bg-blue-400 duration-300 ease-in-out cursor-pointer shadow-md"
        onClick={() => onClick(10)}
      >
        카운트 증가
      </button>
    </>
  );
};

export default memo(CountButton);
