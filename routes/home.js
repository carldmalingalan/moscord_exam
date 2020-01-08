const EP = require("express").Router();
const preValidate = require("../middlewares/preValidate");
const {
  getProducts,
  filterProducts,
  addToCart
} = require("../middlewares/homeMW");

EP.route("/list")
  .get(getProducts)
  .post(filterProducts);

EP.route("/add").post(preValidate.validate("addToCart"), addToCart);

module.exports = EP;
