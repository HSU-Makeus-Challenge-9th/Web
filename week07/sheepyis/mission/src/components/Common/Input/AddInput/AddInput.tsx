import * as S from "./styles/AddInputStyle";

interface AddInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const AddInput = ({
  placeholder,
  value,
  onChange,
  onKeyDown,
}: AddInputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={S.AddInput}
    />
  );
};

export default AddInput;
