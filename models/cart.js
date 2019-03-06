module.exports = function Cart(oldCart) {
  this.items = oldCart || {};
  this.title = oldCart.title || " ";
  this.prodQty = oldCart.qty || 0;
  this.totalQty = oldCart.totalQty || 0;
  this.prodPrice = oldCart.price || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.totalSize = oldCart.size || 0;

  this.add = function(product, id, title, qty, size) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        product: product,
        title: title,
        quantity: qty,
        size: size
      };
    }
    //storedItem.quantity += qty;
    this.prodQty = storedItem.quantity;
    this.totalQty += storedItem.quantity;
    this.title = storedItem.title;
    storedItem.price = storedItem.product.price * qty;
    this.prodPrice = storedItem.price;
    this.totalPrice += storedItem.price;
    this.totalSize = storedItem.size;
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
