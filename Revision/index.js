import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./util/db.js"
import router from "./route/routes.js"
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT | 4000;
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:process.env.BASE_URL,
    methods:["GET" , "POST" , "PUT" , "DELETE"]
}))
app.use(express.urlencoded({extended:true}))
db()

console.log("here in index")
app.use("/api/users" , router);

app.get("/",(req,res)=>{
    res.send("Running");
})



app.listen(PORT,()=>{
    console.log("Running on" , PORT)
})