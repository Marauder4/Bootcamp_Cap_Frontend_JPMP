describe("Prueba ejercicio-01 ranInt(min, max)", function () {
  let min, max, output;

  it("No admite que 'min' sea mayor que 'max'", function () {
    min = 20;
    max = 10;
    expect(() => ranInt(min, max)).toThrowError(RangeError);
  });

  [
    { min: 10, max: 20, descr: "Funciona con números positivos" },
    { min: -20, max: -10, descr: "Funciona con números negativos" },
    { min: 10, max: 10, descr: "Funciona con números idénticos" },
    { min: 10, max: 11, descr: "Funciona con números consecutivos" },
  ].forEach((test) => {
    it(test.descr, function () {
      output = ranInt(test.min, test.max);
      expect(output).toBeGreaterThanOrEqual(test.min);
      expect(output).toBeLessThanOrEqual(test.max);
    });
  });
});
