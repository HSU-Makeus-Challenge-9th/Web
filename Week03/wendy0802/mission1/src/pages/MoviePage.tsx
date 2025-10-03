import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../../src/types/movie";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  useEffect(() => {
    const fetchPopular = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      const data: MovieResponse = await res.json();
      setMovies(data.results);
    };
    fetchPopular();
  }, [accessToken]);

  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-x-2 gap-y-1 p-20 max-w-[1400px] mx-auto">
      {movies.map((m) => (
        <div key={m.id} className="group relative w-full [aspect-ratio:2/3]">
          <img
            src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
            alt={m.title}
            className="w-full h-full rounded-2xl object-cover transition-[filter] duration-300 group-hover:blur-sm"
          />
          <div className="absolute inset-0 rounded-2xl bg-black/60 text-white flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 p-4 text-center group-hover:opacity-100">
            <h3>{m.title}</h3>
            <p>{m.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
