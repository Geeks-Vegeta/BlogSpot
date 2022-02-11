const registerRoute = require('express').Router();

const registerController = require('../controller/register.controller');


registerRoute.post("/", registerController.registerUser)

module.exports=registerRoute;