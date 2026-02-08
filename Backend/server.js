const express=require("express");
const dotenv=require("dotenv");
const cookieParser = require("cookie-parser");
const Roter=require('./Routes');
const cors = require("cors");
const app=express();
app.use(cookieParser());
app.use(express.json())
app.use(cors());
dotenv.config();
const db=require("./config/mondodb");

const PORT=process.env.PORT || 5000;
 
app.use('/api',Roter)
app.listen(PORT,(error)=>{
    if(error)
    {
        console.error("Error :",error);
    }
    else{
        console.log("Server run on the port number : ",PORT);
    }
})