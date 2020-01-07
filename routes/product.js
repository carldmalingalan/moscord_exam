const EP = require("express").Router();
const preValidate = require("../middlewares/preValidate");
const {
  createProduct,
  listProduct,
  deleteProduct,
  updateProduct,
  addQtyProduct
} = require("../middlewares/productMW");

EP.route("/add").post(preValidate.validate("addQtyProduct"), addQtyProduct);
EP.route("/update").post(preValidate.validate("updateProduct"), updateProduct);
EP.route("/delete").post(preValidate.validate("deleteProduct"), deleteProduct);
EP.route("/create").post(preValidate.validate("createProduct"), createProduct);
EP.route("/list").post(preValidate.validate("listProduct"), listProduct);

module.exports = EP;
