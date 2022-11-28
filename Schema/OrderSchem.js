const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = Schema({
  user: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
  },
  transactionId: {
    type: String,
  },
  item: {
    type: String,
  },
});

module.exports = orderSchema;
