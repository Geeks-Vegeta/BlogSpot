

const postModel = require('../models/postModel');

const likeModel = require('../models/likeModel');

exports.likePost=async(req, res)=>{
    let user_id = req.name.id;

    let {post_id} = req.body;

    let posts = await postModel.findOne({_id:post_id});

    try {
        let liked = likeModel({
            user:user_id,
            post:post_id
           
        })
        await liked.save();
        await postModel.findByIdAndUpdate({_id:post_id},{$inc:{like:1}})
        await posts.likes.push(user_id);
        await posts.save();
        res.json({"message": "liked"});
        

    } catch (error) {
        console.log(error)
    }
}


exports.unLike=async(req, res)=>{
    let user_id = req.name.id;

    let {post_id} = req.params;

    try {

        const likeuser = await likeModel.findOne({user:user_id});
        if(!likeuser) return res.status(404).json({"message": "No such like"});

        if(likeuser.user == user_id){
            await postModel.findByIdAndUpdate({_id:post_id}, {$pull:{likes:user_id},$inc:{like:-1}});
            await likeModel.deleteOne({user:user_id, post:post_id});
            res.status(200).json({"message":"Deleted Like successfully"});

        }else{
            return res.status(400).json({"message": "Cant Delete this like"});
        }
        
    } catch (error) {
        console.log(error);
    }

}