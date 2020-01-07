const Product = require("../models/Product");
const Seller = require("../models/Seller");
const { validationResult } = require("express-validator");

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.addQtyProduct = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsgs = errors
        .array()
        .map(({ value, msg, param }) => ({ value, msg, param }));
      res.status(442).json({ status: "error", data: errMsgs });
      return;
    }

    const { id, count } = req.body;

    Product.findOneAndUpdate(
      { _id: id, isDelete: false },
      { $inc: { totalIS: count } }
    ).exec((err, data) => {
      if (err || !data) {
        res.status(400).json({
          status: "error",
          data: "Something went wrong while updating products."
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: `${data.name}'s stock is now ${numberWithCommas(
          parseInt(data.totalIS) + parseInt(count)
        )}`
      });
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};

module.exports.updateProduct = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsgs = errors
        .array()
        .map(({ value, msg, param }) => ({ value, msg, param }));
      res.status(442).json({ status: "error", data: errMsgs });
      return;
    }

    const { id, name, desc } = req.body;

    Product.findOneAndUpdate({ _id: id, isDelete: false }, { name, desc }).exec(
      (err, data) => {
        if (err || !data) {
          res.status(400).json({
            status: "error",
            data: "Something went wrong while updating products."
          });
          return;
        }
        res.status(200).json({
          status: "success",
          data: "You successfully updated product information."
        });
        next();
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};

module.exports.deleteProduct = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsgs = errors
        .array()
        .map(({ value, msg, param }) => ({ value, msg, param }));
      res.status(442).json({ status: "error", data: errMsgs });
      return;
    }

    const { id } = req.body;
    Product.findByIdAndUpdate({ _id: id }, { isDelete: true }).exec(
      (err, data) => {
        if (err || !data) {
          res.status(400).json({
            status: "error",
            data: "Something went wrong while deleting products."
          });
          return;
        }

        res.status(200).json({
          status: "success",
          data: `${data.name} is successfully delete.`
        });
        next();
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};

module.exports.listProduct = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsgs = errors
        .array()
        .map(({ value, msg, param }) => ({ value, msg, param }));
      res.status(442).json({ status: "error", data: errMsgs });
      return;
    }

    const { id } = req.body;
    Seller.findOne({ _id: id, isDelete: false }, (err, data) => {
      if (err) {
        res.status(400).json({
          status: "error",
          data: "Something went wrong while finding products."
        });
        return;
      }

      if (!data) {
        res
          .status(400)
          .json({ status: "error", data: "Seller can't be found." });
        return;
      }

      Product.find({ seller: data._id, isDelete: false })
        .sort({ createdAt: -1 })
        .select("-seller -createdAt -picked")
        .exec((pErr, pData) => {
          if (pErr) {
            res.status(400).json({
              status: "error",
              data: "Something went wrong while finding products."
            });
            return;
          }
          const finalData = JSON.parse(JSON.stringify(pData)).map(value => ({
            ...value,
            key: value._id
          }));

          res.status(200).json({ status: "success", data: finalData });
          next();
        });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};

module.exports.createProduct = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsgs = errors
        .array()
        .map(({ value, msg, param }) => ({ value, msg, param }));
      res.status(442).json({ status: "error", data: errMsgs });
      return;
    }

    const { id, name, desc, totalIS } = req.body;

    if (totalIS < 5) {
      res
        .status(400)
        .json({ status: "error", data: "Initial stock must be atleast 5." });
      return;
    }

    let newProd = new Product({ name, desc, totalIS, seller: id });

    newProd.save(err => {
      if (err) {
        res.status(400).json({
          status: "error",
          data: "Something went wrong in saving the product."
        });
        return;
      }
      res
        .status(200)
        .json({ status: "success", data: "Product successfully created" });
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};
