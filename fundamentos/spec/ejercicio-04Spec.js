describe("Pruebas ejercicio-04", function () {
  describe("Prueba isPrime(num)", function () {
    let output;
    const primesOneToHun = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 53, 59, 61, 67, 71,
      73, 79, 83, 89, 97,
    ];

    [
      { num: 1, descr: "Admite números positivos" },
      { num: 0, descr: "Admite el cero" },
      { num: -1, descr: "Admite números negativos" },
    ].forEach((test) => {
      it(test.descr, function () {
        output = isPrime(test.num);
        expect(output).toBeInstanceOf(Boolean);
      });
    });

    it("Identifica bien los primos", function () {
      let correct = true;
      for (prime of primesOneToHun) {
        if (!isPrime(prime)) correct = false;
        break;
      }
      expect(correct).toBeTrue();
    });
  });

  describe("Prueba primeNums(numPrimes = 10)", function () {
    let numPrimes, output;

    [
      { numPrimes: 0, descr: "Admite cero elementos" },
      {
        numPrimes: -1,
        descr: "Admite un número negativo de elementos",
      },
    ].forEach((test) => {
      it(test.descr, function () {
        output = primeNums(test.numPrimes);
        expect(output).toBeInstanceOf(Array);
        expect(output.length).toBe(0);
      });
    });

    it("Tiene el número de elementos indicado", function () {
      numPrimes = 4;
      output = primeNums(numPrimes);
      expect(output).toBeInstanceOf(Array);
      expect(output.length).toBe(numPrimes);
    });
  });
});
