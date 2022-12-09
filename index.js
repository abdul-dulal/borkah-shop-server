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
const checkoutRoute = require("./Router/CheckoutRouter");
const orderRoute = require("./Router/OrderRouter");
const stripe = require("stripe")(
  "sk_test_51L1b9uAW02sEs2eFJWBvKe0m5cdcCOuRojcOoVBjmtbsWv6cYv6kohwrMgzInyggXM9ZeoMye8jgfxLtQWixGC6l00rn3f18i7"
);
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

// payment
app.post("/create-payment-intent", async (req, res) => {
  const service = req.body;
  const price = service.price;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/blog", blogRoute);
app.use("/checkout", checkoutRoute);
app.use("/order", orderRoute);

app.get("/", (req, res) => {
  res.send("hello from borkhaShop");
});

const errorHandeler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    error: err,
  });
};

app.listen(port, () => {
  console.log("listenig port 3000");
});
