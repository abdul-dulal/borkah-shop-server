const router = require("express").Router();
const mongoose = require("mongoose");
const checkoutSchema = require("../Schema/CheckoutScehma");
const Checkout = mongoose.model("checkout", checkoutSchema);

router.post("/saveAddress", async (req, res) => {
  try {
    const address = new Checkout(req.body);
    await address.save();
    res.send("success");
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/orderItem", async (req, res) => {
  try {
    const reuslt = await Checkout.find({ user: req.query.user });
    res.send(reuslt);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/billingDetails", async (req, res) => {
  try {
    const billing = await Checkout.find({ user: req.query.user });
    res.send(billing);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.put("/updatebillingDetails/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reuslt = await Checkout.updateOne({ _id: id }, { $set: req.body });
    res.send(reuslt);
  } catch (error) {}
});

module.exports = router;
