import { useCallback, useState } from "react";
import CountButton from "../components/CountButton";
import TextInput from "../components/TextInput";

const UseCallbackPage = () => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = useCallback(
    (number: number) => {
      setCount(count + number);
    },
    [count]
  );
  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl">같이 배우는 리액트 useCallback편</h1>

        <h2 className="font-semibold">count: {count}</h2>
        <CountButton onClick={handleIncreaseCount} />

        <h2 className="font-semibold">Text: {text}</h2>
        <TextInput onChange={handleText} />
      </div>
    </div>
  );
};

export default UseCallbackPage;
