const postRoute = require('express').Router();

const postController = require("../controller/post.controller");

const verifyUser = require("../verifyUser");

postRoute.post("/create", verifyUser, postController.createPost);
postRoute.delete("/delete/:id", verifyUser, postController.deletePost);
postRoute.put("/update/:id", verifyUser, postController.updatePost);
postRoute.get("/allcurrentuserpost", verifyUser, postController.getAllCurrentUserPosts);
postRoute.get("/getpostbytitle", verifyUser, postController.getPostByTitle);
postRoute.get("/getUserPostsById/:id", verifyUser, postController.getUserPostsById);
postRoute.get("/getmostlikepost", postController.getMostLikedPosts);
postRoute.get("/getmostcommentpost", postController.getMostCommentedPosts);
postRoute.get("/getrandompost", postController.getRandomPosts);
postRoute.get("/getsinglerandompost", postController.getSingleRandomPosts)

// getUserPostsById
postRoute.get("/getAllRecentPosts", postController.getAllRecentPosts);

module.exports=postRoute;



