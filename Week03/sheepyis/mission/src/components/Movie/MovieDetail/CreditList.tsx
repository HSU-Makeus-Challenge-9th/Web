import type { Credit, CastMember } from "../../../types/movie/credit";
import CreditItem from "./CreditItem";
import * as S from "./MovieDetailStyle";

interface ListProps {
  data: Credit;
}

const CreditList = ({ data }: ListProps) => {
  const directors = data.crew.filter((p) => p.job === "Director");

  const directorsAsCast: CastMember[] = directors.map((d) => ({
    id: d.id,
    name: d.name,
    profile_path: d.profile_path,
    character: "Director",
  }));

  const combined: CastMember[] = [...directorsAsCast, ...data.cast];

  return (
    <div className={S.CreditRootContainer}>
      <p className={S.CreditTitleP}>감독/출연</p>

      <div className={S.CreditListContainer}>
        {combined.map((person) => (
          <CreditItem key={person.id} data={person} />
        ))}
      </div>
    </div>
  );
};

export default CreditList;
