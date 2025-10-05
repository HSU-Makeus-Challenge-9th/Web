import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { Movie } from "../../types/movie/movie";
import type { Credit } from "../../types/movie/credit";
import Spinner from "../../components/Common/Spinner/Spinner";
import Error from "../../components/Common/Error";
import Banner from "../../components/Movie/MovieDetail/Banner";
import CreditList from "../../components/Movie/MovieDetail/CreditList";
import * as S from "../../styles/pages/movies/MovieStyle";

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  // console.log(movieId);

  const { data, loading, error } = useFetch<Movie>(`${movieId}?language=ko`);
  const {
    data: creditData,
    loading: creditLoading,
    error: creditError,
  } = useFetch<Credit>(`${movieId}/credits`);
  console.log(creditData);

  if (loading || creditLoading) return <Spinner />;
  if (error || !data || creditError || !creditData) return <Error />;

  return (
    <div className={S.MovieContainer}>
      <Banner data={data} />

      <CreditList data={creditData} />
    </div>
  );
};

export default MovieDetail;
