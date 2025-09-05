import mongoose from "mongoose";

const courseSchema = mongoose.Schema;

const course = new courseSchema({
    courseTitle:String,
    courseDesc:String,
    coursePrice:BigInt,
    registeration:{
        type:Object,
        default:[]
    }

})

const courseModel = mongoose.model("Course" , course);