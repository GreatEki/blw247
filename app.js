var express = require("express");
var mongoose = require("mongoose");
let cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);
var passport =  require("passport");
var flash =  require("connect-flash");
const expressValidator = require("express-validator");



var config = require("./config/database");


var app = express();


app.set("view engine", "ejs");
app.use("/public", express.static("public"));

mongoose.connect(config.database, {useNewUrlParser: true});

//Cookie Parser middleware
app.use(cookieParser());


//Session middleware
app.use(
  session({
    secret: "appsecret",
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
  })
);


//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator MiddleWare
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;
    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value 
    };
  }
}));

//Passport Initialization and Middleware
app.use(passport.initialize());
app.use(passport.session());



//Setting global variables for use across the application
app.use(function(req, res, next) {
  res.locals.session = req.session;
  res.locals.login = req.isAuthenticated();
  next();
});

//Importing routes-controllers
var router = require("./routes/controller");
var productRouter = require("./routes/product-controller");
var usersRouter = require("./routes/user-controller");

//var productSeeder = require("./seeder/product-seeder");
//productSeeder;

app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/", router);

const port = 5000;
app.listen(port, console.log(`Now listening to port ${port}`));
