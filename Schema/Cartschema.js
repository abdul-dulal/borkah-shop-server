const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: Array,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = cartSchema;
