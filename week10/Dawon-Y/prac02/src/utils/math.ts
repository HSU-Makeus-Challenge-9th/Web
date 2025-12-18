// 에라토스테네스의 체를 이용한 소수 찾기 함수
export const findPrimes = (max: number): number[] => {
  // 1. 모든 수를 소수(true)로 초기화
  const sieve = new Array(max + 1).fill(true);

  // 0과 1은 소수가 아님
  sieve[0] = false;
  sieve[1] = false;

  // 2. 에라토스테네스의 체 알고리즘 적용
  // 제곱근까지만 반복 (최적화)
  for (let i = 2; i * i <= max; i++) {
    if (sieve[i]) {
      // i의 배수들을 지워나감 (i * i 부터 시작)
      for (let j = i * i; j <= max; j += i) {
        sieve[j] = false;
      }
    }
  }

  // 3. true인 인덱스(소수)만 필터링하여 반환
  return sieve
    .map((isPrime, i) => (isPrime ? i : null))
    .filter((n) => n !== null) as number[];
};