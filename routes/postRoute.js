const postRoute = require('express').Router();

const postController = require("../controller/post.controller");

const verifyUser = require("../verifyUser");

postRoute.post("/create", verifyUser, postController.createPost);
postRoute.delete("/delete/:title", verifyUser, postController.deletePost);
postRoute.put("/update/:title", verifyUser, postController.updatePost);
postRoute.get("/allpost",verifyUser, postController.getAllPosts)

module.exports=postRoute;



