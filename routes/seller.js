const EP = require("express").Router();
const preValidate = require("../middlewares/preValidate");
const {
  createSeller,
  listSeller,
  deleteSeller
} = require("../middlewares/sellersMW");

EP.route("/create").post(
  preValidate.validate("createSeller"),
  createSeller,
  (req, res) => {
    //   To be handled
    // res.status(200).json({ status: "success", data: "working" });
  }
);

EP.route("/delete").delete(
  preValidate.validate("deleteSeller"),
  deleteSeller,
  (req, res) => {
    // to be handled
  }
);

EP.route("/list").get(listSeller, (req, res) => {});

module.exports = EP;
