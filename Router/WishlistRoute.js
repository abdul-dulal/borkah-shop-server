const router = require("express").Router();
const mongoose = require("mongoose");
const Wishlist = require("../Schema/WishlistSchema");
const wishtItem = mongoose.model("Wishtlist", Wishlist);

router.post("/item", async (req, res) => {
  try {
    const query = {
      user: req.body.user,
      name: req.body.name,
    };
    const exist = await wishtItem.findOne(query);
    if (exist) {
      return res.send({ success: false });
    } else {
      const item = new wishtItem(req.body);
      await item.save();
      res.send({ success: true });
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/getItem", async (req, res) => {
  try {
    const cartProduct = await wishtItem.find({ user: req.query.user });
    res.send(cartProduct.reverse());
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteItem/:id", async (req, res) => {
  try {
    const remove = await wishtItem.findOneAndDelete({ _id: req.params.id });
    res.send(remove);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/deleteAllItems", async (req, res) => {
  console.log(req.body.ids);
  try {
    const product = await wishtItem.deleteMany({ _id: req.body.ids });
    res.send(product);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});
module.exports = router;
