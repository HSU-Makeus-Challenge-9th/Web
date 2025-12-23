interface IInputNumber {
  limit: number;
  onChange: (text: string) => void;
}

const InputNumber = ({ limit, onChange }: IInputNumber) => {
  return (
    <>
      <input
        type="number"
        value={limit}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-3 py-1 ml-3"
      />
    </>
  );
};

export default InputNumber;
