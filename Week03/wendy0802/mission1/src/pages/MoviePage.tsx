import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../../src/types/movie";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.3rem 0.5rem;
  padding: 5rem;
  max-width: 1400px; /* 최대 너비 제한 */
  margin: 0 auto; /* 중앙 정렬 */
`;

const PosterWrapper = styled.div`
  position: relative;
  width: 100%; /* 200px에서 100%로 변경 */
  aspect-ratio: 2/3; /* 높이를 비율로 설정 */
  &:hover img {
    filter: blur(4px);
    transition: filter 0.3s;
  }
  &:hover .overlay {
    opacity: 1;
  }
`;

const PosterImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border-radius: 1rem;
  background: rgba(0,0,0,0.6);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  padding: 1rem;
  text-align: center;
`;

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
    <Wrapper>
      {movies.map((m) => (
        <PosterWrapper key={m.id}>
          <PosterImg
            src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
            alt={m.title}
          />
          <Overlay className="overlay">
            <h3>{m.title}</h3>
            <p>{m.overview}</p>
          </Overlay>
        </PosterWrapper>
      ))}
    </Wrapper>
  );
}