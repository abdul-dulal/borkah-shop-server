const mongoose = require("mongoose");
const { Schema } = mongoose;

const chekcoutSchema = Schema({
  fname: {
    type: String,
    required: [true, "name is required"],
  },
  lname: {
    type: String,
    required: [true, "phone last name is required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  city: {
    type: String,
    required: [true, "city is required"],
  },
  address: {
    type: String,
    required: [true, " address is rerquired"],
  },
  state: {
    type: String,
    required: [true, "state is required"],
  },
  country: {
    type: String,
    required: [true, "country is requried"],
  },

  user: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  item: {
    type: Number,
  },
});

module.exports = chekcoutSchema;
