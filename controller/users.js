const User =require("../models/user")

module.exports.renderSignupform=(req,res)=>{
    res.render("users/signup.ejs");
    };

module.exports.signUp =async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
       const register=await User.register(newUser,password);
       console.log("registeredUser");
       req.login(registeredUser,(err)=>{
      if(err){
       return next();
      }
       req.flash("success","welcome to WanderLust");
       res.redirect("/listings");
  }); 
 }catch(e){
      req.flash("error",e.message);
      res.redirect("/signup");
    }
   
};
module.exports.renderLoginform =(req,res)=>{
    res.render("users/login.ejs");
   };
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to WanderLust! You are logged in");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
};
module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
  next(err);
        }
        req.flash("success", " You are loggedOut in");
        res.redirect("/listings");
    })
   };