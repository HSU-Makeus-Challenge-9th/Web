import { memo } from "react";

interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
  console.log("💙 TextInput 렌더링됨!");

  return (
    <>
      <input
        type="text"
        className="border rounded-md"
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </>
  );
};

export default memo(TextInput);
