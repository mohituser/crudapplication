const nodemailer = require("nodemailer");
let user=[{mail:"mm5005672@gmail.com"}];

const sendMail=async(req,res)=>{
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mohit7089237060@gmail.com',
      pass: 'awddjnanaocrowbt'
    }
  });
  
  var mailOptions = {
    from: 'mohit7089237060@gmail.com',
    to: ele.mail,
    subject: 'Sending Email using Node.js',
    // text: 'That was easy!'
    html:`<body style="background-color: aqua; height: 100%;width: 100%;display: flex ;
    justify-content: center;align-items: center;">
        <div style="width: 40%;height: 40%; background-color: rgb(247, 215, 166);padding: 1rem 3rem;text-align: center;" >
        <h1 style="text-align: center ;margin-bottom: 2rem;">Quote of the day by mohit</h1>
        <div>
            Lorem  dolor sit amet consectetur, adipisicing elit. Doloremque voluptatum odit aliquid eum minus nulla, sapiente repellat aspernatur voluptates ea nihil odio, deserunt aliquam cumque molestias. Officiis, provident! Temporibus, iure.
        </div>
        <div>.....Mohit mishra</div>
        </div>
        
    </body>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
}

module.exports=sendMail;