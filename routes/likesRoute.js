const likeRoute = require('express').Router();

const likeController = require('../controller/like.controller');

const verifyUser = require("../verifyUser");


likeRoute.post("/islike", verifyUser, likeController.likePost);
likeRoute.delete("/unlike/:post_id", verifyUser, likeController.unLike);


module.exports=likeRoute;