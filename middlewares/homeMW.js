const Product = require("../models/Product");
const Picked = require("../models/Picked");
const { validationResult } = require("express-validator");

const cleanThis = obj => JSON.parse(JSON.stringify(obj));

module.exports.getProducts = (req, res, next) => {
  try {
    Product.aggregate([
      { $match: { isDelete: false } },
      {
        $lookup: {
          from: "seller_infos",
          localField: "seller",
          foreignField: "_id",
          as: "seller"
        }
      },
      { $match: { "seller.isDelete": false } },
      {
        $project: { _id: 1, name: 1, desc: 1, totalIS: 1, "seller.username": 1 }
      }
    ])
      .then(resData => {
        res.status(200).json({ status: "success", data: resData });
        next();
      })
      .catch(resErr => {
        console.log(resErr);
        res.status(400).json({ status: "error", data: "Something went wrong" });
        return;
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      data: "Something went wrong fetching products."
    });
    return;
  }
};

module.exports.filterProducts = (req, res, next) => {
  try {
    const { queryStr } = req.body;
    Product.aggregate([
      { $match: { isDelete: false } },
      {
        $lookup: {
          from: "seller_infos",
          localField: "seller",
          foreignField: "_id",
          as: "seller"
        }
      },
      { $match: { "seller.isDelete": false } },
      {
        $project: {
          _id: 1,
          name: 1,
          desc: 1,
          totalIS: 1,
          "seller.username": 1,
          "seller.fullname": 1
        }
      },
      { $addFields: { key: "$_id" } },
      {
        $match: {
          $or: [
            { name: { $regex: new RegExp(`${queryStr}`, "i") } },
            { desc: { $regex: new RegExp(`${queryStr}`, "i") } },
            { "seller.username": { $regex: new RegExp(`${queryStr}`, "i") } },
            { "seller.fullname": { $regex: new RegExp(`${queryStr}`, "i") } }
          ]
        }
      }
    ])
      .then(resData => {
        res.status(200).json({ status: "success", data: resData });
        next();
      })
      .catch(resErr => {
        console.log(resErr);
        res.status(400).json({ status: "error", data: "Something went wrong" });
        return;
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};

module.exports.addToCart = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsgs = errors
        .array()
        .map(({ value, msg, param }) => ({ value, msg, param }));
      res.status(442).json({ status: "error", data: errMsgs });
      return;
    }
    const { id, qty } = req.body;
    const itemAdd = new Picked({ qty });
    Product.findOneAndUpdate(
      { _id: id, isDelete: false },
      {
        $push: { picked: itemAdd }
      }
    )
      .select("name desc")
      .exec((err, data) => {
        if (err || !data) {
          res.status(400).json({
            status: "error",
            data: "Something went wrong adding to cart"
          });
          return;
        }

        res.status(200).json({
          status: "success",
          data: { ...cleanThis(itemAdd), ...cleanThis(data) }
        });
        next();
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};
