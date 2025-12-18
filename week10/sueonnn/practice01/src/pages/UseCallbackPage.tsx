import React, { useState, useCallback } from "react";
import CountButton from "../components/CountButton";
import TextInput from "../components/TextInput";

const UseCallbackPage = () => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  // useCallback을 사용하여 함수 참조값 고정
  // count가 변경될 때만 함수가 재생성됨
  const handleIncreaseCount = useCallback(
    (num: number) => {
      setCount((prev) => prev + num);
    },
    [count]
  );

  // text와 상관없는 함수이므로 빈 배열을 넣어 한 번만 생성
  const handleText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>같이 배우는 리액트 - useCallback 편</h1>
      <div>
        <h2>카운트: {count}</h2>
        <CountButton onClick={handleIncreaseCount} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>입력된 텍스트: {text}</h2>
        <TextInput onChange={handleText} />
      </div>
    </div>
  );
};

export default UseCallbackPage;
