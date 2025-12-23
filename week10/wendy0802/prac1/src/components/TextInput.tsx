import React from 'react';

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const TextInput = ({ label, value, onChange }: TextInputProps) => {
  return (
    <div className="mt-6 w-full">
      <h2 className="mb-2 text-lg font-semibold">{label}</h2>
      <textarea
        className="w-full min-h-[120px] rounded-xl border border-gray-300 
                   p-3 text-base outline-none
                   focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default React.memo(TextInput);