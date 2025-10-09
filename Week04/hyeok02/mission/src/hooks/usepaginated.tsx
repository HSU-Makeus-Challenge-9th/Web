import { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { MovieResponse } from "../types/movie";
import MovieList from "../components/movie/movie-list";
import Spinner from "../components/spinner";
import Pagination from "../components/pagination";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie";

const usePaginatedMovies = (type: string): { content: ReactNode } => {
  const [data, setData] = useState<MovieResponse | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${BASE_URL}/${type}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        setData(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("에러 발생");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, page]);

  let content: ReactNode = null;

  if (loading) {
    content = <Spinner />;
  } else if (error) {
    content = <p className="text-red-500 text-center py-10">{error}</p>;
  } else {
    content = (
      <div className="w-full flex flex-col justify-center items-center">
        <MovieList movies={data?.results || []} />
        <Pagination page={page} setPage={setPage} />
      </div>
    );
  }

  return { content };
};

export default usePaginatedMovies;
