const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = Schema({
  name: {
    type: String,
    required: true,
    minLength: 10,
  },
  review: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = productSchema;
