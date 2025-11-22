import { useState } from "react";
import type { MovieResponse } from "../types/../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import PageButton from "../components/PageButton";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

export default function Moviepage() {
  const [page, setPage] = useState(1); // 페이지 상태

  const { category } = useParams<{
    category: string;
  }>();

  // 초기 마운팅시 영화 데이터 가져옴 (+페이지 변경, 카테고리 변경시에도 호출)
  const { data, isPending, isError } = useCustomFetch<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${category}?language=ko-kr&page=${page}`,
    [page, category]
  );

  if (isError)
    return <div className="text-red-500 font-2xl">에러가 발생했습니다.</div>;

  return (
    <>
      <PageButton page={page} setPage={setPage} />

      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
