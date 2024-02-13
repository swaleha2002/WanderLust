const express = require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const User=require("../models/user.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");

const userController =require("../controller/users.js")

router.route("/signup")
.get(userController.renderSignupform)
.post( wrapAsync(userController.signUp));

router.route("/login")
.get(userController.renderLoginform)
.post(savedRedirectUrl, passport.authenticate({
    failureRedirect: "/login",
    failureFlash: true,
}), 
userController.login
);


router.get("/logOut",userController.logout);
   
   

module.exports=router;