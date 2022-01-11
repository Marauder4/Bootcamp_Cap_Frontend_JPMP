/*
Crear una función que devuelva un determinado número de números primos.
*/

function isPrime(num) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
}

function primeNums(numPrimes = 10) {
  const primesArray = [];
  let number = 2;
  while (primesArray.length < numPrimes) {
    if (isPrime(number)) primesArray.push(number);
    number++;
  }
  return primesArray;
}

console.log(primeNums());
