const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
dotenv.config();
const device = require('express-device'); 
const cors = require('cors')
app.use(device.capture());


const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public", "try.html")); 
})

  
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/user" ,userRoute);


app.listen(PORT,()=>{
    // console.log(process.env.MONGODB_URI,"mongo")
    console.log("Server running on 4000")
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("MongoDB connnected")
    }).catch((err)=>{
        console.log(err)
    })
})
