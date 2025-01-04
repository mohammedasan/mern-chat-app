import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"];
    },
});
const User=mongoose.model("User",userSchema);
export default User;