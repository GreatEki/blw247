var express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
var Product = require("../models/product");

mongoose.connect(
  "mongodb://GreatEki:honourable_222@ds145895.mlab.com:45895/bullock",
  { useNewUrlParser: true }
);

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/contact", function(req, res) {
  res.render("contact");
});

router.get("/services", (req, res) => {
  return res.render("services");
});

router.get("/gallery", (req, res) => {
  Product.find({}, (err, docs) => {
    if (!err) {
      return res.render("gallery", { product: docs });
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

module.exports = router;
