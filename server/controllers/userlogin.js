import Users from "../Model/userSchema.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dummyesec@gmail.com",
    pass: "qeqnnomdpxrdahfc",
  },
});
export const login2 = async (req, res) => {
  const email = req.body.Email;
  const password = req.body.Password;

  const exists = await Users.findOne({ Email: email, Password: password });
  const checkauth = await Users.findOne({ Email: email });

  if (exists) {
    
    try {
      if (exists.Max === 5) {
        const Final = Date.now();
        const Start = exists.Unblock;
        const millis = Final - Start;
        const temp = Math.floor(millis / (1000));
        console.log(temp)
        if (temp > 59) {
          const el = await Users.updateOne(
            { Email: email },
            { $set: { Max: 0 } }
          );
        }
        res.status(402).send({ message: `Account is blocked for a minute! Will Reactivate in ${61-temp} seconds` });
        
      } else {
        console.log(exists);
        res.status(200).send({ message: "user  found!" });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log(checkauth);
    const thresh = checkauth?.Max ||null;
    if(checkauth===null)
    {
      res.status(400).send({ message: "user not found!" });
    }
    if (checkauth && thresh < 4) {
      const el = await Users.updateOne({ Email: email }, { $inc: { Max: 1 } });
      console.log(el);
      res.status(400).send({ message: "user not found!" });
    } else if (checkauth && thresh === 4) {
      
      const el = await Users.updateOne(
        { Email: email },
        { $set: { Unblock: Date.now() } }
      );
      const el2 = await Users.updateOne({ Email: email }, { $inc: { Max: 1 } });
      res
        .status(401)
        .send({ message: "Account Blocked Due to Multiple Wrong Attempts!" });
      const info = await transporter.sendMail({
        from: '"E-Sec Technologies Pvt Ltd. " <esec@security.com>', // sender address
        to: email, // list of receivers
        subject: "ACCOUNT BLOCKED ON ESEC", // Subject line
        text: "Account Blocked Due to Multiple Wrong Attempts For A Minute!", // plain text body
        html: "<b>Account Blocked Due to Multiple Wrong Attempts For A Minute!</b>", // html body
      });
      console.log("Message sent: %s", info.messageId);
    } else if (checkauth && thresh > 4) {
      res.status(402).send({ message: "Account is blocked for a minute ! check your email" });
    }
  }
};
