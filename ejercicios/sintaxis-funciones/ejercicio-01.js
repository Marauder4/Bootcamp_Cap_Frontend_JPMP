function ranInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

console.log(ranInt(1, 10));
