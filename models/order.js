const mongoose = require("mongoose");

var Schema =  mongoose.Schema;

var orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true}
    
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;