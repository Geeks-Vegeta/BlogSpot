const loginRoute = require('express').Router();

const loginController = require('../controller/login.controller');

loginRoute.post("/", loginController.loginUser)

loginRoute.get("/logout", (req, res)=>{
    res.clearCookie("Authorization",{path:"/"});
    res.status(200).send("logout")

})


module.exports=loginRoute;