const { response } = require("express");
const cron=require("node-cron");
const User=require("../models/schema");
const mailHelper=require("../utils/nodemailer");
// const axios=require('axios');
const data=require("./quotes.json");
exports.home=(req,res,next)=>{
res.render("index");
}
exports.loginpage=(req,res,next)=>{
    res.render("login");
    }
    exports.update=(req,res,next)=>{
        res.render("updateform");
        }
        exports.forgotpass=(req,res,next)=>{
            res.render("forgotpass");
            }    
exports.signup=async(req,res,next)=>{
    console.log(req.body.name);
    try {
        const {name , email, password}=req.body; 
    // let result; 
    console.log(email);
    const user=await User.create({
        name,
        email,
        password,
    });
    console.log(user);
    const token = user.getJwtToken();
    const option={
        expires:new Date(
            Date.now()+3 * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
    
    }
    res.cookie("token",token,option);
    // res.send("success");
        
    } catch (error) {
        res.send("unsuccessfull")
        
    }
    
    }



    exports.login=async(req,res,next)=>{
        const {email,password}=req.body;
        // console.log(email);
        if(!email || !password){
            return next(new customError("email and password is required"),400);
        }
        const user=await User.findOne({email}).select("+password");
        if(!user){
            return next(new customError("you are not registered"),400);
        }
        const isPasswordCorrect=await user.isValidatedPassword(password);
        if(!isPasswordCorrect){
            // return next(new customError("wrong password "),400);
            res.send("wrong password");
        }
        const token = user.getJwtToken();
        const option={
            expires:new Date(
                Date.now()+3 * 24 * 60 * 60 * 1000
            ),
            httpOnly:true,
        
        }
        res.cookie("token",token,option).render("updateform",{name:user.name,email:user.email});
        // console.log(cookie.token);
        // res.render("updateform");
    
        
        }

     exports.forgotPassword=async(req,res,next)=>{
            const {email}=req.body;
            const user=await User.findOne({email});
            const flag=0;
            if(!user){
             return next(new customError("email not found"))
            }
            const forgotToken=user.getForgotPasswordToken();
         
            await user.save({validateBeforeSave:false});
            console.log(user);
            const myUrl=`${req.protocol}://${req.get("host")}/Quotesgen/password/reset/${forgotToken}`;
            const message=`copy paste this link in your url and hit the enter/n/n ${myUrl}`;
            try {
             await mailHelper({
                email: "mm5005672@gmail.com",
                subject:"Reset Password", 
                Quotes:'',
                message,
             }) 
         
             res.status(200).json({
                 success:true,
                 message:"email has been sent successfully"
             })
             
            } catch (error) {
             user.forgotPasswordExpiry=undefined,
             user.forgotPasswordToken=undefined,
             await user.save({validateBeforeSave:false});
         return next(new CustomError(error.message,500))
         
            }
         }
         exports.resetpass=async(req,res,next)=>{
            const forgotPasswordToken=req.params.token;
            console.log(forgotPasswordToken);
            const user=await User.findOne(
             {
                 forgotPasswordToken,
             // forgotPasswordExpiry:{$gt:Date.now()}
         });
             // console.log(user);
             if(!user){
                //  return next(new customError("token is not valid",400));
                res.send("time out , resend the mail")
             }
            //  req.user=user;
            res.render("resetpass",{id:forgotPasswordToken});
            // next();
         }
         exports.resetPassword=async(req,res,next)=>{
            const forgotPasswordToken=req.params.token;
            const user=await User.findOne(
                {
                    forgotPasswordToken,
            });
            console.log(forgotPasswordToken);

             if(req.body.password!==req.body.confirmPassword){
                //  return next(new customError("password and confirm is not matched",400));   
                res.send("password and confirm is not matched")  
             }
             user.password=req.body.password;
             // console.log(token);
         user.forgotPasswordToken=undefined;
         user.forgotPasswordExpiry=undefined;
         await user.save();
         
        //  cookietoken(user,res);
        const token = user.getJwtToken();
        const option={
            expires:new Date(
                Date.now()+3 * 24 * 60 * 60 * 1000
            ),
            httpOnly:true,
        
        }
        res.cookie("token",token,option).json({
            message:"password has been reset"
        });
          }
          exports.updateUserDetails=async(req,res,next)=>{
            const newData={
                name:req.body.name,
                email:req.body.email
            };

           const user=await User.findByIdAndUpdate(req.user.id,newData,{
            new:true,
            runValidator:true,
            useFindAndModify:false
           });
           res.status(200).json({
            success:true,
            
            } )
        
            }

 cron.schedule("00 22 * * *",()=>{
                console.log("hi i am running...........")
                this.fetchUser();
     })
     exports.checks=()=>{
        console.log("MOHIT i am running. ..22222 ..........")
     }
exports.fetchUser=async()=>{
  const result=await User.find();

  const index=0;
  const quotes=data.quotes;

//   console.log(data);
  async function sendmessage(option){
    // console.log(option.email);
    // const myUrl=`${req.protocol}://${req.get("host")}/Quotesgen/password/reset/${forgotToken}`;
    const message=``;
     await mailHelper({
        // email: "mm5005672@gmail.com",
        email: option.email,
        subject:"Quotes", 
        Quotes:`<body style="height: 100vh;">
        <div style="height: 100%;width: 100%;display: flex;justify-content: center;align-items: center;">
            <div style="margin: 3rem;height: auto;width:auto;background-color: antiquewhite;padding: 1rem;"> 
          <h1 style="text-align: center;">Good Morning</h1>
            <div style="margin: 3rem;" >${option.quotes}</div>
    </div>
    
 </div>
    </body>
        `,
        message,
     }) 

  }
//   
  result.forEach((ele)=>{
    // console.log(ele.email);
    let x = Math.floor((Math.random() * quotes.length) + 1);
console.log(x);
    const options={
        email:ele.email,
        quotes:quotes[x].quote,
    }
    sendmessage(options);
   
})
// res.send("mail is sent succefully");
console.log("mail is sent succefully");


}






