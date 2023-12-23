import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
 
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Max:{
    type:Number,
    default: 0,
  },
  Unblock: { type: Number, default: Date.now() },
  
});
 export default mongoose.model('USER',userSchema)
 