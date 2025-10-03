import { useEffect, useState } from "react";
import axios from "axios";
import type { MovieResponse, Movie } from "../types/../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import PageButton from "../components/PageButton";
import { useParams } from "react-router-dom";

export default function Moviepage() {
  const [movies, setMovies] = useState<Movie[]>([]); // 영화 데이터 목록
  const [isPending, setIsPending] = useState(false); // 로딩 상태
  const [isError, setIsError] = useState(false); // 에러 상태
  const [page, setPage] = useState(1); // 페이지 상태

  const { category } = useParams<{
    category: string;
  }>();

  // 초기 마운팅시 영화 데이터 가져옴 (+페이지 변경, 카테고리 변경시에도 호출)
  useEffect((): void => {
    const fetchMovies = async (): Promise<void> => {
      setIsPending(true);

      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-kr&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
    console.log("params: ", category);
  }, [page, category]);

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
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
