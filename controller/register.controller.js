
const userModel = require('../models/userModel');

const bcrypt = require('bcryptjs');


exports.registerUser = async(req, res)=>{
    try {
        let {username, email} = req.body;

        const usernameAlreadyPresent =await userModel.findOne({username:username});
        if(usernameAlreadyPresent) return res.json({"message": "username already exists"});

        const emailAlreadyPresent = await userModel.findOne({email:email});
        if(emailAlreadyPresent) return res.json({"message": "given email already exists"});

        // creating salt
        let salt = await bcrypt.genSaltSync(13);
        let hashpassword = await bcrypt.hash(req.body.password, salt)

        let newuser = await userModel({
            username:username,
            email:email,
            password:hashpassword
        })

        await newuser.save();
        res.json({"message": "user created successfully"});
        
    } catch (error) {
        console.log(error);
        
    }


}