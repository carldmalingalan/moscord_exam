const express = require("express");
const app = express();
const mongoose = require("mongoose");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config;
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

app.listen(process.env.PORT, () => {
  console.log(`Connected to port ${process.env.PORT}`);
});
