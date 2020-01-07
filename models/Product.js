const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  totalIS: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  seller: { type: Schema.Types.ObjectId, ref: "seller_info" },
  isDelete: { typ: Boolean, default: false },
  picked: { type: Array, default: [] }
});

module.exports = Product = mongoose.model("product_info", ProductSchema);
