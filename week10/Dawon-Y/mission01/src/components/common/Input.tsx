interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Input = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};