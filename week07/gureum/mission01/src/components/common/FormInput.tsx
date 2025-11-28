import React from "react";

interface FormInputProps<T extends string> {
  name: T;
  type?: "text" | "email" | "password";
  placeholder?: string;
  getInputProps: (name: T) => {
    value: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur: () => void;
  };
  errors?: Partial<Record<T, string>>;
  touched?: Partial<Record<T, boolean>>;
}

function FormInput<T extends string>({
  name,
  type = "text",
  placeholder,
  getInputProps,
  errors,
  touched,
}: FormInputProps<T>) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <input
        {...getInputProps(name)}
        type={type}
        placeholder={placeholder}
        className={`border w-full p-3 rounded-md placeholder:text-gray-400 text-white bg-transparent ${errors?.[name] && touched?.[name]
            ? "border-red-500"
            : "border-gray-600"
          } focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500`}
      />
      {errors?.[name] && touched?.[name] && (
        <p className="text-sm text-red-500">{errors[name]}</p>
      )}
    </div>
  );
}

export default FormInput;