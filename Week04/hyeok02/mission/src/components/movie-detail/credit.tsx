interface Props {
  role: string;
  name: string;
  originalName: string;
  profilePath: string;
}

const Credit = ({ role, name, originalName, profilePath }: Props) => {
  const imageUrl = profilePath
    ? `https://image.tmdb.org/t/p/w185${profilePath}`
    : "";

  return (
    <div className="flex flex-col items-center w-32 text-center text-white">
      {profilePath ? (
        <img
          src={imageUrl}
          alt={`${originalName}의 사진`}
          className="w-28 h-28 rounded-full object-cover mb-2"
          loading="lazy"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-gray-600 flex items-center justify-center mb-2 text-sm">
          사진 없음
        </div>
      )}

      <span className="text-xs font-bold text-gray-300">{role}</span>

      <p className="text-base font-bold truncate max-w-full">{name}</p>
      <p className="text-xs text-gray-300 truncate max-w-full">{originalName}</p>
    </div>
  );
};

export default Credit;
