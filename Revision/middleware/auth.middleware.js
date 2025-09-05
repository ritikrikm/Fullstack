import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import logger from "../util/logger.js"
dotenv.config();
const isLoggedIn = (req,res , next)=>{
    logger({ message: "AuthMiddlewareTriggered", level: "info" });
   
    logger({message:req.cookies ,level: "info"});
    let token;
    const header = req.headers["authorization"];

    if (header && header.startsWith("Bearer ")) {
        token = header.slice(7).trim();
        logger({ message: "Token found in Authorization header", level: "info" });
    } else if (req.cookies && req.cookies.refresh) {
        token = req.cookies.refresh;
        logger({ message: "Token found in refresh cookie", level: "info" });
    }
    if (!token) {
        return res.status(401).json({ message: "Token not present" });
    }
    try {
        // const token = req.cookies?.token;
        console.log(req.cookies.token?"YES" : "NO");
 
        try {
            var decoded = jwt.verify(token, process.env.SECRET_KEY , {issuer:process.env.ISS});
            console.log("decoded data is " + decoded);
            req.user = decoded; //created a request having user object in it.
            next();
        } catch (error) {
            console.log(`Error in verification token ${error} `)
        }
        // next();
    } catch (error) {
        console.log("Error in Authmiddle")
    }
}
const verifyToken = (req,res,next)=>{
    const  {token} = req.params

}
export default isLoggedIn;




