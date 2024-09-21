 if( process.env.NODE_ENV != "production"){
  require('dotenv').config();
 }


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
 const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const  falsh  =  require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local") ;
const User = require("./models/user.js");
const { any } = require("joi");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const UserRouter = require("./routes/user.js");
const { Console } = require('console');


const dburl = process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err); 
  });

async function main() {
  await mongoose.connect(dburl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



const store = MongoStore.create({
  mongoUrl:dburl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter:24*3600,
});
 store.on("error",() => {
  console.log("Error in MONGO SESSION STORE",err)
 });

  const sessionOptions = {
    store,
     secret: process.env.SECRET,
     resave:false,
     saveUninitialized:true,
     Cookie: {
      expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,
     maxAge: 7 * 24 * 60 * 60 * 1000,
     httpOnly:true,
     },
  };
  
  // app.get("/", (req, res) => {
  //   res.send("Hi, I am root");
  // });
  

   app.use(session(sessionOptions));
    app.use(falsh());

app.use(passport.initialize()); 
// iske session ke bad hi  use krte hai  jisse ki ek  hi web ke alag -2 page pr jane ke liye bar bar login na krna pde 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // user ko login / signin karwana 
 
 passport.serializeUser(User.serializeUser());  //  agar user ne login nkiya hau toh info ko serailize store krawana
 passport.deserializeUser(User.deserializeUser()); //  info ko remove krna 


//middleware for flash mssege 
    app.use((req, res, next) => {
      res.locals.success = req.flash("success");
      res.locals.error = req.flash("error");
      res.locals.currUser = req.user; // curr user means jis user ka session chal rha hai 
      next();
    });
   //   demo0 usere check 
 app.get("/demouser",async(req,res) => {
   let fakeUser  = new User ({
         email: " student@gmail.com",
         username:"delta-student",
   });
     let newuser = await  User.register(fakeUser,"helloword");
     res.send (newuser);
 });
 app.use("/listings", listingsRouter);
 app.use("/listings/:id/reviews",reviewsRouter); // jab review post krenege toh jo id aayegi bo
                                            // yanhi ruk jayegi iske aage nhi jayegi usko 
                                            //aage tk bhejne ke liye merge params ka use kerte hai 
                                            // const router =  express.Router({mergeParams:true});
                                            // check in reveiw .js file 
app.use("/",UserRouter);

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

 app.all("*",(req,res,next)=>{
   next(new ExpressError(404,"Page not found"));
 });

 app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });   
});
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});