interface LPThumbnailProps {
  src: string;
  alt: string;
}

const LPThumbnail = ({ src, alt }: LPThumbnailProps) => {
  return (
    <div className="mb-6 flex justify-center">
      <div className="w-full max-w-md aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/500x500?text=No+Image';
          }}
        />
      </div>
    </div>
  );
};

export default LPThumbnail;