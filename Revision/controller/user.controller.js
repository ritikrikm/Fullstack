import {Register, verifyEmail,reset,resetLink,Login } from "../service/user.service.js";
import cookieParser from "cookie-parser";
const userRegister = async(req , res) =>{
    const {name , email , password}  = req.body;
   try {
    console.log("Entered Controller");
     const response = await Register({name , email , password});
     console.log(response);
     res.send(response)
   } catch (error) {
    console.log("Error in Registeration")
   }
    

}
const userLogin = async(req,res)=>{
    const {email , password} = req.body;
console.log(email + password);
   try {
     const response = await Login({email , password});
     const cookieOptions = {
         httpOnly:true,
         secure:true,
         maxAge: 7*24*60*60*1000//7d
     }
     console.log("hi")
     console.log(response.extras?.user?.signedAccessToken);
     console.log(cookieOptions.maxAge);
     res.cookie("refresh" , response.extras?.user?.signedRefreshToken , cookieOptions);
     // Set the Bearer access token in the response header
     res.setHeader("Authorization" , `Bearer ${response.extras?.user?.signedAccessToken}`);

     res.status(200).json({
        message:response.message,
        token:response.extras?.user?.signedAccessToken,
        data:{
            id:response.extras?.user.id,
            role:response.extras?.user.role
        }
     });
     
   } catch (error) {
    console.log(`Error while login ${error}`);
   }

}
const userVerify = async(req,res)=>{
    const {token} = req.params;
    console.log(`My token is ${token}`)
    try {
        const response = await verifyEmail({token})
        console.log(response + " in verification");
       res.send(response)
    } catch (error) {
        console.log("Error in verifying")
        
    }
}
const resetPassword = async(req,res) =>{
    const {email} = req.body; 
 
    try {
        const response = await reset({email})
        res.send(response)
    } catch (error) {
        console.log("Error in resetting")
    }

}
const linkReset = async(req,res)=>{
    const {pr_token} = req.params;
    const {newPass} = req.body;
    console.log(pr_token);
    console.log(newPass);
    try {
        const response = await resetLink({pr_token,newPass})
        res.send(response)
    } catch (error) {
        console.log("Error in linke resetting" , error)
    }
}
const getMe = async(req,res)=>{
    // The getMe endpoint is used to check if the user is still authenticated (i.e., "stay logged in" functionality).
    // When a user logs in, a token is set in their cookies. On subsequent visits or page reloads,
    // the frontend can call /me to verify if the user is still logged in by checking if the token is valid.
    // The isLoggedIn middleware (used in the route) will verify the token and attach the user info to req.user.
    // You can return the user info here if needed:

    res.status(200).json({
        message: "Logged-In",
        user: req.user // This will contain the decoded user info from the token
    });

}
const logout = async(req,res)=>{
  try {
      res.cookie("token" , "");
      res.status(200).json({
          message:"Logged Out"
      })
  } catch (error) {
    console.log("Error in logout" + error);
  }
}
export  {userRegister,userLogin , userVerify , resetPassword , linkReset , getMe , logout};
