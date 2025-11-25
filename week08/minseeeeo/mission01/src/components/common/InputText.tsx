interface InputTextProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputText = ({
  placeholder,
  value,
  onChange,
  onKeyPress,
}: InputTextProps) => {
  return (
    <>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className="w-full px-4 py-3 border-2 border-gray-600 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </>
  );
};

export default InputText;
