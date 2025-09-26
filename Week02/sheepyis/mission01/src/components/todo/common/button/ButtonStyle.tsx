import styled from "styled-components";

type ButtonStyleProps = {
  $height?: number | string;
  backgroundColor?: string;
};

export const ButtonContainer = styled.button<ButtonStyleProps>`
  height: ${({ $height }) =>
    typeof $height === "number" ? `${$height}rem` : $height || "100%"};
  background-color: ${({ backgroundColor }) =>
    backgroundColor === "red" ? "red" : "green"};
  padding: 0 2rem;
  border-radius: 1rem;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;
