/*
Adivina el Número, generar un número entre el 0 y el 100, introducir un número e informar si es igual, mayor o menor.
Hay un máximo de 10 intentos para encontrar el número que sea igual.
*/

function ranInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function guessNumber(maxTries = 10) {
  let tries = 0;
  let correct = false;
  const numToGuess = ranInt(0, 100);
  let userInput;
  do {
    userInput = parseInt(prompt("Please, enter an integer between 0 and 100"));
    tries++;
    if (!userInput) {
      console.log("Input not valid.");
      continue;
    }
    if (userInput < numToGuess) {
      console.log(`Your guess, ${userInput}, is too low! Try again!`);
    } else if (userInput > numToGuess) {
      console.log(`Your guess, ${userInput}, is too high! Try again!`);
    } else {
      correct = true;
    }
  } while (tries < maxTries && correct === false);
  correct
    ? console.log(`Number ${numToGuess} guessed correctly in ${tries} tries.`)
    : console.log(`Number ${numToGuess} was not guessed in ${tries} tries.`);
}

guessNumber();
