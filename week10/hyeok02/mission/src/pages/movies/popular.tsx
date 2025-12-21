import usePaginatedMovies from "../../hooks/usepaginated";

const Popular = () => {
  const { content } = usePaginatedMovies("popular");
  return content;
};

export default Popular;
