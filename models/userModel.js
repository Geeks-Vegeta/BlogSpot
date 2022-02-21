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
    location:{
       type:String,
    },
    profile_pic:{
        type:String,
    },
    education:{
        type:String
    },
    bio:{
        type:String
    },
    is_active:{
        type:Boolean,
        default:false
    },
    instagram_link:{
        type:String,
    },
    twitter_link:{
        type:String,
    },
    linkedIn_link:{
        type:String,
    },
    facebook_link:{
        type:String
    },
    gender:{
        type:String,
        enum : ['Male','Female', "Trans"],
        default:"Male"
    },
    background_image:{
        type:String
    },
    mobile_number:{
        type:String
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