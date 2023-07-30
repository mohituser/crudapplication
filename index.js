const express=require("express");
const path=require("path");
// const sendMail=require('controller.js')
const app=require("./app");
const connectWithDb = require("./config/db");
// const app = express();
require("dotenv").config();
connectWithDb();
const port =5000;
// app.use('/css',express.static(path.resolve(__dirname,"assets/css")));

app.listen(process.env.PORT,()=>{
    console.log("server is running ",process.env.PORT)
})