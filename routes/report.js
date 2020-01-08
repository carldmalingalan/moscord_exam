const EP = require("express").Router();
const { repEachProd, rankPerSeller } = require("../middlewares/reportMW");

EP.route("/rep").get(repEachProd);

EP.route("/rps").get(rankPerSeller);

module.exports = EP;
