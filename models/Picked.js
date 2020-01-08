const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PickedSchema = new Schema({
  dateAdded: { type: Date, default: Date.now },
  qty: { type: Number, required: true }
});

module.exports = Picked = mongoose.model("picked_infos", PickedSchema);
