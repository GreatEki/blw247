let express = require("express");
let router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
let bcrypt = require("bcryptjs");
let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({extended: false});
let Cart = require("../models/cart");
let User = require("../models/users");




//@GET ROUTER to Profile Page
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("users/profile");
});

router.use('/', notLoggedIn, function(req, res, next) {
      return next();
});
//@users/login Router to Load the Login Page
router.get("/login", (req, res) => {
    var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
  req.session.cart = cart;
  var messages = req.flash('error');
  return res.render("users/login", {
    totalQty: cart.totalQty,
    messages: messages, hasError: messages.length > 0
  });
});

//@users/sign-up Router to Load the Sign Up Page
router.get("/signup", (req, res) =>  {
  var err = '';
    return res.render("users/signup", {errors: err});
});

//@users/signup Router to submit Sign Up Form
router.post("/signup", urlencodedParser, (req, res) => {
        const email = req.body.email;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const password = req.body.password;
        const password2 = req.body.password2;
        const street = req.body.street;
        const city = req.body.city;
        const state = req.body.state;
        const phoneNo = Number(req.body.phoneNo);
        const phoneNo2 = Number(req.body.phoneNo2);

        req.checkBody('email', "Email is required").notEmpty();
        req.checkBody('email', "Entry must be a valid email").isEmail();
        req.checkBody('firstname', "Firstname is required").notEmpty();
        req.checkBody('lastname', "lastname is required").notEmpty();
        req.checkBody('username', "Username is required").notEmpty();
        req.checkBody('password', "password is required").notEmpty();
        req.checkBody('password2', "passwords do not match").equals(password);
        req.checkBody('street', "Street is required").notEmpty();
        req.checkBody('city', "City is required").notEmpty();
        req.checkBody('state', "State  is required").notEmpty();
        req.checkBody('phoneNo', "Phone Number is required").notEmpty();


        let err = req.validationErrors();

        if (err) {
            res.render("users/signup", {errors: err});
        }
        else {
            User.findOne({email: email}, function(err, user){
                if (err) {
                    res.status(500).json("An Error Occurred, please try again");
                } 
                if (user) {
                    res.json("Email already exists");
                }
                else {
                    const newUser = new User({
                      firstname :firstname,
                      lastname : lastname,
                      email : email,
                      username: username,
                      password :password,
                      address : 
                      {
                      street : street,
                      city: city,
                      state :state
                      },
                      phoneNo : phoneNo,
                      phoneNo2 : phoneNo2
              
                    });

                    bcrypt.genSalt(10, function(err, salt) {
                      bcrypt.hash(newUser.password, salt, function(err, hash) {
                        if (err) {
                          res.status(500).json("A server operation failed; Hashing Error");
                        }
                        newUser.password = hash;
                        newUser.save(function(err) {
                          if (err) {
                            res.json(err);
                          } else {
                            req.flash("success", "Registered Successfully. Proceed to Login");
                            res.redirect("/users/login");
                          }
                        });
                      })
                    })

                }
            });
        }


});

//@POST REQUEST to /users/login
//@users/login Router to handle Login Authentication
  router.post("/login", urlencodedParser, function(req, res, next) {
    
    passport.use(new LocalStrategy(function(username, password, done) {

       username = req.body.username;
       password = req.body.password;

      User.findOne({email: username}, function(err, user){
          if (err) {
              console.log(err)
          }
          if (!user) {
              return done(null, false, {message: 'No User found'});
          }

          bcrypt.compare(password, user.password, function(err, isMatch){
              if (err) {
                  console.log(err);
              }
              if (isMatch) {
                  return done(null, user);
              } else {
                  return done(null, false, {message: 'Incorrect Password'})
              }
          });
      });
  }));

//Serialize User
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

//Deserialize User
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
  });

  
    passport.authenticate('local', {
      successRedirect: '/users/profile',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });


  //@GET ROUTER for LogOut
  router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/users/login");
    next();
  })


  //Methods for Route Protection
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', "Please Login");
    res.redirect("/users/login");
  }
}

function notLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) {
    return next();
  }
  
  
}


  module.exports = router;