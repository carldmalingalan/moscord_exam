const sumOfList = list =>
  list.reduce((prev, curr) => parseInt(prev) + parseInt(curr));

const calculateValidationNumber = input => {
  if (!parseInt(input) || isNaN(parseInt(input))) {
    return false;
  }
  try {
    let total = sumOfList(input.toString().split(""));
    return total < 10 ? total : calculateValidationNumber(total);
  } catch (error) {
    return error;
  }
};

console.log(calculateValidationNumber(555));
