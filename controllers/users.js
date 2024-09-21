const  User = require("../models/user.js");


module.exports .signupForm = (req,res) => {
    res.render("users/signup.ejs");
 };
module.exports.signup = async(req,res) => {
   
    try{
      let { username, email, password} =  req.body;
   const newUser= new User({ email , username});
   const registeredUser = await User.register(newUser ,  password);
   console.log(registeredUser);
   req.login(registeredUser,(err) => {
    if(err) {
      return next(err);
    }
    req.flash("success", " Welcome to Wanderlust");
    res.redirect("/listings");
   })
    
    } catch(e){
      req.flash("error", e.message);
      res.redirect ("/signup");
    }
  };
   module.exports.renderLoginform = (req,res) => {
    res.render("users/login.ejs");
};
 module.exports.Login = async(req,res) => {
    req.flash( "success"," welcome to Wanderlust ! You are logged in !");
    console.log(res.locals.redirectUrl);
   const redirectUrl = res.locals.redirectUrl || "/listings"
   res.redirect(redirectUrl);

};
 module.exports.Logout = (req,res) => {
    req.logOut((err) => {
     if(err) {
        return next(err);
     }
     req.flash("success"," you are logged out! ");
      res.redirect("/listings");
    })
 };