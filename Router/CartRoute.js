const router = require("express").Router();
const mongoose = require("mongoose");
const cartSchema = require("../Schema/Cartschema");
const cartItem = mongoose.model("cart", cartSchema);
router.post("/cartItem", async (req, res) => {
  const item = new cartItem(req.body);
  try {
    await item.save();
    res.send("Success");
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/getAllItem", async (req, res) => {
  try {
    const items = await cartItem.find();
    res.send(items);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});
router.delete("/delete-cartItem/:id", async (req, res) => {
  try {
    const remove = await cartItem.findByIdAndDelete({ _id: req.params.id });
    res.send(remove);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/get-cartItems", async (req, res) => {
  try {
    const cartProduct = await cartItem.find({ user: req.query.user });
    res.send(cartProduct);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.delete("/deleteAllItems", async (req, res) => {
  const ids = req.body.ids;

  try {
    const product = await cartItem.deleteMany({ _id: ids });
    res.send(product);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

module.exports = router;
