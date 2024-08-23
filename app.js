const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user-model');
const cookieparser = require("cookie-parser")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { default: mongoose } = require('mongoose');
const userRouter = require("./routes/userRouter")
 const index = require("./routes/index")
 
 require("dotenv").config()  

mongoose.connect("mongodb+srv://portfoliocom373:OUeKGOygYzcC80BY@cluster1.fjfabfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
.then(()=>console.log('mongoose connected'));

const expressSession = require("express-session")
const flash = require("connect-flash")

app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(cookieparser())
 app.use(
   expressSession({
      resave:false,
      saveUninitialized:false,
      secret:process.env.JWT_KEY
   })
 )

 app.use(flash())

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname , "public")))
app.set("view engine","ejs")

app.use("/", index)
app.use("/user", userRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



