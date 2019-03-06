var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  address: String,
  phone_No: Number,
  cart: [
    {
      prodTitle: String,
      prodQty: Number,
      size: String,
      prodPrice: Number,
      totalPrice: Number
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
