const mongoose = require('mongoose');



const commentSchema = mongoose.Schema({

    comment:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    commentDate:{
        type:Date,
        default:Date.now
    },
    commentDateUpdate:{
        type:Date,
        default:Date.now
    },
})

const commentModel = mongoose.model("Comment", commentSchema);

module.exports=commentModel;