import jwt from "jsonwebtoken";
const generateTokenAndSetCookie=(userId,res)=>{
    console.log("Inside generateTokenAndSetCookie");
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:false,
        sameSite:"lax",
        // secure:process.env.NODE_ENV!=="development" 
        secure:false
    });
};
export default generateTokenAndSetCookie;