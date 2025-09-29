import * as S from "./ButtonStyle";

export type ButtonProps = {
  text: string;
  onClick?: () => void;
  height?: number | string;
  type?: "button" | "submit" | "reset";
  backgroundColor?: string;
};

const Button = ({
  text,
  onClick,
  height,
  type = "button",
  backgroundColor,
}: ButtonProps) => {
  return (
    <S.ButtonContainer
      type={type}
      $height={height}
      onClick={onClick}
      backgroundColor={backgroundColor}
    >
      {text}
    </S.ButtonContainer>
  );
};

export default Button;
