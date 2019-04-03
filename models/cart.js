module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.title = oldCart.title || " ";
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.size = oldCart.size || 0;

  this.add = function(product, id, title, size) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        product: product,
        title: title,
        quantity: 0,
        size: size
      };
    }
    storedItem.quantity++;
    this.totalQty++;
    //this.title = storedItem.title;
    storedItem.price = storedItem.product.price * storedItem.quantity;
    this.totalPrice += storedItem.product.price;
    //this.size = storedItem.size;
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
