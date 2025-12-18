import { useMemo, useState } from "react";
import InputNumber from "../components/InputNumber";
import TextInput from "../components/TextInput";
import { findPrimeNumbers } from "../utils/math";

const UseMemoPage = () => {
  console.log("❤️ 리렌더링됨");

  const [limit, setLimit] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const primes = useMemo(() => findPrimeNumbers(limit), [limit]);

  const handleInputNumber = (text: string) => {
    setLimit(Number(text));
  };
  const handleChangeText = () => {
    setText(text);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl ">같이 배우는 리액트 useMemo</h2>
      <div>
        <label>숫자 입력(소수 찾기)</label>
        <InputNumber limit={limit} onChange={handleInputNumber} />
      </div>

      <div>
        <label>소수 리스트</label>
        <div className="flex flex-wrap">
          {primes.map((prime) => (
            <div key={prime}>{prime} &nbsp; </div>
          ))}
        </div>
      </div>

      <div>
        <label>다른 입력 테스트</label>
        <TextInput onChange={handleChangeText} />
      </div>
    </div>
  );
};

export default UseMemoPage;
