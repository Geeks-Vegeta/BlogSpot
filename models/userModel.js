const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    profile_pic:{
        type:String,
    },
    education:{
        type:String
    },
    profile_info:{
        type:String
    },
    is_active:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        enum : ['Male','Female', "Trans"],
        default:"Male"
    },
    mobile_number:{
        type:Number
    },
    followers:{
        type:Array
    },
    following:{
        type:Array
    }
})


const userModel = mongoose.model("User",userSchema);

module.exports=userModel;