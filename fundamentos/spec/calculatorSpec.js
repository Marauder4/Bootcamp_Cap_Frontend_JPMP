describe("Testing 'calculator.js'", function () {
  describe("Testing calculate(firstNumber, lastNumber, operator)", function () {
    let firstNumber, lastNumber, operator;

    [
      {
        firstNumber: "a1",
        lastNumber: "1",
        operator: "+",
        descr:
          "Returns undefined when 'firstNumber' cannot be parsed into a float",
      },
      {
        firstNumber: "1",
        lastNumber: "a1",
        operator: "+",
        descr:
          "Returns undefined when 'lastNumber' cannot be parsed into a float",
      },
      {
        firstNumber: "1",
        lastNumber: "1",
        operator: "/",
        descr: "Returns undefined when an unexpected operator is used",
      },
    ].forEach((test) => {
      it(test.descr, function () {
        expect(
          calculate(test.firstNumber, test.lastNumber, test.operator)
        ).toBeUndefined();
      });
    });

    [
      {
        firstNumber: "2",
        lastNumber: "1",
        operator: "+",
        result: "3",
        descr: "Returns the correct result when '+' operator is used",
      },
      {
        firstNumber: "2",
        lastNumber: "1",
        operator: "-",
        result: "1",
        descr: "Returns the correct result when '-' operator is used",
      },
      {
        firstNumber: "2",
        lastNumber: "2",
        operator: "*",
        result: "4",
        descr: "Returns the correct result when '*' operator is used",
      },
      {
        firstNumber: "4",
        lastNumber: "2",
        operator: "÷",
        result: "2",
        descr: "Returns the correct result when '÷' operator is used",
      },
    ].forEach((test) => {
      it(test.descr, function () {
        expect(
          calculate(test.firstNumber, test.lastNumber, test.operator)
        ).toBe(test.result);
      });
    });

    it("Returns positive Infinity when a positive number is divided by 0", function () {
      firstNumber = "1";
      lastNumber = "0";
      operator = "÷";
      expect(
        parseFloat(calculate(firstNumber, lastNumber, operator))
      ).toBePositiveInfinity();
    });

    it("Returns negative Infinity when a negative number is divided by 0", function () {
      firstNumber = "-1";
      lastNumber = "0";
      operator = "÷";
      expect(
        parseFloat(calculate(firstNumber, lastNumber, operator))
      ).toBeNegativeInfinity();
    });
  });

  describe("Testing 'Calculator' class", function () {
    let calculator;

    function display() {}

    describe("Testing 'constructor(displayFunction, calculateFunction)' method", function () {
      [
        {
          displayFunction: undefined,
          calculateFunction: calculate,
          descr: "TypeError when 'displayFunction' is undefined",
        },
        {
          displayFunction: "a",
          calculateFunction: calculate,
          descr: "TypeError when 'displayFunction' is not of type 'function'",
        },
        {
          displayFunction: display,
          calculateFunction: undefined,
          descr: "TypeError when 'calculatefunction' is undefined",
        },
        {
          displayFunction: display,
          calculateFunction: "a",
          descr: "TypeError when 'calculatefunction' is not of type 'function'",
        },
      ].forEach((test) => {
        it(test.descr, function () {
          expect(
            () => new Calculator(test.displayFunction, test.calculateFunction)
          ).toThrowError(TypeError);
        });
      });

      it("Every attribute has the expected values", function () {
        calculator = new Calculator(display, calculate);
        expect(calculator.operation).toBe("");
        expect(calculator.output).toBe("0");
        expect(calculator.currentResult).toBe("");
        expect(calculator.secondOperand).toBe("");
        expect(calculator.operator).toBe("");
        expect(calculator.newInput).toBeTrue();
        expect(calculator.operating).toBeFalse();
        expect(calculator.resolved).toBeFalse();
        expect(calculator.displayFunction).toBe(display);
        expect(calculator.calculateFunction).toBe(calculate);
      });
    });

    describe("Testing 'appendNumber(input)' method", function () {
      let input = "1",
        output;

      beforeEach(function () {
        calculator = new Calculator(display, calculate);
      });

      it("Calls the 'clearAll' method if resolved", function () {
        spyOn(calculator, "clearAll");
        calculator.resolved = true;
        calculator.appendNumber(input);
        expect(calculator.clearAll).toHaveBeenCalled();
      });

      it("Does not call the 'clearAll' method if not resolved", function () {
        spyOn(calculator, "clearAll");
        calculator.resolved = false;
        calculator.appendNumber(input);
        expect(calculator.clearAll).not.toHaveBeenCalled();
      });

      it("Output is replaced by the input if newInput", function () {
        calculator.newInput = true;
        calculator.appendNumber(input);
        expect(calculator.output).toBe(input);
        expect(calculator.newInput).toBeFalse();
      });

      it("Input is concatenated to output if not newInput", function () {
        output = calculator.output;
        calculator.newInput = false;
        calculator.appendNumber(input);
        expect(calculator.output).toBe(output.concat(input));
      });

      it("Operating and resolve are set to false, and 'updateDisplay' method is called", function () {
        spyOn(calculator, "updateDisplay");
        calculator.appendNumber(input);
        expect(calculator.operating).toBeFalse();
        expect(calculator.resolved).toBeFalse();
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });
    });

    describe("Testing 'appendPeriod' method", function () {
      beforeEach(function () {
        calculator = new Calculator(display, calculate);
      });

      it("Calls the 'clearAll' method if resolved", function () {
        spyOn(calculator, "clearAll");
        calculator.resolved = true;
        calculator.appendPeriod();
        expect(calculator.clearAll).toHaveBeenCalled();
      });

      it("Does not call the 'clearAll' method if not resolved", function () {
        spyOn(calculator, "clearAll");
        calculator.resolved = false;
        calculator.appendPeriod();
        expect(calculator.clearAll).not.toHaveBeenCalled();
      });

      it("The output is set to 0 if operating", function () {
        calculator.output = "1";
        calculator.operating = true;
        calculator.appendPeriod();
        expect(calculator.output).toBe("0,");
      });

      it("The output is not set to 0 if not operating", function () {
        calculator.output = "1";
        calculator.operating = false;
        calculator.appendPeriod();
        expect(calculator.output).toBe("1,");
      });

      it("A period is added to the output if it doesn't already have one", function () {
        calculator.output = "0";
        calculator.appendPeriod();
        expect(calculator.output).toBe("0,");
      });

      it("A period is not added to the output if it already has one", function () {
        calculator.output = "0,";
        calculator.appendPeriod();
        expect(calculator.output).toBe("0,");
      });

      it("newInput is set to false, and 'updateDisplay' method is called", function () {
        spyOn(calculator, "updateDisplay");
        calculator.appendPeriod();
        expect(calculator.newInput).toBeFalse();
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });
    });

    it("Testing 'inverse' method", function () {
      calculator = new Calculator(display, calculate);
      spyOn(calculator, "calculateFunction").and.returnValue("0,5");
      spyOn(calculator, "updateDisplay");
      calculator.output = "2";
      calculator.inverse();
      expect(calculator.operation).toBe("1/2");
      expect(calculator.output).toBe("0,5");
      expect(calculator.resolved).toBeTrue();
      expect(calculator.calculateFunction).toHaveBeenCalledWith("1", "2", "÷");
      expect(calculator.updateDisplay).toHaveBeenCalled();
    });

    it("Testing 'squared' method", function () {
      calculator = new Calculator(display, calculate);
      spyOn(Math, "pow").and.returnValue(6.25);
      spyOn(calculator, "updateDisplay");
      calculator.output = "2,5";
      calculator.squared();
      expect(calculator.operation).toBe("2,5²");
      expect(calculator.output).toBe("6,25");
      expect(calculator.resolved).toBeTrue();
      expect(Math.pow).toHaveBeenCalledWith("2.5", 2);
      expect(calculator.updateDisplay).toHaveBeenCalled();
    });

    it("Testing 'squaredRoot' method", function () {
      calculator = new Calculator(display, calculate);
      spyOn(Math, "sqrt").and.returnValue(2.5);
      spyOn(calculator, "updateDisplay");
      calculator.output = "6,25";
      calculator.squaredRoot();
      expect(calculator.operation).toBe("√6,25");
      expect(calculator.output).toBe("2,5");
      expect(calculator.resolved).toBeTrue();
      expect(Math.sqrt).toHaveBeenCalledWith("6.25");
      expect(calculator.updateDisplay).toHaveBeenCalled();
    });

    describe("Testing 'percentage' method", function () {
      beforeEach(function () {
        calculator = new Calculator(display, calculate);
      });

      it("Prepares an operation where the second operand is the output-defined percentage of the first operand", function () {
        spyOn(calculator, "calculateFunction").and.returnValues("0,5", "100");
        spyOn(calculator, "updateDisplay");
        calculator.currentResult = "200";
        calculator.operator = "+";
        calculator.output = "50";
        calculator.percentage();
        expect(calculator.secondOperand).toBe("100");
        expect(calculator.operation).toBe("200+100");
        expect(calculator.output).toBe("100");
        expect(calculator.calculateFunction).toHaveBeenCalledWith(
          "50",
          "100",
          "÷"
        );
        expect(calculator.calculateFunction).toHaveBeenCalledWith(
          "200",
          "0,5",
          "*"
        );
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });

      it("Sets both the operation and output to 0 if used incorrectly", function () {
        spyOn(calculator, "updateDisplay");
        calculator.operation = "12=";
        calculator.output = "12";
        calculator.currentResult = "";
        calculator.percentage();
        expect(calculator.operation).toBe("0");
        expect(calculator.output).toBe("0");
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });
    });

    describe("Testing 'operate(operator)' method", function () {
      beforeEach(function () {
        calculator = new Calculator(display, calculate);
      });

      it("If not operating and there is no first operand, sets it to the output", function () {
        calculator.operating = false;
        calculator.currentResult = "";
        calculator.output = "12";
        calculator.operate("+");
        expect(calculator.currentResult).toBe("12");
      });

      it("If resolved, sets the first operand to the output", function () {
        calculator.resolved = true;
        calculator.currentResult = "12";
        calculator.output = "12";
        calculator.operate("+");
        expect(calculator.currentResult).toBe("12");
      });

      it("If not operating and there is a first operand, the new first operand will be the result of the operation with the previous operator", function () {
        spyOn(calculator, "calculateFunction").and.returnValue("15");
        calculator.operating = false;
        calculator.currentResult = "12";
        calculator.operator = "+";
        calculator.output = "3";
        calculator.operate("-");
        expect(calculator.currentResult).toBe("15");
        expect(calculator.output).toBe("15");
        expect(calculator.calculateFunction).toHaveBeenCalledWith(
          "12",
          "3",
          "+"
        );
      });

      it("The operator, the operation and the rest of the parameters are correctly set", function () {
        spyOn(calculator, "updateDisplay");
        calculator.operate("+");
        expect(calculator.operator).toBe("+");
        expect(calculator.operation).toBe("0+");
        expect(calculator.secondOperand).toBe("");
        expect(calculator.newInput).toBeTrue();
        expect(calculator.operating).toBeTrue();
        expect(calculator.resolved).toBeFalse();
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });
    });

    describe("Testing 'changeSign' method", function () {
      beforeEach(function () {
        calculator = new Calculator(display, calculate);
      });

      it("Changes a positive output into its negative and calls the 'updateDisplay' method", function () {
        spyOn(calculator, "calculateFunction").and.returnValue("-1");
        spyOn(calculator, "updateDisplay");
        calculator.output = "1";
        calculator.changeSign();
        expect(calculator.output).toBe("-1");
        expect(calculator.calculateFunction).toHaveBeenCalledWith(
          "-1",
          "1",
          "*"
        );
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });

      it("Changes a negative output into its positive and calls the 'updateDisplay' method", function () {
        spyOn(calculator, "calculateFunction").and.returnValue("1");
        spyOn(calculator, "updateDisplay");
        calculator.output = "-1";
        calculator.changeSign();
        expect(calculator.output).toBe("1");
        expect(calculator.calculateFunction).toHaveBeenCalledWith(
          "-1",
          "-1",
          "*"
        );
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });
    });

    describe("Testing 'resolve' method", function () {
      beforeEach(function () {
        calculator = new Calculator(display, calculate);
      });

      it("If no second operand, sets it to the output", function () {
        calculator.operator = "+";
        calculator.secondOperand = "";
        calculator.output = "1";
        calculator.resolve();
        expect(calculator.secondOperand).toBe("1");
      });

      it("If resolved, sets the first operand to the output", function () {
        calculator.operator = "+";
        calculator.resolved = true;
        calculator.output = "1";
        calculator.resolve();
        expect(calculator.currentResult).toBe("1");
      });

      it("The output and operation are set correctly if operator is defined", function () {
        spyOn(calculator, "calculateFunction").and.returnValue("3");
        calculator.operator = "+";
        calculator.currentResult = "1";
        calculator.secondOperand = "2";
        calculator.resolve();
        expect(calculator.operation).toBe("1+2=");
        expect(calculator.output).toBe("3");
        expect(calculator.calculateFunction).toHaveBeenCalledWith(
          "1",
          "2",
          "+"
        );
      });

      it("Sets the operation as the output concatenated with '=' if no operator", function () {
        calculator.output = "1";
        calculator.resolve();
        expect(calculator.operation).toBe("1=");
      });

      it("Sets resolved to true and 'updateDisplay' method is called", function () {
        spyOn(calculator, "updateDisplay");
        calculator.resolve();
        expect(calculator.resolved).toBeTrue();
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });
    });

    describe("Testing 'delete' method", function () {
      beforeEach(function () {
        calculator = new Calculator(display, calculate);
      });

      it("Deletes the last character if the output length is 2 or greater", function () {
        spyOn(calculator, "updateDisplay");
        calculator.output = "12";
        calculator.delete();
        expect(calculator.output).toBe("1");
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });

      it("Sets the output to 0 if the output length is 1", function () {
        spyOn(calculator, "updateDisplay");
        calculator.output = "1";
        calculator.newInput = false;
        calculator.delete();
        expect(calculator.output).toBe("0");
        expect(calculator.newInput).toBeTrue();
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });
    });

    describe("Testing 'clearEntry' method", function () {
      beforeEach(function () {
        calculator = new Calculator(display, calculate);
      });

      it("Sets the output to 0  if not resolved", function () {
        spyOn(calculator, "updateDisplay");
        calculator.resolved = false;
        calculator.output = "1";
        calculator.newInput = false;
        calculator.clearEntry();
        expect(calculator.output).toBe("0");
        expect(calculator.newInput).toBeTrue();
        expect(calculator.updateDisplay).toHaveBeenCalled();
      });

      it("Clears everything if resolved", function () {
        spyOn(calculator, "clearAll");
        calculator.resolved = true;
        calculator.clearEntry();
        expect(calculator.clearAll).toHaveBeenCalled();
      });
    });

    it("Testing 'clearAll' method", function () {
      calculator = new Calculator(display, calculate);
      spyOn(calculator, "updateDisplay");
      calculator.operation = "12+34=";
      calculator.output = "46";
      calculator.currentResult = "12";
      calculator.secondOperand = "34";
      calculator.operator = "+";
      calculator.newInput = false;
      calculator.operating = true;
      calculator.resolved = true;
      calculator.clearAll();
      expect(calculator.operation).toBe("");
      expect(calculator.output).toBe("0");
      expect(calculator.currentResult).toBe("");
      expect(calculator.secondOperand).toBe("");
      expect(calculator.operator).toBe("");
      expect(calculator.newInput).toBeTrue();
      expect(calculator.operating).toBeFalse();
      expect(calculator.resolved).toBeFalse();
      expect(calculator.updateDisplay).toHaveBeenCalled();
    });

    it("Testing 'updateDisplay' method", function () {
      calculator = new Calculator(display, calculate);
      spyOn(calculator, "displayFunction");
      calculator.operation = "1+1=";
      calculator.output = "2";
      calculator.updateDisplay();
      expect(calculator.displayFunction).toHaveBeenCalledWith("1+1=", "2");
    });
  });
});
