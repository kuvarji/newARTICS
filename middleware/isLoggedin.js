    const jwt = require("jsonwebtoken")
    const userModel = require("../models/user-model")

    module.exports = async function (req, res,next) {
    
        if (!req.cookies.token) {
            req.flash("error","you need to login first")
            return res.redirect("/")
            
        }


        try{
            let decodded = jwt.verify(req.cookies.token,process.env.JWT_KEY)
            let user = await userModel.user.findOne({email:decodded.email}).select("-password");
            req.user = user
            next()
        }catch(err){
            req.flash("error","somthing went wrong")
            res.redirect("/")
        }  
      }