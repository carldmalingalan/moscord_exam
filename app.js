const express = require("express");
const app = express();
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose
  .connect(process.env.MongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/seller", require("./routes/seller"));
app.use("/product", require("./routes/product"));
app.use("/home", require("./routes/home"));
app.use("/report", require("./routes/report"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Connected to port ${process.env.PORT}`);
});
