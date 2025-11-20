interface RecordProps {
  thumbnail: string;
  title: string;
  lpId: number;
}

const Record = ({ thumbnail, title, lpId }: RecordProps) => {
  return (
    <div className="relative w-64 h-64 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
      <div className="relative w-full h-full rounded-full bg-black shadow-2xl border-3 border-black overflow-hidden animate-lp-rotate">
        <img
          src={
            thumbnail || "https://placehold.co/400x400/1f2937/ffffff?text=LP"
          }
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes("placehold.co")) {
              console.error(`Failed to load thumbnail for LP ${lpId}`);
              target.src = "https://placehold.co/400x400/1f2937/ffffff?text=LP";
            }
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white shadow-2xl flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Record;
