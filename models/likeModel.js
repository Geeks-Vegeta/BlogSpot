const mongoose = require('mongoose');



const likeSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likeDate:{
        type:Date,
        default:Date.now
    }
})

const likeModel = mongoose.model("Like", likeSchema);

module.exports=likeModel;