/*
Crear la clase del juego Adivina el Número.
*/

function ranInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

class GuessNumber {
  constructor(numToGuess, maxTries = 10) {
    this.numToGuess = parseInt(numToGuess);
    this.maxTries = maxTries;
    this.tries = 0;
  }
  resetTries() {
    this.tries = 0;
  }
  makeAGuess(num) {
    if (this.tries === this.maxTries) {
      console.log("Trial limit reached.");
      return;
    }
    const userInput = parseInt(num);
    this.tries++;
    if (!userInput) {
      console.log("Input not valid.");
    } else if (userInput < this.numToGuess) {
      console.log(`Your guess, ${userInput}, is too low! Try again!`);
    } else if (userInput > this.numToGuess) {
      console.log(`Your guess, ${userInput}, is too high! Try again!`);
    } else {
      console.log(`Your guess, ${userInput}, is correct! Congrats!`);
    }
  }
}

const firstGame = new GuessNumber(ranInt(0, 100), 3);
firstGame.makeAGuess(20);
firstGame.makeAGuess(40);
firstGame.makeAGuess(60);
firstGame.resetTries();
firstGame.makeAGuess(80);
