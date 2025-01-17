import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
const protectRoute=async (req,res,next)=>{
    try{
        // console.log("Request Headers:", req.headers);
        const token=req.cookies.jwt;
        if(!token)
        {
            return res.status(401).json({error:"Unauthorized-No Token Provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded)
        {
                return res.status(401).json({error:"Unauthorized-No Token Provided"})
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user)
        {
            return res.status(401).json({error:"User Not Found"})
        }
        req.user=user;
        next();
    }
    catch(error)
    {
        console.log("Error in protectRoute middleware: ",error.message)
        res.status(500).json({error:"Internal Server error"});
    }
}
export default protectRoute;