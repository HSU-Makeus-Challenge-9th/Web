import React, { useState, useMemo, useCallback } from "react";
import { findPrimes } from "../utils/math";
import TextInput from "../components/TextInput";

const UseMemoPage = () => {
  const [limit, setLimit] = useState<number>(10000);
  const [text, setText] = useState<string>("");

  // useMemo를 사용하여 연산 결과인 '배열' 자체를 캐싱함
  // limit이 바뀔 때만 findPrimes가 실행됨
  const primes = useMemo(() => {
    console.log("무거운 소수 계산 중...");
    return findPrimes(limit);
  }, [limit]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>같이 배우는 리액트 - useMemo 편</h1>

      <div>
        <label>범위 설정 (숫자 입력): </label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          style={{ border: "1px solid black", padding: "5px" }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>최적화 확인용 입력창 (글자를 쳐보세요):</p>
        <TextInput onChange={handleTextChange} />
        <p>입력된 값: {text}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>찾은 소수 개수: {primes.length}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {primes.slice(0, 100).map((p) => (
            <span key={p}>{p}</span>
          ))}
          {primes.length > 100 && <span>...외 다수</span>}
        </div>
      </div>
    </div>
  );
};

export default UseMemoPage;
