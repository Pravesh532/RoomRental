const express = require("express");
const router = express.Router();
 const wrapAsync = require("../utils/wrapAsync.js");
 const ExpressError = require("../utils/ExpressError.js");
 const {listingSchema}= require("../schema.js");
 const Listing = require("../models/listing.js");
 const {isLoggedIn,isOwner,validateListing,} = require("../middleware.js");
 const listingController = require("../controllers/listings.js")
 const multer  = require('multer')
 const{storage} = require("../cloudinaryConfig.js");
const upload = multer({ storage});
 // router . route is method me commom path bale hote hai unko ek sath likh dete  jaise ki index route or post route same path ko follow krte  hai
 router.route("/")
 .get(wrapAsync(listingController.index)) 
 .post(
  isLoggedIn,
   
upload.single('listing[image]'),
validateListing,
 wrapAsync(listingController.createListing));



  //New Route
  router.get("/new",isLoggedIn,listingController.renderNewform );
  
 
 router.route("/:id")
 .get( listingController.showListing)
 .put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
   wrapAsync(listingController.updateListing)
  )
.delete(
    isLoggedIn,
    isOwner,
     wrapAsync(listingController.destroyeListing));

//Edit Route
router.get("/:id/edit", 
  isLoggedIn,
  isOwner,
   wrapAsync(listingController.editListing));

   module.exports = router;
//   //Index Rout
//   // router.get("/",wrapAsync(listingController.index));
  

  
//   //Show Route
//   router.get("/:id", listingController.showListing);
  
// //Create Route
// // router.post("/",isLoggedIn, validateListing,
// //     wrapAsync(listingController.createListing));
 
//  
 
//  //Update Route
//  router.put("/:id",
//    isLoggedIn,
//    isOwner,
//   validateListing,
//     wrapAsync(listingController.updateListing));
 
//  //Delete Route
//  router.delete("/:id",
//   isLoggedIn,
//   isOwner,
//    wrapAsync(listingController.destroyeListing)
// );
 

 
 
 