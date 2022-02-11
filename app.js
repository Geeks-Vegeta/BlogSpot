const express = require('express');

const app = express();


//importing cookie parser
const cookieParser = require('cookie-parser')

const registerRoute = require('./routes/registerRoute');

const loginRoute = require('./routes/loginRoute');

const postRoute = require("./routes/postRoute");

const userRoute = require("./routes/userRoute");

//importing cors
const cors = require('cors');


const dotenv = require('dotenv');

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


// routes
app.use("/register", registerRoute);
app.use("/userlogin", loginRoute);
app.use("/userpost", postRoute);
app.use("/user", userRoute)

app.get("/", (req, res)=>{
    res.send("hello")
})


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`running on port ${port}`);
})