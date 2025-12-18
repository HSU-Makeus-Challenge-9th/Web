interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
  return (
    <>
      <input
        type="text"
        className="border rounded-md px-3 py-1 ml-3"
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </>
  );
};

export default TextInput;
