const router = require("express").Router();
const mongoose = require("mongoose");
const cartSchema = require("../Schema/Cartschema");
const cartItem = mongoose.model("cart", cartSchema);
router.post("/cartItem", async (req, res) => {
  const cart = req.body;
  try {
    const query = {
      name: cart.name,
      user: cart.user,
    };
    const exist = await cartItem.findOne(query);

    if (exist) {
      return res.send({ success: false });
    } else {
      const item = new cartItem(req.body);
      await item.save();
      res.send({ success: true });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/get-cartItems", async (req, res) => {
  try {
    const cartProduct = await cartItem.find({ user: req.query.user });
    res.send(cartProduct.reverse());
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.put("/updateQuantity/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const result = await cartItem.updateOne({ name }, { $set: req.body });
    res.send(result);
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

router.put("/updateQunatity/:id", async (req, res) => {
  try {
    const update = await cartItem.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body }
    );
    res.send(update);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/deleteAllItems", async (req, res) => {
  console.log(req.body.ids);
  try {
    const product = await cartItem.deleteMany({ _id: req.body.ids });
    res.send(product);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

module.exports = router;
