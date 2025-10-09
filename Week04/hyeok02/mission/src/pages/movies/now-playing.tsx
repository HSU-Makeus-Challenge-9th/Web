import usePaginatedMovies from "../../hooks/usepaginated";

const NowPlaying = () => {
  const { content } = usePaginatedMovies("now_playing");
  return content;
};

export default NowPlaying;
