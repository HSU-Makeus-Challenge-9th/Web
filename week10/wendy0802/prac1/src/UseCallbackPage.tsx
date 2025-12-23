import { useCallback, useState } from 'react';
import CountButton from './components/CountButton';
import TextInput from './components/TextInput';

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(10);
  const [text, setText] = useState<string>('');

  const handleIncreaseCount = useCallback((number: number): void => {
    setCount((prev) => prev + number);
  }, []);

  const handleText = useCallback((value: string): void => {
    setText(value);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-xl font-bold">
          같이 배우는 리액트 <span className="text-blue-600">useCallback</span>편
        </h1>

        <h2 className="mb-2 text-lg font-semibold">Count : {count}</h2>
        <CountButton onClick={handleIncreaseCount} />

        <TextInput label="Text" value={text} onChange={handleText} />
      </div>
    </div>
  );
}