import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: "text" | "url" | "textarea";
  required?: boolean;
  placeholder?: string;
  rows?: number;
  hint?: string;
}

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  rows = 6,
  hint,
}: FormFieldProps) => {
  const labelClassName = "mb-2 block text-sm font-medium text-gray-200";
  const inputClassName =
    "w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50";

  return (
    <div>
      <label htmlFor={name} className={labelClassName}>
        {label}
        {required && <span className="text-red-500"> *</span>}
        {hint && <span className="text-xs text-gray-400"> {hint}</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClassName}
          rows={rows}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClassName}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
