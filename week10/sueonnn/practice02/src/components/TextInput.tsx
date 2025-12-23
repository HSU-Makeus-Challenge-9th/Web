import React, { memo } from "react";

interface ITextInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// React.memo로 감싸서 Props가 안 변하면 리렌더링 방지
const TextInput = memo(({ onChange }: ITextInput) => {
  console.log("TextInput 렌더링됨!");
  return (
    <input
      type="text"
      onChange={onChange}
      style={{ border: "1px solid gray", padding: "5px" }}
      placeholder="텍스트를 입력하세요"
    />
  );
});

export default TextInput;
