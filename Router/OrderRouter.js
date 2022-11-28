const router = require("express").Router();
const mongoose = require("mongoose");
const orderSchema = require("../Schema/OrderSchem");
const Order = mongoose.model("Order", orderSchema);

router.post("/myorder", async (req, res) => {
  console.log(req.body);
  console.log(req.body);
  const newOrder = new Order(req.body);
  try {
    await newOrder.save();
    res.json({
      message: "Success",
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

module.exports = router;
