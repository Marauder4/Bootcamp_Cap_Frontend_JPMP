describe("Pruebas ejercicio-04", function () {
  describe("Prueba isPrime(num)", function () {
    let output;

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
