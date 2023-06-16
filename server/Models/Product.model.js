const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  imageURL: String,
  outstanding: Boolean,
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
