function calculate(firstNumber, lastNumber, operator) {
  let result = 0;
  const cf = 10;
  firstNumber = parseFloat(firstNumber);
  lastNumber = parseFloat(lastNumber);
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
  return result.toString();
}

class Calculator {
  constructor() {
    this.operationDisplay = document.querySelector("[data-operation]");
    this.outputDisplay = document.querySelector("[data-output]");
    this.numberButtons = document.querySelectorAll("[data-number]");
    this.periodButton = document.querySelector("[data-period]");
    this.inverseButton = document.querySelector("[data-inverse]");
    this.squaredButton = document.querySelector("[data-squared]");
    this.squaredRootButton = document.querySelector("[data-squared-root]");
    this.percentageButton = document.querySelector("[data-percentage]");
    this.operatorButtons = document.querySelectorAll("[data-operator]");
    this.signButton = document.querySelector("[data-sign]");
    this.equalsButton = document.querySelector("[data-equals]");
    this.deleteButton = document.querySelector("[data-delete]");
    this.clearEntryButton = document.querySelector("[data-clear-entry]");
    this.clearAllButton = document.querySelector("[data-clear-all]");

    this.numberButtons.forEach((button) => {
      button.addEventListener("click", () =>
        this.appendNumber(button.textContent)
      );
    });
    this.periodButton.addEventListener("click", () => this.appendPeriod());
    this.inverseButton.addEventListener("click", () => this.inverse());
    this.squaredButton.addEventListener("click", () => this.squared());
    this.squaredRootButton.addEventListener("click", () => this.squaredRoot());
    this.percentageButton.addEventListener("click", () => this.percentage());
    this.operatorButtons.forEach((button) => {
      button.addEventListener("click", () => this.operate(button.textContent));
    });
    this.signButton.addEventListener("click", () => this.changeSign());
    this.equalsButton.addEventListener("click", () => this.resolve());
    this.deleteButton.addEventListener("click", () => this.delete());
    this.clearEntryButton.addEventListener("click", () => this.clearEntry());
    this.clearAllButton.addEventListener("click", () => this.clearAll());

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
    if (!this.output.includes(".")) this.output += ".";
    this.newInput = false;
    this.updateDisplay();
  }

  inverse() {
    this.operation = "1/".concat(this.output);
    this.output = calculate("1", this.output, "÷");
    this.resolved = true;
    this.updateDisplay();
  }

  squared() {
    this.operation = this.output.concat("²");
    this.output = Math.pow(this.output, 2).toString();
    this.resolved = true;
    this.updateDisplay();
  }

  squaredRoot() {
    this.operation = "√".concat(this.output);
    this.output = Math.sqrt(this.output).toString();
    this.resolved = true;
    this.updateDisplay();
  }

  percentage() {
    if (!this.currentResult) return;
    const percentage = calculate(this.output, "100", "÷");
    this.secondOperand = calculate(this.currentResult, percentage, "*");
    this.operation = this.currentResult.concat(
      this.operator,
      this.secondOperand
    );
    this.output = this.secondOperand;
    this.updateDisplay();
  }

  operate(operator) {
    if ((!this.operating && !this.currentResult) || this.resolved) {
      this.currentResult = this.output;
    } else if (!this.operating && this.currentResult) {
      this.currentResult = calculate(
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
    this.output = calculate("-1", this.output, "*");
    this.updateDisplay();
  }

  resolve() {
    if (!this.secondOperand) this.secondOperand = this.output;
    if (this.resolved) this.currentResult = this.output;
    this.output = calculate(
      this.currentResult,
      this.secondOperand,
      this.operator
    );
    this.operation = this.currentResult.concat(
      this.operator,
      this.secondOperand,
      "="
    );
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
    this.operationDisplay.textContent = this.operation;
    this.outputDisplay.textContent = this.output;
  }
}

const calculator = new Calculator();
