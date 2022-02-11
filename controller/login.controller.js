const jwt = require('jsonwebtoken');


const bcrypt = require('bcryptjs');

const userModel = require("../models/userModel");

exports.loginUser=async(req, res)=>{
    
    let {email, password} = req.body;

    // checking email
    let user = await userModel.findOne({email});
    if(!user) return res.status(401).json({"message": "Invalid Email"});

    let isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) return res.status(401).json({"message": "Invalid Password"})


    //sending token to front end 
    const token=jwt.sign({"id":user._id},process.env.TOKEN_SECRET);
    res.status(200).cookie('Authorization',token).header('Authorization',token).send(token);




}