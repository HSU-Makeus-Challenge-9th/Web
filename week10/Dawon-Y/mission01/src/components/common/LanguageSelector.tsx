import { LANGUAGE_OPTIONS } from '../../constants/movie';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <select
      className="rounded-md border border-gray-300 p-2 focus:border-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {LANGUAGE_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};