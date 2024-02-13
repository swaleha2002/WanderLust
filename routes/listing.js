const express= require("express");
const router=express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer =require("multer");
const {storage} =require("../cloudconfig.js");
const upload = multer({storage});





router.route("/")
//Index Route
.get(wrapAsync(listingController.index))
// Create Route
.post(isLoggedIn,isOwner,validateListing,
    upload.single("listing[images]"),
wrapAsync(listingController.createlisting));


router.route("/:id")
//Show Route
// Assuming you have a route for displaying a single listing
.get( wrapAsync(listingController.showlisting))
//Update Route
.put(isLoggedIn,
 wrapAsync())
//Delete Route
.delete(isLoggedIn, isOwner,
   wrapAsync(listingController.destroylisting));

//New Route
router.get("/new",
isLoggedIn,
listingController.renderNewform);
 router(":/id")
 .get(wrapAsync(listingController.showlisting))
 .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updatelisting)
 )



//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,  wrapAsync(listingController.renderEditform));

module.exports=router;