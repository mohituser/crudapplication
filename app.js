const express=require("express");
require("dotenv").config();
const user=require("./routes/userRoutes");
const cookieParser=require("cookie-parser");

const app=express();
const path=require("path");
// regular middleware
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
// app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
// console.log(path.join(__dirname,"/views/css"))
app.use(express.static(path.join(__dirname,"/views")));
app.use("/Quotesgen",user);
app.use("*",(req,res)=>{
res.render("index")
});

module.exports=app;
