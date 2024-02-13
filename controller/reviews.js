
const listing = require("../models/listing");
const review = require("../models/review");

module.exports.createReview=async (req, res) => {
    console.log(req.params.id);
    const {id}=req.params;
     let listing = await Listing.findById(req.params.id);
     const { name, rating, comment } = req.body;
    // let newReview = new Review(req.body.review);
    
      // Push the new review to the listing
      const newReview = new Review({ name, rating, comment });
      listing.reviews.push(newReview);
      // Save the changes to the listing
      await newReview.save();
      await listing.save();
     req.flash("success","New Review Created!")
      res.redirect(`/listings/${listing._id}`);
    };
module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`);
    
    };