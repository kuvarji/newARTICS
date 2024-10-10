const express = require("express")
const router = express.Router()
const userModel = require("../models/user-model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const {generateToken} = require("../utils/generateToken.js")
const {registeruser} = require("../controllers/authController")
const {loginuser} = require("../controllers/authController")




router.post("/register",registeruser )

router.post("/login",loginuser)



module.exports = router;