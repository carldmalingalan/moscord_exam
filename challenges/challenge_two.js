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

// const calculateValidationNumber = input => {
//   if (!parseInt(input) || isNaN(parseInt(input))) {
//     return false;
//   }
//   let total = sumOfList(input.toString().split(""));

//   while (total >= 10) {
//     total = sumOfList(total.toString().split(""));
//   }
//   return total;
// };

// console.time("time");
// console.log(calculateValidationNumber(1234));
// console.timeEnd("time");

console.log(calculateValidationNumber(555));
