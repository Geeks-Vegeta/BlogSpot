const mongoose = require('mongoose');



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    console.log("connected successfully")
}).catch((err)=>{
    console.log(err)
})

