// const express = require("express");
// const router = express.Router({mergeParams: true});
// const User = require("../models/user.js");

// router.get("/signup",(req,res) =>{
//     res.render("users/signup.ejs");
// });

// router.post("/signup", async(req, res) => {
//     let{username, email, password} = req.body;
//     const newUser = new User({email,username});
//     const registerUser = await User.register(newUser, password);
//     console.log(registerUser);
//     req.flash("success", "Welcome to Wanderlust!");
//     res.redirect("/listings");
// });

// module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../midleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login
);

router.get("/logout",userController.logout);


module.exports = router;
