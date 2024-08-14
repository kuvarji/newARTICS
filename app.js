// const express = require('express')
// const app = express()
// const path = require('path')
// const cookieparser = require("cookie-parser")
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// server starting  middleware
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname , "public")))
// app.set("view engine","ejs")


// routing

// app.get("/",(res,req)=>{
//     res.send("hello")
// })

// app.listen(3000,()=>{
//     console.log("server is running.....");
    
// })
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/usermodel');
const cookieparser = require("cookie-parser")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { default: mongoose } = require('mongoose');

mongoose.connect("mongodb+srv://kuvarjigupta2004:MdHFTneDPLmjfDRf@cluster0.m1iqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log('mongoose connected'));




//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname , "public")))
app.set("view engine","ejs")



//routes backend side rendering
app.post("/create",async function(req,res){
    let clientdata = await userModel.client.create({
                        url:req.body.url,
                        bio:req.body.bio,
                        detail:req.body.detail,
                    })
                  
                    res.redirect("/")
        });

app.get("/", async function(req,res){
    let client = await userModel.client.find()
    let user = await userModel.user.find()
  res.render("home",{user , client, artic:artic})     
})

app.get("/delete/:id", async function(req,res){
    let delet = await userModel.client.findOneAndDelete({_id: req.params.id})
    res.redirect("/")
})

app.get("/read", async function(req,res){
    
    let client = await userModel.client.find()
    let user = await userModel.user.find()
    res.render("read",{user,client})
})
 

app.get("/signup", function(req,res){
    res.render("signup")
})


app.post("/signup",  function(req,res){
    let  {username,password,email} = req.body

bcrypt.genSalt(10, async function(err, salt) {

       bcrypt.hash(req.body.password, salt, async function(err, hash) {
            let user = await userModel.user.create({
               username,
                password:hash,
                email,
               
            })

           let token = jwt.sign({email},"secret")
           res.cookie("token",token)
            
           res.redirect("/login")
    });
  
});


    
})

app.get("/login",function(req,res){
    res.render("login")
})

app.post("/login",async function(req,res){

  let user =  await userModel.user.findOne({email:req.body.email})
  if (!user) {
    return res.send("something get wrong")}
else{
    
    bcrypt.compare(req.body.password,user.password , function(err, result){
        if(result){
      
          let token = jwt.sign({email:user.email},"secret")
          res.cookie("token",token)
         
          res.redirect("/")
          
          
        }
          
      
      })
}


})



app.get("/logout/:id", async function(req,res){
    
    let delet = await userModel.user.findOneAndDelete({_id: req.params.id})
    res.cookie("token","")
    res.redirect("/")
   
    
})



let   artic ;
  axios.get('https://api.currentsapi.services/v1/latest-news?',{
    params: {
      apiKey:'qPSW5_-Hik0vm2g0hbtTE_YVm-XHWwZFfQavYwv6KBalEHIl', // Replace with your NewsAPI key
      },


  })
  .then(response => {
    
 artic = (response.data.news.slice(23,27));
 

 
 
 })
  .catch(error => {
    console.error(error);
  });
  
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


app.get("/all",function(req,res){
  res.render("all",{news:news,nex:nex,nex1:nex1,nex2:nex2,nex3:nex3})
 
})



app.get("/technology",function(req,res){
  res.redirect("/all")
})

app.get("/sports",function(req,res){
  res.redirect("/all")
})

app.get("/design",function(req,res){
  res.redirect("/all")
})

app.get("/programming",function(req,res){
  res.redirect("/all")
})

app.get("/engneering",function(req,res){
  res.redirect("/all")
})


app.get("/service",function(req,res){
  res.render("service")
})


app.get("/edit", async function(req,res){
  let user =  await userModel.user.find()
  res.render("update",{user})
})

app.post("/update/:id", async function(req,res){
  let {url,bio,detail} = req.body
  let update = await userModel.client.findOneAndUpdate({_id: req.params.id},{url,bio,detail},{new:true})

res.redirect("/read")

})


const PORT = process.env.PORT || 3000
// listen server
app.listen(PORT,function () {
    console.log("server is run...");
    
})






