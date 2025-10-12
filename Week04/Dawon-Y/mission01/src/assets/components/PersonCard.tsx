import { IMAGE_BASE_URL } from '../constants/movie';

interface PersonCardProps {
  name: string;
  role: string;
  profilePath: string | null;
}

export default function PersonCard({ name, role, profilePath }: PersonCardProps) {
  return (
    <div className="text-center">
      {profilePath ? (
        <img
          src={`${IMAGE_BASE_URL}/w185${profilePath}`}
          alt={name}
          className="w-20 h-20 object-cover rounded-full mb-2 mx-auto"
        />
      ) : (
        <div className="w-20 h-20 bg-black border border-white rounded-full mb-2 flex items-center justify-center mx-auto">
          <span className="text-white text-xs">사진</span>
        </div>
      )}
      <h4 className="font-semibold mb-1 text-xs truncate text-white">
        {name}
      </h4>
      <p className="text-xs truncate text-white" title={role}>
        {role}
      </p>
    </div>
  );
}