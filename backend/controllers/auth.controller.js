import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
export const signup=async (req,res)=>{
    try{
        console.log("Enterinig Backend");
        console.log("JWT Secret:", process.env.JWT_SECRET);
        const {fullName,username,password,confirmPassword,gender}=req.body; 
        if(password!==confirmPassword)
        {
            return res.status(400).json({error:"Password Don't Match"})
        }
        const user=await User.findOne({username});
        if(user)
        {
            return res.status(400).json({error:"UserName Already Exists"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt); 
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        
        const newUser=new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender==="male"?boyProfilePic:girlProfilePic
        })
        if(newUser)
        {
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser.id,
                fullName:newUser.fullName, 
                username:newUser.username,
                profilePic:newUser.profilePic 
            })
        }
        else
        {
            res.status(400).json({error:"Invalid user data"});
        }
    }
    catch(error)
    {
        //console.log(User.collection.name);
        // console.log("Error in signup")
        console.error("Error in signup:", error.message);
        console.log("Request Body:", req.body); // Log incoming request body
        res.status(500).json({error:"Internals Server Error"});
    }
};
// export const login=async (req,res)=>{
//     try{
//         const {username,password}=req.body;
//         const user=await User.findOne({username});
//         const isPasswordCorrect= await bcrypt.compare(password,user?.password || "");
//         if(!user || !isPasswordCorrect)
//         {
//             return res.status(400).json({error:"Invalid username or password"});
//         }
//         generateTokenAndSetCookie(user._id,res);
//         res.status(201).json({
//             _id:user._id,
//             fullName:user.fullName, 
//             username:user.username,
//             profilePic:user.profilePic 
//         })
//     }
//     catch(error)
//     {
//         console.error("Error in login:", error.message);
//         console.error("Error in login:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }
export const login = async (req, res) => {
    console.log("Received login request:", req.body);
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout=async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({messsage:"Logged out Successfully"});
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ error: "Internal Server Error" });   
    }
} 