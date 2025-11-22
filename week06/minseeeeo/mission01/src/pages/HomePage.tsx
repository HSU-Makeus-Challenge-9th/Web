import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import NotFoundPage from "./NotFoundPage";
import type { PAGINATION_ORDER } from "../types/common";
import LpCard from "../components/lp/LpCard";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>("desc");

  // lp 목록 가져오기
  const { data, isLoading, isError } = useGetLpList({ order });
  const lpdata = data?.data?.data;

  return (
    <>
      <div className="flex justify-end items-center mt-4 mr-4">
        <div className="flex bg-gray-800 rounded-full p-1">
          <button
            onClick={() => setOrder("asc")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              order === "asc"
                ? "bg-white text-black"
                : "bg-transparent text-white hover:text-gray-300"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              order === "desc"
                ? "bg-white text-black"
                : "bg-transparent text-white hover:text-gray-300"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {isError && <NotFoundPage />}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[500px]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-5 text-white place-items-center">
          {lpdata?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
