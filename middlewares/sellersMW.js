const Seller = require("../models/Seller");
const { validationResult } = require("express-validator");

module.exports.listSeller = (req, res, next) => {
  try {
    Seller.find({ isDelete: false })
      .select("-items")
      .exec((err, data) => {
        if (err) {
          res
            .status(400)
            .json({ status: "error", data: "Something went wrong." });
          return;
        }
        const finalData = JSON.parse(
          JSON.stringify(data)
        ).map((val, index) => ({ ...val, key: index }));

        res.status(200).json({ status: "success", data: finalData });
        next();
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};

module.exports.createSeller = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsgs = errors
        .array()
        .map(({ value, msg, param }) => ({ value, msg, param }));
      res.status(442).json({ status: "error", data: errMsgs });
      return;
    }
    const { username, fullname, email, address, mob, landline } = req.body;
    const contact = { mob, landline };

    Seller.findOne({ email, isDelete: false }).exec((err, data) => {
      if (err) {
        res
          .status(400)
          .json({ status: "error", data: "Something went wrong." });
        return;
      }

      if (data) {
        res
          .status(400)
          .json({ status: "error", data: "Seller already exists." });
        return;
      }

      let newSeller = new Seller({
        username,
        fullname,
        email,
        address,
        contact
      });

      newSeller.save(err => {
        if (err) {
          res
            .status(400)
            .json({ status: "error", data: "Something went wrong." });
          return;
        }
        res.status(200).json({
          status: "success",
          data: `Seller(${username}) created successfully`
        });
        next();
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};

module.exports.deleteSeller = (req, res, next) => {
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

    Seller.findByIdAndUpdate({ _id: id }, { isDelete: true }, (err, data) => {
      if (err || !data) {
        res.status(400).json({
          status: "error",
          data: "Something went wrong deleting seller."
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: `Successfully deleted ${data.username}`
      });
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};

module.exports.findSeller = (req, res, next) => {
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

    Seller.findOne({ _id: id, isDelete: false }).exec((err, data) => {
      if (err || !data) {
        res.status(400).json({
          status: "error",
          data: "Something went wrong finding seller."
        });
        return;
      }
      res.status(200).json({ status: "Success", data });
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};

module.exports.updateSeller = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsgs = errors
        .array()
        .map(({ value, msg, param }) => ({ value, msg, param }));
      res.status(442).json({ status: "error", data: errMsgs });
      return;
    }
    const { id, username, fullname, address, mob, email, landline } = req.body;
    const finalUpdate = {
      username,
      fullname,
      address,
      email,
      contact: { mob, landline }
    };

    Seller.findOneAndUpdate(
      { _id: id, isDelete: false },
      finalUpdate,
      (err, data) => {
        if (err || !data) {
          res.status(400).json({
            status: "error",
            data: "Something went wrong updating seller."
          });
          return;
        }
        res.status(200).json({ status: "success", data });
        next();
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", data: "Something went wrong." });
    return;
  }
};
