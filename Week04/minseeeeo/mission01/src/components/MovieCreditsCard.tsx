import type { MovieCredits } from "../types/movieCredits";

interface Credits {
  credits?: MovieCredits[];
}

export const MovieCreditsCard = ({ credits }: Credits) => {
  return (
    <div className="bg-black">
      <h1>감독/출연</h1>
      <ul className="p-10 grid gap-10 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-6">
        {credits?.map((credit) => (
          <li
            key={credit.id}
            className=" flex justify-center items-center flex-col"
          >
            <img
              className="w-20 h-20 rounded-full border-2 border-white object-cover"
              src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
              alt={`${credit.name}의 프로필 이미지`}
            />
            <p className="text-bold text-white">{credit.name}</p>
            <p className="text-white">{credit.original_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
