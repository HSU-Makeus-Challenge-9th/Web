import React from 'react';

interface Props {
  tags: string[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onAdd: () => void;
}

const LpTagInput: React.FC<Props> = ({ tags, value, onChange, onAdd }) => (
  <div className="mb-3">
    <div className="flex mb-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="LP Tag"
        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l placeholder-gray-400 focus:outline-none"
      />
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-r"
      >
        Add
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {tags.map((t, i) => (
        <span
          key={i}
          className="px-2 py-1 bg-pink-500 text-white rounded-full text-sm"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

export default LpTagInput;
