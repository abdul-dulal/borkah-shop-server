const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = Schema(
  {
    blogTitle: {
      type: String,
      required: true,
    },
    blogImg: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = blogSchema;
