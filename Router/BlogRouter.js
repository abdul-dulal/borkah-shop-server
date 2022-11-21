const router = require("express").Router();
const mongoose = require("mongoose");
const blogSchema = require("../Schema/BlogSchema");
const Blog = mongoose.model("blog", blogSchema);

router.post("/blogPost", async (req, res) => {
  const blog = new Blog(req.body);
  try {
    await blog.save();
    res.send("success");
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

    if (endIndex < (await Blog.find({})).length) {
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

    result.results = await Blog.find({}).limit(limit).skip(startIndex).exec();
    res.send(result);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/singleblog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findById({ _id: id });
    res.send(result);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

router.get("/getAllBlog", async (req, res) => {
  try {
    const blog = await Blog.find({});
    res.send(blog);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});
router.get("/getcategory", async (req, res) => {
  try {
    const query = req.query.category;
    const result = await Blog.find({ category: query });
    res.send(result);
  } catch (err) {
    res.json({ message: err.message });
  }
});
module.exports = router;
