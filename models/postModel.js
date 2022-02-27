const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,

    },
    slug:{
        type:String

    },
    meta_content:{
        type:String,
        required:true
    },
    like:{
        type:Number

    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
    ,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    tags:{
        type:Array
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    postDate:{
        type:Date,
        default:Date.now

    },
    postDateUpdate:{
        type:Date,
        default:Date.now

    }

});


const postModel = mongoose.model('Post', postSchema);

module.exports=postModel;