const { body } = require("express-validator");

module.exports.validate = funcName => {
  switch (funcName) {
    case "createSeller":
      return [
        body("username", "Username is required.").exists(),
        body("fullname", "Fullname is required.").exists(),
        body("address", "Address is required.").exists(),
        body("email", "Email is required.")
          .exists()
          .isEmail(),
        body("mob", "Mobile no is required.")
          .exists()
          .matches(/[+639]\d\d\d\d\d\d\d\d\d/),
        body("landline")
          .optional()
          .matches(/[8]\d\d\d\-\d\d\d\d/)
      ];
    case "deleteSeller":
      return [body("id", "ID is required.").exists()];
  }
};
