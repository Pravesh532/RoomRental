const { types, required } = require("joi");
const mongoose = require("mongoose");
const Review =require("./review.js")
 
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
      url:String,
      filename:String
  },
    

  price: Number,
  location: String,
  country: String,
  reviews: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref:"Review"
    },
  ],
 owner : {
   type:mongoose.Schema.Types.ObjectId,
   ref:"User"
 },
geometry:{
  type:{
    type:String, // Dont  do "{ type : String }}"
    enum:['Point'], // Location ,type . Must 'point 
    required:true
  },
  coordinates:{
    type:[Number],
    required: true,
  },
},

});

listingSchema.post("findOneAndDelete",async(listing) => {
   if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});

   }
});



const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
 
