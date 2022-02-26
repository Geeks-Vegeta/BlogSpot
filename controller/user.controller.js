const userModel = require('../models/userModel');


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


// get current user
exports.currentUser=async(req, res)=>{

    let user_id = req.name.id;

    try {
        
        const user = await userModel.findOne({_id:user_id});
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
        
    }
}