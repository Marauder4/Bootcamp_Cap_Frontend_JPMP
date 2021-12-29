/*
Crear una función que valide un NIF
*/

const letterArray = [
  [0, "T"],  [1, "R"],  [2, "W"],  [3, "A"],  [4, "G"],  [5, "M"],
  [6, "Y"],  [7, "F"],  [8, "P"],  [9, "D"],  [10, "X"],  [11, "B"],
  [12, "N"],  [13, "J"],  [14, "Z"],  [15, "S"],  [16, "Q"],  [17, "V"],
  [18, "H"],  [19, "L"],  [20, "C"],  [21, "K"],  [22, "E"],
];

function getLetter(nifNum, letterArray) {
  return new Map(letterArray).get(nifNum % 23);
}

function isNIF(nif) {
  if (typeof nif !== "string") return false;
  let nifNumber = nif.slice(0, nif.length - 1);
  const accLen = [7, 8];
  if (!accLen.includes(nifNumber.length) || /\D/.test(nifNumber)) return false;
  const nifLetter = nif[nif.length - 1].toUpperCase();
  if (getLetter(nifNumber, letterArray) !== nifLetter) return false;
  return true;
}

console.log(isNIF("33333333P"));
console.log(isNIF("33333333A"));
console.log(isNIF("3333333N"));
console.log(isNIF("3333333V"));
