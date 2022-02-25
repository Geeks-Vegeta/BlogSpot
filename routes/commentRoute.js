const commentRoute = require('express').Router();

const verifyUser = require("../verifyUser");


const commentController = require('../controller/comment.controller');

commentRoute.post("/addcomment/:postid", verifyUser, commentController.postComment);
commentRoute.put("/updatecomment/:comment_id", verifyUser, commentController.updateComment);
commentRoute.delete("/deletecomment/:comment_id/:post_id", verifyUser, commentController.deleteComment);

module.exports=commentRoute;