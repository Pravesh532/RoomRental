const express = require("express");
const router = express.Router(); 
const  User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")
const userController = require("../controllers/users.js")
   

  router.get("/signup",userController.signupForm)
 module.exports = router ;


  router.post("/signup",wrapAsync(userController.signup)
);
  // login 
router.get("/login",userController.renderLoginform);

   router.post ("/login", saveRedirectUrl,passport.authenticate("local" , {failureRedirect : "/login",failureFlash:true}), // check user registered hai ya mnhi 
       userController.Login);
    
    router.get("/logout",userController.Logout);

   module.exports = router ;




   