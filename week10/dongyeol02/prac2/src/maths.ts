export const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false; // 짝수는 소수 x

  for (let i = 3; i + i <= num; i++) {
    // O(n) -> O(sqrt(n))
    if (num % i === 0) return false;
  }

  return true;
};

export const findPrimeNumbers = (max: number): number[] => {
  // export const findPrimeNumbers = (max: number): (number | null)[] => {
  // const primeNumbers = [];

  // for (let i = 2; i <= max; i++) {
  //   if (isPrime(i)) primeNumbers.push(i);
  // }

  // return primeNumbers;

  const sieve = Array(max + 1).fill(true);
  sieve[0] = sieve[1] = false; // 0과 1은 소수x

  for (let i = 2; i * i <= max; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= max; j += i) {
        sieve[j] = false;
      }
    }
  }

  return sieve
    .map((isPrime, i): number | null => (isPrime ? i : null))
    .filter((n): n is number => n !== null);
};
