const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controller/listings.js");

// Route Creation From Here /// 
// All listings Route
router.get("/", wrapAsync(listingController.index));

// add Route 
router.get("/new", isLoggedIn, listingController.new)

// show route
router.get("/:id", wrapAsync(listingController.show))

// Create and add to Db route 
router.post("/", isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.add))

//edit Route
router.get("/:id/edit", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.edit))

//update route
router.put("/:id", validateListing, isOwner,
    upload.single('listing[image]'), wrapAsync(listingController.update));

//delete listings route
router.delete("/:id/delete", isLoggedIn, wrapAsync(listingController.delete))

module.exports = router;