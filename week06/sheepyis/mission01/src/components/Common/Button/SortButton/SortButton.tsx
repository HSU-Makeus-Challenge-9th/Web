import React from "react";
import * as S from "./styles/SortButtonStyle";

interface SortButtonProps {
  order: "asc" | "desc";
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  size?: string;
}

const SortButton = ({ order, setOrder, size = "1vw" }: SortButtonProps) => {
  return (
    <div className={S.SortButtonContainer}>
      <button
        onClick={() => setOrder("asc")}
        className={`px-[1vw] py-[0.5vw] rounded cursor-pointer text-[${size}] ${
          order === "asc" ? "bg-white text-black" : "bg-gray-700 text-white"
        }`}
      >
        오래된 순
      </button>
      <button
        onClick={() => setOrder("desc")}
        className={`px-[1vw] py-[0.5vw] rounded cursor-pointer text-[${size}] ${
          order === "desc" ? "bg-white text-black" : "bg-gray-700 text-white"
        }`}
      >
        최신순
      </button>
    </div>
  );
};

export default SortButton;
