import mongoose, { Mongoose, Schema } from 'mongoose'

const taskSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        default: 'Low',
    },
    createdBy: {
        type: Mongoose.Types.ObjectId,
        ref: 'User',
    },
    project: {
        type: Mongoose.Types.ObjectId,
        ref: 'Project',
    },
})
const task = mongoose.model('Task', taskSchema)
export default task
