import type { Movie } from "../../../types/movie/movie";
import * as S from "./MovieDetailStyle";

interface BannerProps {
  data: Movie;
}

const Banner = ({ data }: BannerProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
  const Year = data.release_date?.slice(0, 4);

  return (
    <div
      className={S.BannerContainer}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={S.BannerTextContainer}>
        <p className={S.BannerP}>{data.title}</p>
        <p className={S.BannerSubP}>
          평균: {data.vote_average}
          <br />
          {Year}
          <br />
          {data.runtime}분
        </p>

        <p className={S.BannerSubP2}>{data.tagline}</p>

        <p className={S.BannerSubP}>{data.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
