var express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
var Product = require("../models/product");
var Cart = require("../models/cart");

router.get("/", function(req, res) {
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
  req.session.cart = cart;
  return res.render("index", {
    totalQty: cart.totalQty
  });
});

router.get("/contact", function(req, res) {
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
  req.session.cart = cart;
  return res.render("contact", {
    totalQty: cart.totalQty
  });
});

router.get("/services", (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
  req.session.cart = cart;
  return res.render("services", {
    totalQty: cart.totalQty
  });
});

router.get("/gallery", (req, res) => {
  Product.find({}, (err, docs) => {
    if (!err) {
      var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
      req.session.cart = cart;
      return res.render("gallery", { product: docs, totalQty: cart.totalQty });
    }
    return res.render(err);
  });
  /*
      productChunk = [];
      chunkSize = 4;
      for (i = 0; i < docs.length; i += chunkSize) {
        productChunk.push(docs.slice(i, i + chunkSize));
      }
      res.render("gallery", { product: productChunk });
    } else {
      res.render(err);
    }
    */
});

//@ GET ROUTE for shopping-cart.ejs View
router.get("/shopping-cart", (req, res) => {
  if (!req.session.cart) {
    return res.render("shopping-cart", { products: null });
  }
  var cart = new Cart(req.session.cart);
  return res.render("shopping-cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});

//@GET ROUTE for checkout.ejs
router.get("/checkout", (req, res) => {
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  var cart = new Cart(req.session.cart);
  return res.render("checkout", { total: cart.totalPrice });
});

module.exports = router;
