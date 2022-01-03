/*
Definir una función que determine si la cadena de texto que se le pasa como parámetro es un palíndromo, 
es decir, si se lee de la misma forma desde la izquierda y desde la derecha. 
Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".
*/

function isPalindrome(text) {
  const textStraight = text.trim().split(" ").join("").toLowerCase();
  const textReversed = textStraight.split("").reverse().join("");
  return textStraight === textReversed;
}

console.log(isPalindrome("La ruta nos aporto otro paso natural"));
console.log(isPalindrome("Amore Roma"));
console.log(isPalindrome("caramaroc"));
