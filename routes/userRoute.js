const userRoute = require('express').Router();

const userController = require('../controller/user.controller');


const verifyUser = require('../verifyUser');


// user follow - unfollow



// user update profile
userRoute.put("/updateprofile", verifyUser, userController.userUpdateProfile);
userRoute.get("/alluser", userController.allUsers);
userRoute.get("/currentuser",verifyUser, userController.currentUser);
module.exports=userRoute;


