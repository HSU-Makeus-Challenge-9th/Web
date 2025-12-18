interface BlackButtonSmProps {
  value: string;
  hoverbg?: boolean;
  onClick: () => void;
}

const BlackButtonSm = ({
  value,
  hoverbg = true,
  onClick,
}: BlackButtonSmProps) => {
  return (
    <button
      className={`bg-black text-white px-2 rounded-sm ${
        hoverbg ? "hover:bg-gray-700" : "hover:underline"
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default BlackButtonSm;
