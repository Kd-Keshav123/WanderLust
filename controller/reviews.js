const Review = require("../models/reviews.js");
const listing = require("../models/listing.js");

module.exports.create = (async (req, res) => {
    let listings = await listing.findById(req.params.id);//finds all object inside this id
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listings.reviews.push(newReview);

    await newReview.save();
    await listings.save();
    console.log("Review added");
    req.flash("success","New Review Created");
    res.redirect(`/listings/${listings._id}`); // making api call to show route
})

module.exports.delete = (async (req, res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);

    listing.findByIdAndUpdate(id,{ $pull: { reviews: reviewId } })
    req.flash("success2","Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
})