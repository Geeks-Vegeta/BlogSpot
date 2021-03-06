
const postModel = require("../models/postModel");

// object
var ObjectId = require('mongoose').Types.ObjectId; 



// create post
exports.createPost = async(req, res) => {

    let {title, content, meta_content, tags, image, slug} = req.body;

    const _id = req.name.id;

    // title validation
    const isTitlePresent = await postModel.findOne({title:title});
    if(isTitlePresent) return res.json({"message":"Title Already Present"});


    const new_post = postModel({
        title:title,
        image:image,
        content:content,
        slug:slug,
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

    let {id} = req.params;
    let user_id = req.name.id;

    const isValidPost =await postModel.findOne({_id:id});

    if(!isValidPost) return res.json({"message": "This post does not exists"});


    try {
        if(user_id == isValidPost.user){
           await postModel.deleteOne({_id:id});
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

    let {id} = req.params;
    let user_id = req.name.id;

    const isValidPost = await postModel.findOne({_id:id});

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


// get user post by id
exports.getUserPostsById=async(req, res)=>{

    let {id} = req.params;

    try {

        const userdata = await postModel.find({user:id}).sort({postDateUpdate:-1});;
        res.status(200).send(userdata);
        
    } catch (error) {
        console.log(error)
    }
}


// most liked posts
exports.getMostLikedPosts=async(req, res)=>{

    try {

        const allposts = await postModel.find().limit(4).sort({like:-1});
        res.send(allposts);
        
    } catch (error) {
        console.log(error)
    }
}


exports.getMostCommentedPosts=async(req, res)=>{

    try {
        const allposts = await postModel.find().limit(4).sort({comments:-1});
        res.send(allposts);
        
    } catch (error) {
        console.log(error);
        
    }
}


exports.getSingleRandomPosts=async(req, res)=>{

    try {
        const allposts = await postModel.find().populate('user').limit(4);
        res.send(allposts);
        
    } catch (error) {
        console.log(error)
        
    }
}


exports.getRandomPosts=async(req, res)=>{

    try {
       
        let randnumber = Math.floor(Math.random() * 10);
        const allposts = await postModel.find().limit(4).skip(randnumber);

        res.send(allposts);

        
    } catch (error) {
        console.log(error);
        
    }
}


// getAllRecentPosts
exports.getAllRecentPosts=async(req, res)=>{

    try {
        const allposts = await postModel.find().populate('user').sort({postDateUpdate:-1});
        res.status(200).send(allposts);
        
    } catch (error) {
        console.log(error)
        
    }
}



// getall usersPost

exports.getAllCurrentUserPosts=async(req, res)=>{

    try {
        let user_id = req.name.id;
        const allposts = await postModel.find({user:user_id}).sort({postDateUpdate:-1});
        res.status(200).send(allposts);
        
    } catch (error) {
        console.log(error)
        
    }

}

// get post by title
exports.getPostByTitle=async(req, res)=>{

    let {_id} = req.query

    try {
        const allpost = await postModel.findOne({_id:_id}).populate('user').populate({path:'comments',options:{
            sort:{
                "commentDateUpdate":-1
            },populate:{
            path:"user"
        }}});
        res.status(200).send(allpost);
        
    } catch (error) {
        console.log(error)
        
    }
}