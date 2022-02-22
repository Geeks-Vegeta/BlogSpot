
const postModel = require("../models/postModel");

// object
var ObjectId = require('mongoose').Types.ObjectId; 



// create post
exports.createPost = async(req, res) => {

    let {title, content, meta_content, tags, image} = req.body;

    const _id = req.name.id;

    // title validation
    const isTitlePresent = await postModel.findOne({title:title});
    if(isTitlePresent) return res.json({"message":"Title Already Present"});

    const new_post = postModel({
        title:title,
        image:image,
        content:content,
        meta_content:meta_content,
        tags:tags,
        user:_id
        
    })

    try {
        await new_post.save();
        res.send(new_post);
        
    } catch (error) {
        console.log(error);
        
    }
}


// delete post
exports.deletePost = async(req, res)=>{

    let {title} = req.params;
    let user_id = req.name.id;

    const isValidPost =await postModel.findOne({title:title});

    if(!isValidPost) return res.json({"message": "This post does not exists"});


    try {
        if(user_id == isValidPost.user){
           await postModel.deleteOne({title:title});
           res.json({"message":"deleted successfully"});
    
        }else{
            res.status(404).json({"message": "can't delete"});
        }
        
        
    } catch (error) {
        console.log(error);
        
    }
}


// update post
exports.updatePost = async(req, res)=>{

    let {title} = req.params;
    let user_id = req.name.id;

    const isValidPost = await postModel.findOne({title:title});

    if(!isValidPost) return res.json({"message": "This post does not exists"});

    try {

        if(user_id == isValidPost.user){
            const update_post = await postModel.findByIdAndUpdate({_id:isValidPost._id}, req.body,{new:true});
            res.send(update_post)
     
        }else{
            res.status(404).json({"message": "can't delete"});
         }

        
    } catch (error) {
        console.log(error);
        
    }
}

// getall usersPost

exports.getAllPosts=async(req, res)=>{

    try {
        let user_id = req.name.id;
        const allposts = await postModel.find({user:user_id}).sort({postDateUpdate:-1});
        res.status(200).send(allposts);
        
    } catch (error) {
        console.log(error)
        
    }

}