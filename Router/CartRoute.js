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

module.exports = router;
