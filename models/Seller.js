const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: Object, required: true, default: {} },
  isDelete: { type: Boolean, default: false },
  dateCreate: { type: Date, default: Date.now }
});

module.exports = Seller = mongoose.model("seller_info", SellerSchema);
