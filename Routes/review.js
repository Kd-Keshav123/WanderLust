const express=require("express");
const router = express.Router({mergeParams:true});// because id remains there the "listingid" mergeParams:true 
const wrapAsync = require("../utils/wrapAsync.js");
const{validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const listingController = require("../controller/reviews.js");

//Create Review Route
router.post("/", validateReview,isLoggedIn, wrapAsync(listingController.create))

// Review Delete Route
router.delete("/:reviewId", isReviewAuthor , wrapAsync(listingController.delete))

module.exports= router;