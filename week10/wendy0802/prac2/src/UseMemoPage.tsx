import { useMemo, useState } from 'react';

function getPrimesUpTo(n: number): number[] {
  const limit = Math.max(0, Math.floor(n));
  const primes: number[] = [];

  for (let i = 2; i <= limit; i += 1) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j += 1) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }

  return primes;
}

const UseMemoPage = () => {
  const [target, setTarget] = useState<number>(0);
  const [text, setText] = useState('');

  const primeList = useMemo(() => {
    console.log('소수 다시 계산!');
    return getPrimesUpTo(target);
  }, [target]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[420px] rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-lg font-semibold">
          같이 배우는 리액트: useMemo편
        </h1>

        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm">
            <span className="whitespace-nowrap">
              숫자 입력 (소수 찾기):
            </span>
            <input
              type="number"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={target}
              onChange={(e) =>
                setTarget(Number(e.target.value) || 0)
              }
            />
          </label>
        </div>

        <div className="mb-6 text-sm">
          <p className="mb-1 font-medium">소수 리스트:</p>
          <p className="min-h-[40px] rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs leading-relaxed text-gray-700">
            {primeList.length
              ? primeList.join(', ')
              : '소수가 없습니다.'}
          </p>
        </div>

        <div className="text-sm">
          <label className="block mb-2 font-medium">
            다른 입력 테스트:
          </label>
          <p className="mb-2 min-h-[24px] text-gray-800">
            {text}
          </p>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default UseMemoPage;