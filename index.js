const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

const productRoute = require("./Router/ProductRoute");
const userRoute = require("./Router/UserRoute");
const cartRoute = require("./Router/CartRoute");
const blogRoute = require("./Router/BlogRouter");
// mongoose connect
mongoose
  .connect(
    "mongodb+srv://borkhaShop:KZsUxuXUihEEtcOM@cluster0.0skuhfp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connect");
  })
  .catch((err) => {
    err.message;
  });

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/blog", blogRoute);

app.get("/", (req, res) => {
  res.send("hello from borkhaShop");
});

app.listen(port, () => {
  console.log("listenig port 3000");
});
