interface LPContentDisplayProps {
  content: string;
  tags: string[];
}

const LPContentDisplay = ({ content, tags }: LPContentDisplayProps) => {
  return (
    <>
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

export default LPContentDisplay;