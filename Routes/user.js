const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveUrl } = require("../middleware.js");
const userController = require('../controller/user.js');

//signup route
router.get( "/signup" , (userController.signup) )

//post signup route
router.post("/signup", wrapAsync(userController.signupPost))

//login route
router.get("/login", (userController.login))

//Post login route
router.post("/login", saveUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), (userController.loginPost)
);

// logout route
router.get("/logout", (userController.logout))

module.exports = router;