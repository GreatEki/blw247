var mongoose = require("mongoose");
var Product = require("../models/product");

mongoose.connect(
  "mongodb://GreatEki:honourable_222@ds145895.mlab.com:45895/bullock",
  { useNewUrlParser: true }
);

let updatedProducts = [
  new Product({
    imagePath: "public/images/bullock-flat-leather-shoe.jpg",
    title: "Bull-Office-Men-1",
    price: 15000
  }),

  new Product({
    imagePath: "public/images/bull-office-black.jpg",
    title: "Bull-Office-Men-2",
    price: 20000
  }),
  new Product({
    imagePath: "public/images/bull-office-brown.jpg",
    title: "Bull-Office-Men-Leather-Brown",
    price: 20000
  }),
  new Product({
    imagePath: "public/images/Bull-Suade-Blue.jpg",
    title: "Bull-Suade-Blue-Men",
    price: 30000
  }),
  new Product({
    imagePath: "public/images/Bull-Suade-Grey.jpg",
    title: "Bull-Suade-Grey-Men",
    price: 30000
  })
];

var done = 0;
for (var i = 0; i < updatedProducts.length; i++) {
  updatedProducts[i].save(function(err) {
    done++;
    if (done === updatedProducts.length) {
      exit();
    }
    console.log(err);
  });
}
function exit() {
  mongoose.disconnect();
}
