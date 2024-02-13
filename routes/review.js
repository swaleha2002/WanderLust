const express=require("express");
const router=express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const Listing = require("../models/listing"); 
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController = require("../controller/reviews.js")

// POST Reviews Route
router.post("/", validateReview,isLoggedIn, wrapAsync(reviewController.createReview));
  
  //POST Reviews delete Route
  router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview));
  module.exports=router;