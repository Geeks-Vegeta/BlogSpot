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
        default:"https://res.cloudinary.com/getcomix/image/upload/v1645970189/public%20blog/b8mqpjx2r3uzzxlwg78g.jpg"
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
        type:String,
        default:"https://res.cloudinary.com/getcomix/image/upload/v1645970269/public%20blog/uatvmpk2b9347yhvxv9k.jpg"
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