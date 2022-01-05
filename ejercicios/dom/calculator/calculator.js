let currentOperation = "";
let currentResult = "";
let firstNumber = "";
let secondNumber = "";
let operator = "";
let operating = false;
const numbersList = [];

const operation = document.querySelector("#currentOp");
const output = document.querySelector("#result");
const buttonPer = document.querySelector("#per");
const buttonCE = document.querySelector("#ce");
const buttonC = document.querySelector("#c");
const buttonDel = document.querySelector("#del");
const buttonInv = document.querySelector("#inv");
const buttonPow = document.querySelector("#pow");
const buttonSqr = document.querySelector("#sqr");
const buttonDiv = document.querySelector("#div");
const button7 = document.querySelector("#seven");
const button8 = document.querySelector("#eight");
const button9 = document.querySelector("#nine");
const buttonMul = document.querySelector("#mul");
const button4 = document.querySelector("#four");
const button5 = document.querySelector("#five");
const button6 = document.querySelector("#six");
const buttonSub = document.querySelector("#sub");
const button1 = document.querySelector("#one");
const button2 = document.querySelector("#two");
const button3 = document.querySelector("#three");
const buttonAdd = document.querySelector("#add");
const buttonSig = document.querySelector("#sig");
const button0 = document.querySelector("#zero");
const buttonCom = document.querySelector("#com");
const buttonEq = document.querySelector("#eq");

numbersList.push(
  button0,
  button1,
  button2,
  button3,
  button4,
  button5,
  button6,
  button7,
  button8,
  button9
);

for (let i = 0; i < numbersList.length; i++) {
  numbersList[i].addEventListener("click", () => {
    if (!operating) {
      currentResult += i;
      output.textContent = currentResult;
    } else {
      currentResult = "";
      currentResult += i;
      output.textContent = currentResult;
      operating = false;
    }
  });
}

buttonCom.addEventListener("click", () => {
  if (!currentResult.includes(".")) {
    currentResult += ".";
    output.textContent = currentResult;
  }
});

buttonCE.addEventListener("click", () => {
  if (secondNumber) {
    secondNumber = "";
    currentOperation = "";
    operation.textContent = currentOperation;
  }
  currentResult = "";
  output.textContent = currentResult;
});

buttonC.addEventListener("click", () => {
  currentResult = "";
  currentOperation = "";
  output.textContent = currentResult;
  operation.textContent = currentOperation;
});

buttonDel.addEventListener("click", () => {
  if (currentResult && currentResult.length > 1) {
    currentResult = currentResult.slice(0, -1);
  } else if (currentResult && currentResult.length > 0) {
    currentResult = "";
  }
  output.textContent = currentResult;
});

buttonSig.addEventListener("click", () => {
  currentResult &&
    (currentResult = eval(-currentResult).toString()) &&
    (output.textContent = currentResult);
});

buttonEq.addEventListener("click", () => {
  if (!operating && currentResult) {
    secondNumber = currentResult;
    operating = true;
  } else if (operating && currentResult) {
    firstNumber = currentResult;
  }
  currentResult = eval(firstNumber.concat(operator, secondNumber)).toString();
  operation.textContent = firstNumber.concat(operator, secondNumber, "=");
  output.textContent = currentResult;
});

buttonAdd.addEventListener("click", () => {
  firstNumber = currentResult;
  operator = "+";
  operation.textContent = firstNumber.concat(operator);
  operating = true;
});

buttonSub.addEventListener("click", () => {
  firstNumber = currentResult;
  operator = "-";
  operation.textContent = firstNumber.concat(operator);
  operating = true;
});

buttonMul.addEventListener("click", () => {
  firstNumber = currentResult;
  operator = "*";
  operation.textContent = firstNumber.concat(operator);
  operating = true;
});

buttonDiv.addEventListener("click", () => {
  firstNumber = currentResult;
  operator = "/";
  operation.textContent = firstNumber.concat(operator);
  operating = true;
});

buttonInv.addEventListener("click", () => {
  if (currentResult) {
    firstNumber = "1";
    operator = "/";
    secondNumber = currentResult;
    currentResult = eval(firstNumber.concat(operator, secondNumber)).toString();
    operation.textContent = firstNumber.concat(operator, secondNumber, "=");
    output.textContent = currentResult;
    operating = true;
  }
});
