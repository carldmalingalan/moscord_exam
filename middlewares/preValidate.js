const { body } = require("express-validator");

module.exports.validate = funcName => {
  switch (funcName) {
    case "createSeller":
      return [
        body("username", "Username is required.")
          .exists()
          .not()
          .isEmpty(),
        body("fullname", "Fullname is required.")
          .exists()
          .not()
          .isEmpty(),
        body("address", "Address is required.")
          .exists()
          .not()
          .isEmpty(),
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
      return [
        body("id", "ID is required.")
          .exists()
          .not()
          .isEmpty()
      ];
    case "createProduct":
      return [
        body("id", "ID is required.")
          .exists()
          .not()
          .isEmpty(),
        body("name", "Product name is required.")
          .exists()
          .not()
          .isEmpty(),
        body("desc", "Description is required.")
          .exists()
          .not()
          .isEmpty(),
        body("totalIS", "Initial stock is required")
          .exists()
          .not()
          .isEmpty()
          .isNumeric()
      ];
    case "listProduct":
      return [
        body("id", "ID is required.")
          .exists()
          .not()
          .isEmpty()
      ];
    case "deleteProduct":
      return [
        body("id", "ID is required.")
          .exists()
          .not()
          .isEmpty()
      ];
    case "updateProduct":
      return [
        body("id", "ID is required.")
          .exists()
          .not()
          .isEmpty(),
        body("name", "Product name is required.")
          .exists()
          .not()
          .isEmpty(),
        body("desc", "Description is required.")
          .exists()
          .not()
          .isEmpty()
      ];
    case "addQtyProduct":
      return [
        body("id", "ID is required.")
          .exists()
          .not()
          .isEmpty(),
        body("count", "Stock is required.")
          .exists()
          .not()
          .isEmpty()
      ];
    case "addToCart":
      return [
        (body("id", "ID is required.")
          .exists()
          .not()
          .isEmpty(),
        body("qty", "Quantity is required.")
          .exists()
          .not()
          .isEmpty())
      ];
  }
};
