const followerRoute = require('express').Router();

const verifyUser = require('../verifyUser');

const followController = require('../controller/follower.controller');

followerRoute.put('/:id', verifyUser, followController.followeruser)

module.exports=followerRoute;