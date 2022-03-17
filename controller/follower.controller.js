
const userModel = require('../models/userModel');


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


        await userfollow.followers.push(id);
        await userwhofollow.follwing.push(user_id);
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

        let  userfollowlist = [] ;

        let user = await userModel.findOne({_id:user_id});
        if(!user) return res.status(404).json({"message": "no user found"});

        userfollowlist.append(user.followers);

        let isuserfollow = userfollowlist.includes(id);

        if(isuserfollow){
            await userModel.findByIdAndUpdate({_id:user_id}, {$pull:{}})

        }else return res.status(400).json({"message": "unable to unfollow"});
        
    } catch (error) {
        console.log(error)
        
    }
}