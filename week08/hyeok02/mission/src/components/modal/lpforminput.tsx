import React from 'react';

interface Props {
  title: string;
  content: string;
  onTitleChange: React.ChangeEventHandler<HTMLInputElement>;
  onContentChange: React.ChangeEventHandler<HTMLInputElement>;
}

const LpFormInputs: React.FC<Props> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
}) => (
  <>
    <input
      type="text"
      value={title}
      onChange={onTitleChange}
      placeholder="LP Name"
      className="w-full mb-3 px-4 py-2 bg-gray-700 border border-gray-600 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
    <input
      type="text"
      value={content}
      onChange={onContentChange}
      placeholder="LP Content"
      className="w-full mb-3 mt-3 px-4 py-2 bg-gray-700 border border-gray-600 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  </>
);

export default LpFormInputs;
