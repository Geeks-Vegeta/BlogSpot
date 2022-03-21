const emailRoute = require('express').Router();

const mailControler = require('../controller/mail.controller');


emailRoute.post("/basic", mailControler.sendEmail);

module.exports=emailRoute;