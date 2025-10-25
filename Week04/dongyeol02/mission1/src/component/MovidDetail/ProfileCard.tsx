interface ProfileCardProps {
  id: number;
  name: string;
  character?: string;
  profilePath: string | null;
  job?: string;
}

const ProfileCard = ({
  name,
  character,
  profilePath,
  job,
}: ProfileCardProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-[100px] h-[120px] rounded-full overflow-hidden shadow-md">
        {profilePath ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${profilePath}`}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-xs">사진없음</span>
          </div>
        )}
      </div>

      <div className="text-center">
        <div className="text-sm font-medium text-gray-900 line-clamp-2">
          {name}
        </div>
        {(character || job) && (
          <div className="text-xs text-gray-600 line-clamp-2 mt-1">
            {character || job}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
