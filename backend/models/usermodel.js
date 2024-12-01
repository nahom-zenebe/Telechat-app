
const { Timestamp } = require('mongodb')
const mongoose=require('mongoose')



const UserSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6

    },
    
    ProfilePic:{
        type:String,
        default:''
    },

},{
   Timestamp:true
})


const User=mongoose.model("User",UserSchema)


module.exports=User