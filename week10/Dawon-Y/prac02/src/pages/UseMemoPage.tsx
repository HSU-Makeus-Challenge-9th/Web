import React, { useMemo, useState } from 'react';
import { findPrimes } from '../utils/math';
import TextInput from '../components/TextInput'; 

export default function UseMemoPage() {
  // 계산할 범위 (예: 100000)
  const [limit, setLimit] = useState<number>(0);
  // 렌더링 확인용 텍스트 상태
  const [text, setText] = useState<string>("");

  const handleText = (text: string) => {
    setText(text);
  };

  // useMemo를 사용하여 limit이 변경될 때만 연산 수행 (캐싱)
  const primes = useMemo(() => {
    return findPrimes(limit);
  }, [limit]); 

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-10">
      <h1 className="text-2xl font-bold mb-4">
        같이 배우는 리액트 useMemo 편
      </h1>

      {/* 숫자 입력 (소수 찾기 범위) */}
      <div className="flex flex-col gap-2 w-full max-w-md mt-4">
        <label className="font-medium">숫자 입력 (소수 찾기)</label>
        <input
          type="number"
          className="border p-4 rounded-lg"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          placeholder="숫자를 입력하세요 (예: 100000)"
        />
      </div>

      {/* 소수 리스트 출력 */}
      <div className="w-full max-w-4xl mt-6">
        <h2 className="text-xl font-bold mb-2">소수 리스트</h2>
        <div className="flex flex-wrap gap-2">
          {primes.map((prime) => (
            <span key={prime}>
              {prime}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md mt-6">
        <div className="flex items-center gap-4">
          <span className="font-bold">{text}</span>
          <label className="whitespace-nowrap font-medium min-w-fit">
            다른 입력 테스트
          </label>
          <div className="flex-1">
            <TextInput onChange={handleText} />
          </div>
        </div>
      </div>

    </div>
  );
}