

const mongoose = require("mongoose")

const userSchema =  new mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true
    },
    email:String,
    password:String,
    
    cart:{
        type:Array,
        default:[]

    },
  
    order:{
        type:Array,
        default:[]
    },
    picture:String,
    gstin:String
})






const clientschematwo = new mongoose.Schema({
    url:String,
    bio:String,
    detail:String
    })



    const client = mongoose.model('client',clientschematwo);

  


const user = mongoose.model('user', userSchema);


module.exports={
    user : user,
    client:client
   
}