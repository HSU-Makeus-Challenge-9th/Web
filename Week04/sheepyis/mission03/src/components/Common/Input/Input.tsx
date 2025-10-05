import * as S from "./styles/InputStyle";
import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...rest }, ref) => {
    return (
      <div className={S.InputWrapper}>
        <input ref={ref} className={S.InputContainer} {...rest} />
        {error && <p className={S.InputErrorText}>{error}</p>}
      </div>
    );
  }
);

export default Input;
