const express = require('express');

const app = express();

var session = require('express-session')


//importing cookie parser
const cookieParser = require('cookie-parser')

const registerRoute = require('./routes/registerRoute');

const loginRoute = require('./routes/loginRoute');

const postRoute = require("./routes/postRoute");

const userRoute = require("./routes/userRoute");

const commentRoute = require('./routes/commentRoute');

const likeRoute = require('./routes/likesRoute');

const followerRoute = require('./routes/followerRoute');


//importing cors
const cors = require('cors');


const dotenv = require('dotenv');
const emailRoute = require('./routes/emailRoute');

dotenv.config();

require('./models/Connection');


// middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: false,
  saveUninitialized: true,
}))


// routes
app.use("/register", registerRoute);
app.use("/userlogin", loginRoute);
app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/comment", commentRoute);
app.use("/like", likeRoute);
app.use("/follow", followerRoute);
app.use("/sendemail", emailRoute);

app.get("/", (req, res)=>{
    res.send("hello shreyas")
})


app.post("/verifytoken", async(req, res)=>{

    let {token} = req.body;

    try {

        if(token !== req.session.token){
            return res.status(401).json({"message": "Invalid Token"});
        }
        res.status(200).json({"message": "Token Verified"});

        
    } catch (error) {
        console.log(error)
    }

})


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`running on port ${port}`);
})