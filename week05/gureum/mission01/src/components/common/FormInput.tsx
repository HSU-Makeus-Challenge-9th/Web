import { useState } from "react";
import type { ChangeEvent } from "react";
import type { UserSigninInformation } from "../../utils/validate";

type InputName = keyof UserSigninInformation;

type InputGetter = (
  name: InputName
) => {
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
};

interface FormInputProps {
  name: InputName;
  type?: "text" | "email" | "password";
  placeholder: string;
  getInputProps: InputGetter;
  errors: Partial<Record<InputName, string>>;
  touched: Partial<Record<InputName, boolean>>;
}

const FormInput = ({
  name,
  type = "text",
  placeholder,
  getInputProps,
  errors,
  touched,
}: FormInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputProps = getInputProps(name);

  const value = typeof inputProps.value === "string" ? inputProps.value : String(inputProps.value ?? "");
  const errorMessage = errors[name] ?? "";
  const isTouched = Boolean(touched[name]);
  const showError = Boolean(errorMessage) && (isTouched || value.length > 0);
  const resolvedType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="mb-4">
      <div className="relative">
        <input
          id={name}
          name={name}
          type={resolvedType}
          placeholder={placeholder}
          className={`w-full px-4 py-3 ${type === "password" ? "pr-12" : ""} bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
            showError
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          }`}
          value={value}
          onChange={inputProps.onChange}
          onBlur={inputProps.onBlur}
          autoComplete={type === "password" ? "current-password" : "email"}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
          >
            {isPasswordVisible ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {showError && <p className="mt-2 text-sm text-red-500 text-center">{errorMessage}</p>}
    </div>
  );
};

export default FormInput;
