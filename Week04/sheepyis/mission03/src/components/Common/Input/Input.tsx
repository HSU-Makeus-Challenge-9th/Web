import * as S from "./styles/InputStyle";

type InputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
};

const Input = ({
  value,
  placeholder,
  onChange,
  type = "text",
  error,
}: InputProps) => {
  return (
    <div className={S.InputWrapper}>
      <input
        className={S.InputContainer}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={!!error}
      />
      {error && <p className={S.InputErrorText}>{error}</p>}
    </div>
  );
};

export default Input;
