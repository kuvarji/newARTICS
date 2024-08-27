const express = require("express")
const router = express.Router()
const userModel = require("../models/user-model")
const isLoggedin = require("../middleware/isLoggedin")
const axios = require("axios")
const { render } = require("ejs")
const res = require("express/lib/response")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const {generateToken} = require("../utils/generateToken.js")



router.get("/",function(req,res){
    let error = req.flash("error")
    res.render("index",{ error })
})




let   artic ;
  axios.get('https://api.currentsapi.services/v1/latest-news?',{
    params: {
      apiKey:'qPSW5_-Hik0vm2g0hbtTE_YVm-XHWwZFfQavYwv6KBalEHIl', // Replace with your NewsAPI key
      },


  })
  .then(response => {
    
 artic = (response.data.news.slice(5,9));
 

 
 
 })
  .catch(error => {
    console.error(error);
  });


  router.get("/home",isLoggedin, async function(req,res){
           let clients = await userModel.client.find()
          res.render("home",{artic,clients})
    })



router.post("/create", isLoggedin, async function(req,res){
    let { url , bio , detail} = req.body
     let u=  await userModel.client.create({
                        url,
                        bio,
                        detail
                    })
                  
                  
                    res.redirect("/home")
                    
        });

       
      

      
router.get("/service",isLoggedin, function(req,res){
    res.render("service")
})



let nex
let nex1
let nex2
let nex3

let news ;
axios.get('https://api.currentsapi.services/v1/latest-news?',{
  params:{
    apiKey:'qPSW5_-Hik0vm2g0hbtTE_YVm-XHWwZFfQavYwv6KBalEHIl',
  },


})

.then(res=>{
  
  
  news=(res.data.news.slice(0,7))
  nex=(res.data.news.slice(8,15))
  nex1=(res.data.news.slice(16,23))
  nex2=(res.data.news.slice(24,31))
  nex3=(res.data.news.slice(32,39))
 
})

.catch(error => {
  console.error(error);
});


router.get("/all", isLoggedin,function(req,res){
  res.render("all",{news:news,nex:nex,nex1:nex1,nex2:nex2,nex3:nex3})
 
})



router.get("/technology",isLoggedin,function(req,res){
  res.redirect("/all")
})

router.get("/sports",isLoggedin,function(req,res){
  res.redirect("/all")
})

router.get("/design",isLoggedin,function(req,res){
  res.redirect("/all")
})

router.get("/programming",isLoggedin,function(req,res){
  res.redirect("/all")
})

router.get("/engneering",isLoggedin,function(req,res){
  res.redirect("/all")
})


router.get("/read", isLoggedin, async function(req,res){
    
  let clients = await userModel.client.find()
  
  res.render("read",{clients})
})




router.get("/edit",isLoggedin, async function(req,res){
    let clients = await userModel.client.find()
    res.render("update",{clients})
  })

  router.get("/delete/:id",isLoggedin, async function(req,res){
    let delet = await userModel.client.findOneAndDelete({_id: req.params.id})
    res.redirect("/home")
})

router.post("/update/:id",isLoggedin, async function(req,res){
  let {url,bio,detail} = req.body
  let update = await userModel.client.findOneAndUpdate({_id: req.params.id},{url,bio,detail},{new:true})

res.redirect("/home")

})


router.get("/logout", async function(req, res){
  let user = await userModel.user.find()
  let token = generateToken(user)
                  res.cookie("token","")
                  res.redirect("/")
})
 

module.exports = router