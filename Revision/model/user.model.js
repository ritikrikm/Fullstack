import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
const userSchema = mongoose.Schema;

const user = new userSchema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["admin" , "user"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    emailToken:{
        type:String
    },
    passwordResetToken:{
        type:String
    },
    passwordResetExpiry:{
        type:Date
    }
},{
    timestamps:true
})
user.pre("save" , async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10);
    }
   
    next();
})
const userModel = mongoose.model("User" ,user );

export default userModel;