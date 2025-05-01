const findAndFilter = (array, condition) => {
  const rest = [];
  let element = null;
  array.forEach((arrayElement) => {
    if (condition(arrayElement)) element = arrayElement;
    else rest.push(arrayElement);
  });

  return [element, rest];
};

const chunkArray = (arr, n) => {
  const size = arr.length / n;
  return Array.from({ length: n }, (v, i) => {
    const a = arr.slice(i * size, i * size + size);
    if (a.length === 0) return [0];
    return a;
  });
};

const sumDigits = (array) =>
  array
    .toString()
    .split("")
    .reduce((prev, curr) => prev + +curr, 0);

const collapseArray = (arr) => {
  return arr
    .split("")
    .map((char) => char.charCodeAt(0))
    .reduce((prev, curr) => prev + +curr, 0);
};

const replaceDigitsWithSum = (arr) => {
  let num = collapseArray(arr);

  while (num >= 10) {
    num = sumDigits(num);
  }
  return num;
};

module.exports = { findAndFilter, chunkArray, replaceDigitsWithSum };
