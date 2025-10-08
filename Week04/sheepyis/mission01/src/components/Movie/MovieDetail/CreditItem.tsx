import type { CastMember } from "../../../types/movie/credit";
import * as S from "./MovieDetailStyle";

interface ItemProps {
  data: CastMember;
}

const CreditItem = ({ data }: ItemProps) => {
  const hasProfile = !!data.profile_path;
  const imageUrl = `https://image.tmdb.org/t/p/w500/${data.profile_path}`;

  return (
    <div className={S.CreditItemContainer}>
      {hasProfile ? (
        <img src={imageUrl} alt={data.name} className={S.CreditItemImg} />
      ) : (
        <div className={`${S.CreditItemImg} bg-black`} />
      )}

      <p className={S.CreditItemP}>{data.name}</p>
      <p className={`${S.CreditItemP} text-[0.5vw] text-gray-300 !mt-0`}>
        {data.character}
      </p>
    </div>
  );
};

export default CreditItem;
