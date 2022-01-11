describe("Prueba ejercicio-03 createArray(numElements, value)", function () {
  let numElements, value, output;

  [
    { numElements: 0, value: undefined, descr: "Admite cero elementos" },
    {
      numElements: -1,
      value: undefined,
      descr: "Admite un número negativo de elementos",
    },
  ].forEach((test) => {
    it(test.descr, function () {
      output = createArray(test.numElements, test.value);
      expect(output).toBeInstanceOf(Array);
      expect(output.length).toBe(0);
    });
  });

  it("Tiene el número de elementos indicado", function () {
    numElements = 4;
    value = undefined;
    output = createArray(numElements, value);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(numElements);
  });

  [
    { numElements: 1, value: 1, descr: "Admite valores 'number'" },
    { numElements: 1, value: "a", descr: "Admite valores 'string'" },
  ].forEach((test) => {
    it(test.descr, function () {
      output = createArray(test.numElements, test.value);
      expect(output).toBeInstanceOf(Array);
      expect(typeof output[0]).toBe(typeof test.value);
    });
  });
});
