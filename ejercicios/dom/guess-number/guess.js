function ranInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function checkGuess() {
  if (tries === maxTries) {
    result.textContent = "Trial limit reached.";
    return;
  }
  const userInput = parseInt(guessNum.value);
  tries++;
  triesSpan.textContent = tries;
  triesList.push(userInput);
  pastTries.textContent = triesList;
  if (!userInput) {
    result.textContent = "Input not valid.";
  } else if (userInput < numToGuess) {
    result.textContent = `Your guess, ${userInput}, is too low! Try again!`;
  } else if (userInput > numToGuess) {
    result.textContent = `Your guess, ${userInput}, is too high! Try again!`;
  } else {
    result.textContent = `Your guess, ${userInput}, is correct! Congrats!`;
  }
}

let numToGuess = ranInt(0, 100);
const maxTries = 10;
let tries = 0;
const triesList = [];
const genNum = document.querySelector("#genNum");
const showNum = document.querySelector("#showNum");
const ranNum = document.querySelector("#ranNum");
const triesSpan = document.querySelector("#triesSpan");
const resetTries = document.querySelector("#resetTries");
const guessNum = document.querySelector("#guessNum");
const guessTry = document.querySelector("#guessTry");
const pastTries = document.querySelector("#pastTries");
const result = document.querySelector("#result");

ranNum.textContent = numToGuess;
triesSpan.textContent = tries;
pastTries.textContent = triesList;

genNum.addEventListener("click", () => {
  numToGuess = ranInt(0, 100);
  ranNum.textContent = numToGuess;
  tries = 0;
  triesSpan.textContent = tries;
  triesList.splice(0, triesList.length);
  pastTries.textContent = triesList;
  guessNum.value = "";
  result.textContent = "";
});

showNum.addEventListener("mousedown", () => {
  ranNum.style.display = "block";
});

showNum.addEventListener("mouseup", () => {
  ranNum.style.display = "none";
});

resetTries.addEventListener("click", () => {
  tries = 0;
  triesSpan.textContent = tries;
});

guessTry.addEventListener("click", checkGuess);
