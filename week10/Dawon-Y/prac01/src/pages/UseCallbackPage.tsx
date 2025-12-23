import React, { useCallback, useState } from 'react';
import CountButton from '../components/CountButton'; 
import TextInput from '../components/TextInput';  

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  // count가 변경될 때만 함수가 재생성됨
  const handleIncreaseCount = useCallback(() => {
    setCount((prev) => prev + 10); 
    // 또는 setCount(count + 10) 하고 의존성 배열에 [count] 추가
  }, []); 
  // 영상의 최종 흐름상 [count]를 넣는 방식을 설명했으나, 
  // 함수형 업데이트(prev => prev + 10)를 쓰면 빈 배열 []로도 가능

  // 텍스트 변경 함수는 재생성될 필요가 없으므로 빈 배열
  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-2xl font-bold">같이 배우는 리액트 useCallback 편</h1>
      
      {/* 카운트 버튼 컴포넌트 */}
      <CountButton count={count} onClick={handleIncreaseCount} />
      
      {/* 텍스트 입력 및 출력 */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl">Text</h2>
        <h2 className=" w-64 text-center">{text}</h2>
        <TextInput onChange={handleText} />
      </div>
    </div>
  );
}