interface LPDetailContentProps {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
}

const LPDetailContent = ({ title, content, thumbnail, tags }: LPDetailContentProps) => {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-bold text-white mb-8">{title}</h1>
      
      <div className="aspect-square max-w-2xl mx-auto mb-6 overflow-hidden rounded-xl">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mb-6">
        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">{content}</p>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 bg-gray-800 text-pink-400 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default LPDetailContent;