/*
Crear la función constructora del juego Adivina el Número.
*/

function ranInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function GuessNumber(numToGuess, maxTries = 10) {
  this.numToGuess = parseInt(numToGuess);
  this.maxTries = maxTries;
  this.tries = 0;
}

GuessNumber.prototype.resetTries = function () {
  this.tries = 0;
};

function makeAGuess(game, guess) {
  if (game.tries === game.maxTries) {
    console.log("Trial limit reached.");
    return;
  }
  const userInput = parseInt(guess);
  game.tries++;
  if (!userInput) {
    console.log("Input not valid.");
  } else if (userInput < game.numToGuess) {
    console.log(`Your guess, ${userInput}, is too low! Try again!`);
  } else if (userInput > game.numToGuess) {
    console.log(`Your guess, ${userInput}, is too high! Try again!`);
  } else {
    console.log(`Your guess, ${userInput}, is correct! Congrats!`);
  }
}

const firstGame = new GuessNumber(ranInt(0, 100), 3);
makeAGuess(firstGame, 20);
makeAGuess(firstGame, 40);
makeAGuess(firstGame, 60);
firstGame.resetTries();
makeAGuess(firstGame, 80);
