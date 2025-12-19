
interface LanguageSelectorProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  className?: string
}

const LanguageSelector = <T extends string>({
  value,
  onChange,
  options,
  className ="",
}: LanguageSelectorProps<T>) => {
  return (
    <select
    value={value}
    onChange={(e) => onChange(e.target.value as T)}
      className={`w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
