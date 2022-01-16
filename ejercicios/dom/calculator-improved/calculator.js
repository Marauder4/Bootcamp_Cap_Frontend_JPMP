function calculate(firstNumber, lastNumber, operator) {
  let result = 0;
  const cf = 10;
  firstNumber = parseFloat(firstNumber.replace(",", "."));
  lastNumber = parseFloat(lastNumber.replace(",", "."));
  if (isNaN(firstNumber) || isNaN(lastNumber)) return;
  switch (operator) {
    case "+":
      result = (firstNumber * cf + lastNumber * cf) / cf;
      break;
    case "-":
      result = (firstNumber * cf - lastNumber * cf) / cf;
      break;
    case "*":
      result = (firstNumber * cf * (lastNumber * cf)) / (cf * cf);
      break;
    case "÷":
      result = (firstNumber * cf) / (lastNumber * cf);
      break;
    default:
      return;
  }
  return result.toString().replace(".", ",");
}

class Calculator {
  constructor(displayFunction, calculateFunction) {
    if (!displayFunction || typeof displayFunction !== "function")
      throw new TypeError("Unacceptable display function");
    if (!calculateFunction || typeof calculateFunction !== "function")
      throw new TypeError("Unacceptable calculate function");
    this.operation = "";
    this.output = "0";
    this.currentResult = "";
    this.secondOperand = "";
    this.operator = "";
    this.newInput = true;
    this.operating = false;
    this.resolved = false;
    this.displayFunction = displayFunction;
    this.calculateFunction = calculateFunction;
  }

  appendNumber(input) {
    if (this.resolved) this.clearAll();
    if (this.newInput) {
      this.output = input;
      this.newInput = false;
    } else {
      this.output += input;
    }
    this.operating = false;
    this.resolved = false;
    this.updateDisplay();
  }

  appendPeriod() {
    if (this.resolved) this.clearAll();
    if (this.operating) this.output = "0";
    if (!this.output.includes(",")) this.output += ",";
    this.newInput = false;
    this.updateDisplay();
  }

  inverse() {
    this.operation = "1/".concat(this.output);
    this.output = this.calculateFunction("1", this.output, "÷");
    this.resolved = true;
    this.updateDisplay();
  }

  squared() {
    this.operation = this.output.concat("²");
    this.output = Math.pow(this.output.replace(",", "."), 2)
      .toString()
      .replace(".", ",");
    this.resolved = true;
    this.updateDisplay();
  }

  squaredRoot() {
    this.operation = "√".concat(this.output);
    this.output = Math.sqrt(this.output.replace(",", "."))
      .toString()
      .replace(".", ",");
    this.resolved = true;
    this.updateDisplay();
  }

  percentage() {
    if (this.currentResult) {
      const percentage = this.calculateFunction(this.output, "100", "÷");
      this.secondOperand = this.calculateFunction(
        this.currentResult,
        percentage,
        "*"
      );
      this.operation = this.currentResult.concat(
        this.operator,
        this.secondOperand
      );
      this.output = this.secondOperand;
    } else {
      this.operation = "0";
      this.output = "0";
      this.newInput = true;
    }
    this.updateDisplay();
  }

  operate(operator) {
    if ((!this.operating && !this.currentResult) || this.resolved) {
      this.currentResult = this.output;
    } else if (!this.operating && this.currentResult) {
      this.currentResult = this.calculateFunction(
        this.currentResult,
        this.output,
        this.operator
      );
      this.output = this.currentResult;
    }
    this.operator = operator;
    this.operation = this.currentResult.concat(this.operator);
    this.secondOperand = "";
    this.newInput = true;
    this.operating = true;
    this.resolved = false;
    this.updateDisplay();
  }

  changeSign() {
    this.output = this.calculateFunction("-1", this.output, "*");
    this.updateDisplay();
  }

  resolve() {
    if (this.operator) {
      if (!this.secondOperand) this.secondOperand = this.output;
      if (this.resolved) this.currentResult = this.output;
      this.output = this.calculateFunction(
        this.currentResult,
        this.secondOperand,
        this.operator
      );
      this.operation = this.currentResult.concat(
        this.operator,
        this.secondOperand,
        "="
      );
    } else {
      this.operation = this.output.concat("=");
    }
    this.resolved = true;
    this.updateDisplay();
  }

  delete() {
    if (this.output.length > 1) {
      this.output = this.output.slice(0, -1);
    } else if (this.output.length > 0) {
      this.output = "0";
      this.newInput = true;
    }
    this.updateDisplay();
  }

  clearEntry() {
    if (!this.resolved) {
      this.output = "0";
      this.newInput = true;
      this.updateDisplay();
    } else {
      this.clearAll();
    }
  }

  clearAll() {
    this.operation = "";
    this.output = "0";
    this.currentResult = "";
    this.secondOperand = "";
    this.operator = "";
    this.newInput = true;
    this.operating = false;
    this.resolved = false;
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayFunction(this.operation, this.output);
  }
}
