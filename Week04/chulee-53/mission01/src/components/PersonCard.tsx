interface PersonCardProps {
  name: string;
  character?: string;
  profilePath?: string | null;
}

export const PersonCard = ({
  name,
  character,
  profilePath,
}: PersonCardProps) => (
  <div className="flex flex-col items-center">
    <img
      src={
        profilePath
          ? `https://image.tmdb.org/t/p/w200${profilePath}`
          : "https://via.placeholder.com/200x300?text=No+Image"
      }
      alt={name}
      className="w-24 h-24 object-cover rounded-full border-2 border-white"
    />
    <p className="mt-3 font-semibold text-center">{name}</p>
    {character && (
      <p className="text-sm text-gray-400 text-center">{character}</p>
    )}
  </div>
);
