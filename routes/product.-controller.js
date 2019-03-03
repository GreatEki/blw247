var express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Product = require("../models/product");
var Cart = require("../models/cart");

//GET route for purchasing and displaying a singular product
router.get("/:id", (req, res) => {
  Product.findById(req.params.id, function(err, product) {
    if (!err) {
      return res.render("product", { product: product });
    } else {
      return res.json(500);
    }
  });
});
/*
router.get("/add-to-cart/:id", (req, res) => {
  var productId = req.params.id;

  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.json(400).redirect("/");
    }
    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    return res.redirect("/gallery");
  });
});
*/

//POST route for adding selected product to
router.post("/add-to-cart/:id", urlencodedParser, (req, res) => {
  var productId = req.params.id;
  var productQty = req.body.qty;
  var productSize = req.body.size;

  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.json(404);
    }
    cart.add(product, product.id, productQty);
    req.session.cart = cart;
    console.log(req.session.cart);
    console.log(productSize);
    return res.redirect("/gallery");
  });
});

module.exports = router;
