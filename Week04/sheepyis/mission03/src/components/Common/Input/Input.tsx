import React, { forwardRef, useState } from "react";
import * as S from "./styles/InputStyle";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", type = "text", ...rest }, ref) => {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";
    const actualType = isPassword ? (show ? "text" : "password") : type;

    return (
      <div className={S.InputWrapper}>
        <div className={S.InputWrapper}>
          <input
            ref={ref}
            type={actualType}
            className={`${S.InputContainer} ${isPassword ? "pr-[5vw]" : ""}`}
            aria-invalid={!!error}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className={S.ToggleText}
              aria-label={show ? "비밀번호 숨기기" : "비밀번호 보이기"}
            >
              {show ? "숨기기" : "보이기"}
            </button>
          )}
        </div>

        {error && <p className={S.InputErrorText}>{error}</p>}
      </div>
    );
  }
);

export default Input;
