const router = require("express").Router();
const mongoose = require("mongoose");
const productSchema = require("../Schema/ProductSchema");
const Product = mongoose.model("product", productSchema);
router.post("/api/v1/uploadProduct", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.send("success");
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

router.get("/api/v1/getAllProudct", async (req, res) => {
  try {
    const product = await Product.find({});
    res.send(product);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});
router.get("/api/v1/getbyCategory", async (req, res) => {
  const category = req.query.category;
  try {
    const product = await Product.find({ category });
    res.send(product);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/getbyId/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const productbyId = await Product.findById(id);
    res.send(productbyId);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/api/v1/topRatedProduct", async (req, res) => {
  const value = req.query.price;
  const item = req.query.category;
  try {
    const topRatedProduct = await Product.find({
      $and: [{ category: item }, { price: { $gte: value } }],
    }).limit(3);
    res.send(topRatedProduct);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});
router.get("/api/v1/hijabItem", async (req, res) => {
  const hijab = req.query.category;
  const niqab = req.query.category;
  try {
    const topRatedProduct = await Product.find({
      $and: [{ category: hijab }, { category: niqab }],
    });
    res.send(topRatedProduct);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/api/v1/topRated", async (req, res) => {
  try {
    const topRatedProduct = await Product.find({ price: { $gte: 5500 } }).limit(
      18
    );
    res.send(topRatedProduct);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/allData", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};

    if (endIndex < (await Product.find({})).length) {
      result.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit,
      };
    }

    result.results = await Product.find({})
      .limit(limit)
      .skip(startIndex)
      .exec();
    console.log(result);
    res.send(result);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/pagination", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const min = req.query.lowest;
  const max = req.query.highest;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    if (endIndex < (await Product.find({})).length) {
      result.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit,
      };
    }
    result.results = await Product.find({
      $and: [{ price: { $gte: min } }, { price: { $lte: max } }],
    })
      .limit(limit)
      .skip(startIndex)
      .exec();

    res.send(result);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/lowestPrice", async (req, res) => {
  const min = req.query.min;
  const max = req.query.max;
  try {
    const result = await Product.find({
      $and: [{ price: { $gte: min } }, { price: { $lte: max } }],
    });
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/search", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  console.log(req.query.name);
  var regxp = new RegExp(req.query.name, "i");
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const itemResult = {};
    if (endIndex < (await Product.find({})).length) {
      itemResult.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      itemResult.previous = {
        page: page - 1,
        limit,
      };
    }

    itemResult.results = await Product.find({ name: regxp })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.send(itemResult);
  } catch (err) {
    message: err.message;
  }
});

router.put("/updateQunatity/:id", async (req, res) => {
  try {
    const update = await Product.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body }
    );
    console.log(update);
    res.send(update);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
