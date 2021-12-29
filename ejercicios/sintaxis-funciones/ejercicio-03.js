/*
Crear una función que devuelva un array con el numero de elementos indicado, inicializados al valor suministrado.
*/

function createArray(numElements, value) {
  const newArray = [];
  for (let i = 0; i < numElements; i++) {
    newArray.push(value);
  }
  return newArray;
}
