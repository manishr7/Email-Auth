import Users from "../Model/userSchema.js";

export const login = async (req, res) => {
  console.log(req.body);
  const {Email}=req.body;
  try {
    
    const exists=await Users.findOne({ Email})
    
    if (exists) {
     
        res.status(400).send({ message: "user already exists!" });
        console.log("user already exists!")
      }
      else {
        
        const user = new Users(req.body);
        const userRegistered = await user.save();
        if (userRegistered) {
          res.status(200).send({ message: "user saved successfully" });
        }
      }
  } catch (error) {
    console.log(error);
  }
};
