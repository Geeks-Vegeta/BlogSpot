const userModel = require('../models/userModel');

const bcrypt = require('bcryptjs');


// userupdate profile
exports.userUpdateProfile = async (req, res)=>{

    try {
        let _id = req.name.id;

        const updateProfile = await userModel.findByIdAndUpdate({_id},req.body,{new:true});
        res.status(200).send(updateProfile);

    } catch (error) {
        console.log(error)
    }
}


// get user id
exports.getUserId=async(req, res)=>{
    try {

        const user_id = req.name.id;
        res.status(200).send(user_id);
        
    } catch (error) {
        console.log(error);
        
    }
}


// get all users
exports.allUsers = async (req, res) => {

    try {
        const allusers = await userModel.find();
        res.send(allusers)
        
    } catch (error) {
        console.log(error);
    }
}



// user follow /unfollow
exports.userFollowUnfollow = async (req, res) =>{

   const following = req.name.id;

   const {follow, action} = req.body;

   try {
       switch(action){
            case 'follow':
               await userModel.findByIdAndUpdate(follow, {$push:{following:following}}),
               await userModel.findByIdAndUpdate(following, {$push:{follow:follow}});
               break;
            case "unfollow":
               await userModel.findByIdAndUpdate(follow, {$pull:{following:following}}),
               await userModel.findByIdAndUpdate(following, {$pull:{follow:follow}});
               break;
            default:
                break;

       }     
       
   } catch (error) {
       console.log(error);
   }

}


// delete user
exports.deleteUser=async(req, res)=>{
    let {user_id} = req.params;
    try {

        const user = await userModel.findByIdAndDelete({_id:user_id});
        if(!user) return res.status(404).json({"message": "This user does not exists"});
        
        res.status(200).json({"message": "Deleted successfully"});

        
    } catch (error) {
        console.log(error)
        
    }
} 



// update userpassword
exports.changeUserPassword=async(req, res)=>{

    let user = req.session.user;
    let {password} = req.body;

    try {

        const loginuser = await userModel.findOne({email:user});
        
        if(!loginuser) return res.status(401).json({"message": "Invalid user"})
        
        let salt = await bcrypt.genSaltSync(13);
        let hashpassword = await bcrypt.hash(password ,salt)

        await userModel.findByIdAndUpdate({_id:loginuser._id}, {$set:{password:hashpassword}});
        res.status(200).json({"message": "Password Changed Successfully"});
        
    } catch (error) {
        console.log(error)
        
    }
}


// get current user
exports.currentUser=async(req, res)=>{

    let user_id = req.name.id;

    try {
        
        const user = await userModel.findOne({_id:user_id}, '-password').populate('followers', '_id profile_pic username following followers', 'User').populate('following', '_id profile_pic username', 'User');
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
        
    }
}

// get user by id
exports.getUserById = async(req, res)=>{
    let {user_id} = req.params;

    try {
        const userdata = await userModel.findById({_id:user_id});
        res.status(200).send(userdata);
        
    } catch (error) {
        console.log(error);
        
    }
}