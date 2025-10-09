import usePaginatedMovies from "../../hooks/usepaginated";

const TopRated = () => {
  const { content } = usePaginatedMovies("top_rated");
  return content;
};

export default TopRated;
