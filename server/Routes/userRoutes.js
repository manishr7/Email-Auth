import express from "express"
const router=express.Router();
import { login } from "../controllers/user.js";
import { login2 } from "../controllers/userlogin.js";
router.post('/signup',login);
router.post('/login',login2)
export default router;