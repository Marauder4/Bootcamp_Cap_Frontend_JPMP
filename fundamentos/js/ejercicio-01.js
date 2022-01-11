/*
Crear una función que devuelva un numero aleatorio (Math.random()) dentro del rango dado.
*/

function ranInt(min, max) {
  if(min>max) throw new RangeError("The minimum value must be equal to or lower than the maximum value.");
  return min + Math.floor(Math.random() * (max - min + 1));
}

console.log(ranInt(1, 10));
