import { useParams } from "react-router-dom";

export const MovieDetailPage = () => {
  const params = useParams();

  console.log("movie detail params: ", params);

  return <>detail page</>;
};
