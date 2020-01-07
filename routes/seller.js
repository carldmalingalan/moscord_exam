const EP = require("express").Router();
const preValidate = require("../middlewares/preValidate");
const {
  createSeller,
  listSeller,
  deleteSeller,
  findSeller,
  updateSeller
} = require("../middlewares/sellersMW");

EP.route("/find").post(
  preValidate.validate("deleteSeller"),
  findSeller,
  (req, res) => {
    // to be handled
  }
);

EP.route("/create").post(
  preValidate.validate("createSeller"),
  createSeller,
  (req, res) => {
    //   To be handled
    // res.status(200).json({ status: "success", data: "working" });
  }
);

EP.route("/update").post(
  preValidate.validate("createSeller"),
  updateSeller,
  (req, res) => {
    // to be handled
  }
);

EP.route("/delete").post(
  preValidate.validate("deleteSeller"),
  deleteSeller,
  (req, res) => {
    // to be handled
  }
);

EP.route("/list").get(listSeller, (req, res) => {});

module.exports = EP;
