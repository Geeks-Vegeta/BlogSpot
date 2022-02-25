
const commentModel = require('../models/commentModel');

const postModel = require('../models/postModel');


// add comment
exports.postComment=async(req, res)=>{

    let {postid} = req.params;
    let userid = req.name.id;
    let {comment} = req.body;

    try {

        let posts = await postModel.findOne({_id:postid});

        let commenting = commentModel({
            comment:comment,
            post:postid,
            user:userid
        })
        await commenting.save();
        await posts.comments.push(commenting);
        await posts.save();
        res.status(200).send(commenting);
        
    } catch (error) {
        console.log(error);
    }

}

// updateComment
exports.updateComment=async(req, res)=>{

    let userid = req.name.id;
    let {comment_id} = req.params;

    try {

        let isusercomment = await commentModel.findOne({_id:comment_id});
        if(!isusercomment) return res.status(404).json({"message":"This comment does not exists"});

        if(isusercomment.user == userid){
            let comment = await commentModel.findByIdAndUpdate({_id:comment_id},req.body,{new:true});
            res.status(200).send(comment);

        }else{
            return res.status(401).json({"message": "You are not authorised to comment"});
        }        
        
    } catch (error) {
        console.log(error);
    }

}


// delete comment
exports.deleteComment=async(req, res)=>{

    let userid = req.name.id;
    let {comment_id, post_id} = req.params;

    try {

        let isusercomment = await commentModel.findOne({_id:comment_id});
        if(!isusercomment) return res.status(404).json({"message":"This comment does not exists"});

        if(isusercomment.user == userid){
            await commentModel.findByIdAndDelete({_id:comment_id});
            await postModel.findByIdAndUpdate({_id:post_id}, {$pull:{comments:comment_id}});
            res.json({"message":"Deleted successfully"});

        }else{
            return res.status(401).json({"message": "You are not authorised to comment"});
        }  

        
    } catch (error) {
        console.log(error)
        
    }

}