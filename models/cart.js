module.exports = function Cart(oldCart) {
  this.items = oldCart || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(product, id, qty, size) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = {
        product: product,
        quantity: qty,
        size: size
      };
    }
    //storedItem.quantity += qty;
    this.totalQty += qty;
    storedItem.price = storedItem.product.price * qty;
    this.totalPrice += storedItem.product.price;
  };
  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};

/*
module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      //if the cart is empty, we are creating a new cart item of the item the customer has just selected
      storedItem = this.items[id] = {
        item: item,
        qty: 0,
        price: 0
      };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalPrice += storedItem.item.price;
  };
  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
*/
