var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema for product
var productSchema = new Schema({
  imagePath: String,
  title: String,
  price: Number
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
