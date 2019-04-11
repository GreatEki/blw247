var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  username: {type: String, required: true},
  password: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  phoneNo: { type: Number, required: true },
  phoneNo2: Number
 });

const User = mongoose.model("User", userSchema);

module.exports = User;
