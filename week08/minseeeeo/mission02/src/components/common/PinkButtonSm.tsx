interface PinkButtonSmProps {
  value: string;
  onClick: () => void;
}

const PinkButtonSm = ({ value, onClick }: PinkButtonSmProps) => {
  return (
    <button
      className="bg-pink-500 text-white w-20 py-1 rounded-sm hover:bg-pink-600"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default PinkButtonSm;
