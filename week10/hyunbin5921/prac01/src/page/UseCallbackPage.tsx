import { useCallback, useState } from "react";
import  CountButton  from "../components/CountButton";
import TextInput from "../components/TextInput";

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = useCallback((number: number) => {
    setCount(count + number);
  }, [count]);

  const handleText = useCallback((text: string) => {
    setText(text)
  }, [text])

  return (
    <div>
      <h1>같이 배우는 리액트 useCallback</h1>
      <h2>Count : {count}</h2>
      <CountButton onClick={handleIncreaseCount}/>
      <h2>text</h2>
      <span>{text}</span>
      <TextInput onChange={handleText}/>
    </div>
  );
}
