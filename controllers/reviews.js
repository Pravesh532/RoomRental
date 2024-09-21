const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.postReview = async(req,res) => {

    let listing= await Listing.findById (req.params.id);
      let  newReview = new Review (req.body.review);
      newReview.author = req.user._id;
       listing.reviews.push(newReview);
        console.log(newReview);
      
       await newReview.save();
       await listing.save();
       req.flash('success', 'New Review Added!');
     res.redirect(`/listings/${listing._id}`);
};
 module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);  // Deletes the review
    req.flash('success', 'Review Deleted!');
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  // Removes review reference from the listing
    res.redirect(`/listings/${id}`);  // Corrected res.redirect
   };