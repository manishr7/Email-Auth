import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rosalia.feeney60@ethereal.email',
        pass: 'DdRsCD8YJ564huCnt5'
    },
});

// async..await is not allowed in global scope, must use a wrapper
const authent= async ()=> {
    try {
        
    
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"E-Sec Technologies Pvt Ltd. 👻" <esec@security.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  
}
catch (error) {
        
}
}

