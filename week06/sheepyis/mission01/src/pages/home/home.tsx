import { useState } from "react";
import ListLp from "../../components/Home/ListLP/ListLP";
import Spinner from "../../components/Common/Spinner/Spinner";
import { useLpQuery } from "../../hooks/lps/useLpQuery";
import * as S from "../../styles/pages/home/HomeStyle";

const Home = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { data, isLoading, isFetching } = useLpQuery(order, 0, 10);

  return (
    <div className={S.HomeContainer}>
      <div className={S.HomeSortContainer}>
        <div className={S.HomeSortInnerContainer}>
          <button
            onClick={() => setOrder("asc")}
            className={`px-[1vw] py-[0.5vw] rounded cursor-pointer ${
              order === "asc" ? "bg-white text-black" : "bg-gray-700 text-white"
            }`}
          >
            오래된 순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`px-[1vw] py-[0.5vw] rounded cursor-pointer ${
              order === "desc"
                ? "bg-white text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            최신순
          </button>
        </div>

        {isLoading || isFetching ? (
          <Spinner />
        ) : (
          data && <ListLp data={data.data} />
        )}
      </div>
    </div>
  );
};

export default Home;
