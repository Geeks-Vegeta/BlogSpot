
const postModel = require("../models/postModel");


// create post
exports.createPost = async(req, res) => {

    let {title, content, meta_content, tags} = req.body;

    const _id = req.name.id;

    // title validation
    const isTitlePresent = await postModel.findOne({title:title});
    if(isTitlePresent) return res.json({"message":"Title Already Present"});

    const new_post = postModel({
        title:title,
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