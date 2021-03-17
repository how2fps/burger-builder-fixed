const findLowest = (array) => {
  let smallestNum = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] < smallestNum) {
      smallestNum = array[i];
    }
  }
  return smallestNum;
};

console.log(findLowest([1, 4, 2, 3]));
