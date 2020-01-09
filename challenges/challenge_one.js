const people = [
  {
    name: "Arisa",
    department: "BP",
    gender: "F"
  },
  {
    name: "Ham",
    department: "IT",
    gender: "F"
  },
  {
    name: "Alice",
    department: "IT",
    gender: "F"
  },
  {
    name: "Anna",
    department: "DA",
    gender: "F"
  },
  {
    name: "Larry",
    department: "Sales",
    gender: "M"
  },
  {
    name: "Ria",
    department: "Sales",
    gender: "F"
  },
  {
    name: "JD",
    department: "Sales",
    gender: "M"
  },
  {
    name: "Thor",
    department: "Sales",
    gender: "M"
  },
  {
    name: "Karl",
    department: "Sales",
    gender: "M"
  },

  {
    name: "Rachel",
    department: "Sales",
    gender: "F"
  }
];

const pretty = listObj => JSON.stringify(listObj, null, 2);

/**
 *
 * @param {Object} listObject - An array of objects (This parameter is added to make the function reusable)
 * @param {String} gender  - Must be a string
 */
const listByGender = (listObject = [], gender) => {
  try {
    if (
      !Array.isArray(listObject) ||
      !listObject.length ||
      !gender ||
      !typeof gender === "string"
    ) {
      return false;
    }
    return listObject.filter(value => value.gender === gender);
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {Object} listObject - An array of objects (This parameter is added to make the function reusable)
 */
const groupByDeparment = (listObject = []) => {
  try {
    if (!Array.isArray(listObject) || !listObject.length) {
      return false;
    }
    let deparments = [...new Set(listObject.map(value => value.department))],
      grouped = {};

    deparments.forEach(value => {
      grouped["" + value] = listObject.filter(
        fValue => fValue.department === value
      );
      // If you want to exclude the "department" property
      // .map(({ name, gender }) => ({ name, gender }));
    });
    return grouped;
  } catch (error) {
    return error;
  }
};

console.log(pretty(listByGender(people, "F")));
console.log(pretty(groupByDeparment(people)));
