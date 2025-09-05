import mongoose from 'mongoose';
import dotenv from "dotenv"
const db = async()=>{
    dotenv.config();
    //connected DB to backend
    await mongoose.connect(process.env.URI).then(()=>{console.log("DB Connected")}).catch((err)=>{console.log(`${err} arrived`)})
}
export default db;
