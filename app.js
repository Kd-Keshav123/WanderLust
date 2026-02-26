if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session= require("express-session");
const { MongoStore } = require("connect-mongo");
const flash=require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter=require("./Routes/listing.js");
const reviewRouter = require("./Routes/review.js");
const userRouter = require("./Routes/user.js");

app.listen(8080, () => {
    console.log("Server is listening on port 8080.....")
})

//connecting mongodb
main()
    .then(() => console.log("Ok Keshav ... connected to MongoDb sucessfully"))
    .catch(err => console.log(err))
async function main() {
    await mongoose.connect(process.env.ATLASDB);
}

// setting and using middlewares use //
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));         // this is only for location not very usefull
app.use(express.urlencoded({ extended: true }));  //for post request parsing
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);              // using ejsMate
app.use(express.static(path.join(__dirname, "public")));

// Mongo session store
const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB,
    crypto : {
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});
store.on("error", (err) => { // Encounters any error Occured
    console.log("error in mongo session store ", err);
});

//Express Session
const sessionOptions ={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    }
};

app.use(session(sessionOptions));//because passport should not be required in same session
app.use(flash());

// passport library 
app.use(passport.initialize());
app.use(passport.session()); //so that user should not have to login in any other request 
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.success2 = req.flash("success2");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

/// linking To Listings/reviews Routes
app.get("/", (req, res) => {   // home page
    res.render("./listings/home.ejs");
})
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

// //Throwing Express Error for <<<<invalid non existing Routes>>>>  (( in express5 we cant use * for all route so we created middleware for this))
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Defining Middleware for any error that Happens in Routes/async
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("./listings/error.ejs", { err });
})



