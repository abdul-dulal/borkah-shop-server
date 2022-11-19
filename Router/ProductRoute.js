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

router.get("/api/v1/getbyId/:id", async (req, res) => {
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

// router.get("/getdata", async (req, res) => {
//   try {
//     const filters = { ...req.query };
//     // sort limit, page excluded

//     const excludeFiedls = ["sort", "page", "limit"];
//     excludeFiedls.forEach((field) => delete filters[field]);

//     let queries = {};
//     if (req.query.sort) {
//       const sortby = req.query.sort.split(",").join(" ");
//       queries.sortby = sortby;
//     }
//     console.log(queries.sortby);
//     const result = await Product.find({}, { name: 1, price: 1 }).sort(
//       queries.sortby
//     );
//     res.send(result);
//   } catch (err) {
//     res.json({
//       message: err.message,
//     });
//   }
// });
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
    res.send(result);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

module.exports = router;
