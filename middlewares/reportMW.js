const Product = require("../models/Product");
const Seller = require("../models/Seller");

module.exports.repEachProd = (req, res, next) => {
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
        $project: { _id: 1, name: 1, picked: { $size: "$picked" } }
      },
      {
        $sort: { picked: -1 }
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
    res.status(400).json({ status: "error", data: "Something went wrong" });
    return;
  }
};

module.exports.rankPerSeller = (req, res, next) => {
  try {
    Seller.aggregate([
      { $match: { isDelete: false } },
      {
        $lookup: {
          from: "product_infos",
          localField: "_id",
          foreignField: "seller",
          as: "products"
        }
      },
      { $match: { "products.isDelete": false } },
      {
        $project: {
          _id: 1,
          username: 1,
          fullname: 1,
          products: {
            $map: {
              input: "$products",
              as: "prod",
              in: {
                _id: "$$prod._id",
                name: "$$prod.name",
                picked: { $size: "$$prod.picked" }
              }
            }
          }
        }
      },
      { $unwind: "$products" },
      { $sort: { "products.picked": -1 } },
      {
        $group: {
          _id: "$_id",
          username: { $first: "$username" },
          fullname: { $first: "$fullname" },
          products: { $push: "$products" }
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
    res.status(400).json({ status: "error", data: "Something went wrong" });
    return;
  }
};
