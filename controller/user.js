const User = require("../models/user.js");

module.exports.signup = (req, res) => {
    res.render("./users/signup.ejs");
}

module.exports.signupPost = (async (req, res) => {
    const { username } = req.body;
    const current = await User.findOne({ username: username });
    if (!current) {
        try {
            let { username, email, password } = req.body;
            const newUser = new User({ email, username })
            await User.register(newUser, password);
            req.flash("success", "Signed in!");
            return res.redirect("/listings");
        }
        catch (err) {
            req.flash("error", err.message);
            res.redirect("/login");
        }
    }else{
        req.flash("error","You already have an account, Please Login");
        return res.redirect("/login");
    }
})

module.exports.login = (req, res) => {
    res.render("./users/login.ejs");
}

module.exports.loginPost =
    (req, res) => {
        // This code only runs if authentication is successful
        req.flash("success", "Welcome back to KAVD hotels");
        let url = res.locals.Url || "/listings";    /// ternary operator like
        res.redirect(url);
    }

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logged out!");
        res.redirect("/listings");
    })
}