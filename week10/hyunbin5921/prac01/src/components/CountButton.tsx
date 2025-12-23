import {memo} from 'react'

interface ICountButton {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
  console.log("CountButton Rendered");
  return (
    <>
      <button onClick={() => onClick(10)}className="border p-2 rounded-lg">카운트 증가</button>
    </>
  );
};

export default memo(CountButton)