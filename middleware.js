const Listing = require("./models/listing.js");
const Reviews = require("./models/reviews.js");
const { listingSchema, reviewSchema } = require("./schema.js");  // excessing values of new Joi object created
const ExpressError = require("./utils/expressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in first");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.Url = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You dont have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    }
    else next();
}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    }
    else next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Reviews.findById(reviewId);
    if (!res.locals.currUser || ! review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You dont have permission to delete");
        return res.redirect(`/listings/${id}`);
    }
    next();
}