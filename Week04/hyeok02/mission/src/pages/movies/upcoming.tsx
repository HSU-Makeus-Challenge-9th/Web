import usePaginatedMovies from "../../hooks/usepaginated";

const Upcoming = () => {
  const { content } = usePaginatedMovies("upcoming");
  return content;
};

export default Upcoming;
