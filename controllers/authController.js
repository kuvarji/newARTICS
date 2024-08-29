const userModel = require("../models/user-model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const {generateToken} = require("../utils/generateToken.js")


module.exports.registeruser = 

async function(req ,res){
    try{

        let {fullname,email,password} = req.body

let user =  await userModel.user.findOne({email:email})
if (user) return res.status(401).send("you have account please login")
    


        bcrypt.genSalt(10,function(err, salt){
            bcrypt.hash(password,salt, async function(err , hash){
                if (err) {
                   return res.send(err.message) 
                }
                else{

                    let user = await userModel.user.create({
                        fullname,
                        email,
                        password:hash
                    })
                    
                    
               let token = generateToken(user)
                  res.cookie("token",token)
                    res.alert("you can login")
                 res.redirect("/")
                }
               
            })

        })
       

    } catch(err){
res.send(err.message);

    }
   


}

module.exports.loginuser= async function (req,res) {
    let {email, pass} = req.body
   
   
  let user =   await userModel.user.findOne({ email: email})
    if(!user) return res.send("email or password incorrect")


        bcrypt.compare(pass,user.password,function(err ,result){
        
        if(result) {
            let token = generateToken(user)
            res.cookie("token",token)
           res.redirect("/home")

        }
        else{
            return res.send("email or password incorrect") 
        }
    })
}
