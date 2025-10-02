import * as S from "./InputStyle";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const Input = ({ placeholder, ...rest }: InputProps) => {
  return <S.InputContainer placeholder={placeholder} {...rest} />;
};

export default Input;
