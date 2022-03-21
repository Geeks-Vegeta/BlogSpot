
const userModel = require('../models/userModel');
const mongoose = require('mongoose');

exports.followeruser = async(req, res)=>{

    let {id} = req.params;
    let user_id = req.name.id;

    if(id == user_id){
        return res.status(400).json({"message":"unable to follow both ids are same"});
    }

    try {

        let userfollow = await userModel.findOne({_id:user_id});
        let userwhofollow = await userModel.findOne({_id:id});
        if(!userfollow) return res.status(404).json({"message": "no user found"});
        if(!userwhofollow) return res.status(404).json({"message": "no user found"});

        // mongoose.Types.ObjectId
        await userfollow.following.push(mongoose.Types.ObjectId(id));
        await userwhofollow.followers.push(mongoose.Types.ObjectId(user_id));
        await userfollow.save();
        await userwhofollow.save();
        res.status(200).send("followed successfully");
        
    } catch (error) {
        console.log(error)
    }
}


exports.unfollowuser = async(req, res)=>{

    let {id} = req.params;
    let user_id = req.name.id;

    
    try {

        let user = await userModel.findOne({_id:user_id});
        if(!user) return res.status(404).json({"message": "no user found"});

        await userModel.findByIdAndUpdate({_id:user_id}, {$pull:{following:mongoose.Types.ObjectId(id)}});
        await userModel.findByIdAndUpdate({_id:id}, {$pull:{followers:mongoose.Types.ObjectId(user_id)}});
        res.status(200).json({"message": "Follower removed successfully"});
       
    } catch (error) {
        console.log(error)
        
    }
}