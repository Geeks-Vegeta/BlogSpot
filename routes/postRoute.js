const postRoute = require('express').Router();

const postController = require("../controller/post.controller");

const verifyUser = require("../verifyUser");

postRoute.post("/create", verifyUser, postController.createPost);
postRoute.delete("/delete/:id", verifyUser, postController.deletePost);
postRoute.put("/update/:id", verifyUser, postController.updatePost);
postRoute.get("/allpost",verifyUser, postController.getAllPosts);
postRoute.get("/getpostbytitle", verifyUser, postController.getPostByTitle);

module.exports=postRoute;



