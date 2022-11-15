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
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = cartSchema;
