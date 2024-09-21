const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,  // Changed to Number to better represent a rating
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author:{
         type:Schema.Types.ObjectId,
         ref:"User",
    },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
