import React, { memo } from 'react';

interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
  console.log("TextInput 렌더링"); // 렌더링 확인용 로그

  return (
    <input
      type="text"
      className="border p-2 rounded-lg"
      placeholder="텍스트 입력"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default memo(TextInput);