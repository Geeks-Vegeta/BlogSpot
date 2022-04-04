const sendEmailFunction = require('../functions/sendmail');

const otpGenerator = require('otp-generator')


const userModel = require('../models/userModel');

exports.sendEmail=async(req, res)=>{

    const {email, subject} = req.body;

    try {

        const user = await userModel.findOne({email:email});
        if(!user) return res.status(404).json({"message":"User with given email does not exists"});

        let token = otpGenerator.generate(6,  {digits:true,specialChars :false,  upperCaseAlphabets: false, specialChars: false });
        req.session.token = token;
        req.session.user = email;

        let html = `<h5>OTP for account verification is  otp</h5> <h1>${token}</h1>`
        
        await sendEmailFunction.sendBasicEmail(email, subject, html);
        res.status(200).json({"message":"email send successfully"});

    } catch (error) {
        console.log(error)
    }
}