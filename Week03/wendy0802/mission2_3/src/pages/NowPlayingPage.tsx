import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Movie, MovieResponse } from "../types/movie";
import styled from "styled-components";
import LoadingSpinner from "../components/movie/LodingSpinner";
import ErrorMessage from "../components/movie/Error";
import Pagination from "../components/button/Pagination";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.3rem 0.5rem;
  padding: 5rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  cursor: pointer;
  &:hover img {
    filter: blur(4px);
    transition: filter 0.3s;
  }
  &:hover .overlay {
    opacity: 1;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const PosterImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.6);
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

export default function NowPlayingPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const accessToken =
    import.meta.env.VITE_TMDB_KEY ||
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDJhMjVhYzIxOGZhN2YzZDc1MDA4YzRmMjYwMmM0MyIsIm5iZiI6MTc0MzMzNTk4MS4wODcwMDAxLCJzdWIiOiI2N2U5MzIyZDcwMGE2YTk0YzZlNTRmZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mRtBS7qXkSQp2y9QQnEVOlCA26FtaZwYmVgdIFrd66Y";

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("상영중 영화 API 호출 시작...");

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${currentPage}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("API 에러 응답:", errorText);
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: MovieResponse = await res.json();
        console.log("받은 영화 데이터:", data);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("API 호출 중 에러 발생:", err);
        setError("영화 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
  }, [accessToken, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 로딩 상태
  if (loading) {
    return <LoadingSpinner />;
  }

  // 에러 상태
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // 성공 상태
  return (
    <>
      <div className="flex justify-center mb-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Wrapper>
        {movies.map((m) => (
          <StyledLink key={m.id} to={`/movies/${m.id}`}>
            <PosterWrapper>
              {m.poster_path ? (
                <PosterImg
                  src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                  alt={m.title}
                />
              ) : (
                <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">포스터 없음</span>
                </div>
              )}
              <Overlay className="overlay">
                <h3>{m.title}</h3>
                <p>{m.overview}</p>
              </Overlay>
            </PosterWrapper>
          </StyledLink>
        ))}
      </Wrapper>
    </>
  );
}
